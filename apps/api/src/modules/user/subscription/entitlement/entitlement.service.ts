import prisma from "../../../../config/prisma";

import {
  Prisma,
  type TestType,
} from "@prisma/client";

import {
  ENTITLEMENT_RESOURCE,
  type EntitlementResource,
  type EntitlementResult,
} from "./entitlement.types";


// ======================================================
// CONSTANTS
// ======================================================

const INDIA_TIMEZONE = "Asia/Kolkata";

const DEFAULT_VARIANT = "DEFAULT";


// ======================================================
// TYPES
// ======================================================

interface CalendarMonthPeriod {
  periodStart: Date;
  periodEnd: Date;
}

interface SubscriptionPeriod {
  periodStart: Date;
  periodEnd: Date;
}

interface EntitlementUsageItem {
  resource: EntitlementResource;
  variant: string;
  limit: number | null;
  used: number;
  remaining: number | null;
  unlimited: boolean;
  allowed: boolean;
  periodStart: Date;
  periodEnd: Date;
}

export interface SubscriptionUsageSummary {
  subscriptionId: string;
  planId: string;
  startsAt: Date;
  expiresAt: Date;

  periodStart: Date;
  periodEnd: Date;

  mentorship: EntitlementUsageItem;

  testSeries: Partial<
    Record<TestType, EntitlementUsageItem>
  >;
}


// ======================================================
// GET CURRENT CALENDAR MONTH
// ======================================================
//
// Paid subscription entitlement cycles follow the
// Indian calendar month.
//
// Example:
//
// September:
// 01 Sep 00:00 IST
//       ↓
// 01 Oct 00:00 IST
//
// October:
// 01 Oct 00:00 IST
//       ↓
// 01 Nov 00:00 IST
//
// These boundaries are stored as UTC Date objects.
//
// ======================================================

const getCurrentCalendarMonthPeriod = (
  now: Date = new Date()
): CalendarMonthPeriod => {

  const formatter =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          INDIA_TIMEZONE,

        year:
          "numeric",

        month:
          "2-digit",
      }
    );


  const parts =
    formatter.formatToParts(now);


  const yearPart =
    parts.find(
      (part) =>
        part.type === "year"
    );


  const monthPart =
    parts.find(
      (part) =>
        part.type === "month"
    );


  const year =
    Number(
      yearPart?.value
    );


  const month =
    Number(
      monthPart?.value
    );


  if (
    !year ||
    !month
  ) {

    throw new Error(
      "Unable to determine current calendar month."
    );

  }


  // IST = UTC + 5:30

  const INDIA_OFFSET_MINUTES =
    330;


  // Start of current month
  // at 00:00 IST.

  const periodStart =
    new Date(
      Date.UTC(
        year,
        month - 1,
        1
      ) -
        INDIA_OFFSET_MINUTES *
          60 *
          1000
    );


  // Start of next month
  // at 00:00 IST.

  const periodEnd =
    new Date(
      Date.UTC(
        year,
        month,
        1
      ) -
        INDIA_OFFSET_MINUTES *
          60 *
          1000
    );


  return {
    periodStart,
    periodEnd,
  };

};


// ======================================================
// GET SUBSCRIPTION PERIOD
// ======================================================
//
// Used for trial entitlements.
//
// Trial usage does NOT reset monthly.
//
// The complete trial lifetime is one entitlement period.
//
// ======================================================

const getSubscriptionPeriod = (
  subscription: {
    startsAt: Date;
    expiresAt: Date;
  }
): SubscriptionPeriod => {

  return {
    periodStart:
      subscription.startsAt,

    periodEnd:
      subscription.expiresAt,
  };

};


// ======================================================
// GET ENTITLEMENT PERIOD
// ======================================================
//
// MONTHLY:
//   Asia/Kolkata calendar month.
//
// SUBSCRIPTION:
//   startsAt → expiresAt.
//
// ======================================================

const getEntitlementPeriod = (
  subscription: {
    startsAt: Date;
    expiresAt: Date;
  },
  period: string
): SubscriptionPeriod => {

  if (
    period === "MONTHLY"
  ) {

    return getCurrentCalendarMonthPeriod();

  }


  if (
    period === "SUBSCRIPTION"
  ) {

    return getSubscriptionPeriod(
      subscription
    );

  }


  throw new Error(
    "Unsupported entitlement usage period."
  );

};


// ======================================================
// FIND ACTIVE SUBSCRIPTION
// ======================================================
//
// A subscription is active only when:
//
// status = ACTIVE
// startsAt <= now
// expiresAt > now
//
// expiresAt is exclusive.
//
// Therefore access disappears immediately when
// expiresAt is reached.
//
// Paid subscriptions are preferred if, due to any
// temporary data inconsistency, both a paid and trial
// subscription happen to be active.
//
// ======================================================

export const getActiveSubscription =
  async (
    userId: string
  ) => {

    const now =
      new Date();


    return prisma.userSubscription.findFirst({

      where: {

        userId,

        status:
          "ACTIVE",

        startsAt: {
          lte:
            now,
        },

        expiresAt: {
          gt:
            now,
        },

      },

      include: {

        plan: {

          include: {

            testLimits:
              true,

          },

        },

      },

      orderBy: [

        {
          isTrial:
            "asc",
        },

        {
          expiresAt:
            "desc",
        },

      ],

    });

  };


// ======================================================
// BUILD DENIED RESULT
// ======================================================

const buildDeniedResult = (
  resource:
    | typeof ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION
    | typeof ENTITLEMENT_RESOURCE.TEST_SERIES,

  reason: string,

  limit = 0,

  remaining = 0
): EntitlementResult => {

  return {

    allowed:
      false,

    resource,

    limit,

    remaining,

    unlimited:
      false,

    reason,

  };

};


// ======================================================
// MENTORSHIP SESSION ENTITLEMENT
// ======================================================
//
// Mentorship limit comes from:
//
// SubscriptionPlan.sessionsPerMonth
//
// For paid plans:
//
//   calendar month.
//
// For trial plans:
//
//   entire trial subscription period.
//
// ======================================================

export const checkMentorshipEntitlement =
  async (
    userId: string
  ): Promise<EntitlementResult> => {

    const subscription =
      await getActiveSubscription(
        userId
      );


    // ----------------------------------------------------
    // NO ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    if (!subscription) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        "An active subscription is required to book a mentorship session."

      );

    }


    // ----------------------------------------------------
    // LIMIT
    // ----------------------------------------------------

    const limit =
      subscription.plan
        .sessionsPerMonth;


    // ----------------------------------------------------
    // DEFENSIVE CONFIGURATION CHECK
    // ----------------------------------------------------

    if (
      limit < 0
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        "Mentorship entitlement is incorrectly configured."

      );

    }


    // ----------------------------------------------------
    // DETERMINE PERIOD
    // ----------------------------------------------------

    const {
      periodStart,
      periodEnd,
    } =
      getEntitlementPeriod(

        subscription,

        subscription.isTrial
          ? "SUBSCRIPTION"
          : "MONTHLY"

      );


    // ----------------------------------------------------
    // FIND USAGE
    // ----------------------------------------------------

    const usage =
      await prisma.subscriptionUsage.findUnique({

        where: {

          subscriptionId_resource_variant_periodStart: {

            subscriptionId:
              subscription.id,

            resource:
              ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

            variant:
              DEFAULT_VARIANT,

            periodStart,

          },

        },

      });


    const used =
      usage?.used ??
      0;


    const remaining =
      Math.max(
        limit - used,
        0
      );


    // ----------------------------------------------------
    // LIMIT EXHAUSTED
    // ----------------------------------------------------

    if (
      remaining <= 0
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        subscription.isTrial

          ? "You have used all mentorship sessions available during your trial."

          : "You have used all mentorship sessions available for this calendar month.",

        limit,

        0

      );

    }


    // ----------------------------------------------------
    // ALLOWED
    // ----------------------------------------------------

    return {

      allowed:
        true,

      resource:
        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

      limit,

      remaining,

      unlimited:
        false,

      periodStart,

      periodEnd,

    };

  };


// ======================================================
// TEST SERIES ENTITLEMENT
// ======================================================
//
// Test variants:
//
// CHAPTER
// SUBJECT
// MOCK
// PYQ
// PRACTICE
//
// Paid plans:
//
//   MONTHLY
//
// Trial plans:
//
//   SUBSCRIPTION
//
// The period is ultimately determined by the
// PlanTestLimit configuration.
//
// ======================================================

export const checkTestSeriesEntitlement =
  async ({
    userId,
    testType,
  }: {
    userId: string;
    testType: TestType;
  }): Promise<EntitlementResult> => {

    const subscription =
      await getActiveSubscription(
        userId
      );


    // ----------------------------------------------------
    // NO ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    if (!subscription) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "An active subscription is required to access test series."

      );

    }


    // ----------------------------------------------------
    // FIND PLAN LIMIT
    // ----------------------------------------------------

    const testLimit =
      subscription.plan.testLimits.find(

        (item) =>
          item.testType ===
          testType

      );


    // ----------------------------------------------------
    // NO CONFIGURATION
    // ----------------------------------------------------

    if (!testLimit) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "This test type is not included in your subscription plan."

      );

    }


    // ----------------------------------------------------
    // NOT ALLOWED
    // ----------------------------------------------------

    if (
      testLimit.limitType ===
      "NOT_ALLOWED"
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "This test type is not included in your subscription plan."

      );

    }


    // ----------------------------------------------------
    // UNLIMITED
    // ----------------------------------------------------

    if (
      testLimit.limitType ===
      "UNLIMITED"
    ) {

      return {

        allowed:
          true,

        resource:
          ENTITLEMENT_RESOURCE.TEST_SERIES,

        limit:
          null,

        remaining:
          null,

        unlimited:
          true,

      };

    }


    // ----------------------------------------------------
    // INVALID LIMIT TYPE
    // ----------------------------------------------------

    if (
      testLimit.limitType !==
      "LIMITED"
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "Invalid test entitlement configuration."

      );

    }


    // ----------------------------------------------------
    // INVALID LIMIT
    // ----------------------------------------------------

    if (
      testLimit.limit ===
        null ||

      testLimit.limit ===
        undefined ||

      testLimit.limit < 0

    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "Test entitlement is incorrectly configured."

      );

    }


    // ----------------------------------------------------
    // DETERMINE PERIOD
    // ----------------------------------------------------

    let periodStart:
      Date;

    let periodEnd:
      Date;

    try {

      ({
        periodStart,
        periodEnd,
      } =
        getEntitlementPeriod(

          subscription,

          testLimit.period

        ));

    } catch {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "This test entitlement has an unsupported usage period."

      );

    }


    // ----------------------------------------------------
    // FIND USAGE
    // ----------------------------------------------------

    const usage =
      await prisma.subscriptionUsage.findUnique({

        where: {

          subscriptionId_resource_variant_periodStart: {

            subscriptionId:
              subscription.id,

            resource:
              ENTITLEMENT_RESOURCE.TEST_SERIES,

            variant:
              testType,

            periodStart,

          },

        },

      });


    const used =
      usage?.used ??
      0;


    const remaining =
      Math.max(

        testLimit.limit -
          used,

        0

      );


    // ----------------------------------------------------
    // LIMIT EXHAUSTED
    // ----------------------------------------------------

    if (
      remaining <= 0
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        subscription.isTrial

          ? `You have used all ${testType.toLowerCase()} tests available during your trial.`

          : `You have used all ${testType.toLowerCase()} tests available for this calendar month.`,

        testLimit.limit,

        0

      );

    }


    // ----------------------------------------------------
    // ALLOWED
    // ----------------------------------------------------

    return {

      allowed:
        true,

      resource:
        ENTITLEMENT_RESOURCE.TEST_SERIES,

      limit:
        testLimit.limit,

      remaining,

      unlimited:
        false,

      periodStart,

      periodEnd,

    };

  };


// ======================================================
// CONSUME MENTORSHIP SESSION
// ======================================================
//
// IMPORTANT:
//
// This function MUST be called inside the same Prisma
// transaction that creates the MentorshipSession.
//
// Example:
//
// await prisma.$transaction(async (tx) => {
//
//   await consumeMentorshipSession(
//     tx,
//     userId
//   );
//
//   await tx.mentorshipSession.create(...);
//
// });
//
// The subscription row is locked before checking usage.
//
// ======================================================

export const consumeMentorshipSession =
  async (
    tx: Prisma.TransactionClient,
    userId: string
  ): Promise<EntitlementResult> => {

    // ----------------------------------------------------
    // LOCK ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    const subscriptionRows =
      await tx.$queryRaw<
        Array<{
          id: string;
          isTrial: boolean;
        }>
      >(

        Prisma.sql`

          SELECT
            "id",
            "isTrial"

          FROM "UserSubscription"

          WHERE "userId" = ${userId}

            AND "status" = 'ACTIVE'

            AND "startsAt" <= NOW()

            AND "expiresAt" > NOW()

          ORDER BY
            "isTrial" ASC,
            "expiresAt" DESC

          LIMIT 1

          FOR UPDATE

        `

      );


    const subscriptionId =
      subscriptionRows[0]?.id;


    // ----------------------------------------------------
    // NO ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    if (
      !subscriptionId
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        "An active subscription is required to book a mentorship session."

      );

    }


    // ----------------------------------------------------
    // LOAD SUBSCRIPTION + PLAN
    // ----------------------------------------------------

    const subscription =
      await tx.userSubscription.findUnique({

        where: {

          id:
            subscriptionId,

        },

        include: {

          plan:
            true,

        },

      });


    if (!subscription) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        "Active subscription could not be found."

      );

    }


    // ----------------------------------------------------
    // LIMIT
    // ----------------------------------------------------

    const limit =
      subscription.plan
        .sessionsPerMonth;


    if (
      limit < 0
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        "Mentorship entitlement is incorrectly configured."

      );

    }


    // ----------------------------------------------------
    // DETERMINE PERIOD
    // ----------------------------------------------------

    const {
      periodStart,
      periodEnd,
    } =
      getEntitlementPeriod(

        subscription,

        subscription.isTrial
          ? "SUBSCRIPTION"
          : "MONTHLY"

      );


    // ----------------------------------------------------
    // GET OR CREATE USAGE
    // ----------------------------------------------------

    const usage =
      await tx.subscriptionUsage.upsert({

        where: {

          subscriptionId_resource_variant_periodStart: {

            subscriptionId,

            resource:
              ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

            variant:
              DEFAULT_VARIANT,

            periodStart,

          },

        },

        create: {

          subscriptionId,

          resource:
            ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

          variant:
            DEFAULT_VARIANT,

          periodStart,

          periodEnd,

          used:
            0,

        },

        update:
          {},

      });


    // ----------------------------------------------------
    // CHECK LIMIT
    // ----------------------------------------------------

    const remaining =
      Math.max(

        limit -
          usage.used,

        0

      );


    if (
      remaining <= 0
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

        subscription.isTrial

          ? "You have used all mentorship sessions available during your trial."

          : "You have used all mentorship sessions available for this calendar month.",

        limit,

        0

      );

    }


    // ----------------------------------------------------
    // CONSUME ONE SESSION
    // ----------------------------------------------------

    const updatedUsage =
      await tx.subscriptionUsage.update({

        where: {

          id:
            usage.id,

        },

        data: {

          used: {

            increment:
              1,

          },

        },

      });


    // ----------------------------------------------------
    // SUCCESS
    // ----------------------------------------------------

    return {

      allowed:
        true,

      resource:
        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

      limit,

      remaining:
        limit -
        updatedUsage.used,

      unlimited:
        false,

      periodStart,

      periodEnd,

    };

  };


// ======================================================
// CONSUME TEST SERIES ENTITLEMENT
// ======================================================
//
// BUSINESS RULE:
//
// A student MUST have an active subscription to access
// any test.
//
// A quota is consumed ONLY when a student attempts a
// test for the FIRST TIME.
//
// Example:
//
// CHAPTER limit = 5
//
// Test A first attempt  -> usage +1
// Test A re-attempt     -> usage +0
// Test B first attempt  -> usage +1
//
// Any historical TestAttempt means that particular test
// has already consumed its first-access entitlement.
//
// This applies across months.
//
// Trial:
//
//   usage period = entire trial subscription.
//
// Paid:
//
//   usage period = current IST calendar month.
//
// IMPORTANT:
//
// This function MUST be called inside the SAME Prisma
// transaction that creates the TestAttempt.
//
// ======================================================

export const consumeTestSeries =
  async (
    tx: Prisma.TransactionClient,
    userId: string,
    testId: string,
    testType: TestType
  ): Promise<EntitlementResult> => {

    // ----------------------------------------------------
    // LOCK ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    const subscriptionRows =
      await tx.$queryRaw<
        Array<{
          id: string;
          isTrial: boolean;
        }>
      >(

        Prisma.sql`

          SELECT
            "id",
            "isTrial"

          FROM "UserSubscription"

          WHERE "userId" = ${userId}

            AND "status" = 'ACTIVE'

            AND "startsAt" <= NOW()

            AND "expiresAt" > NOW()

          ORDER BY
            "isTrial" ASC,
            "expiresAt" DESC

          LIMIT 1

          FOR UPDATE

        `

      );


    const subscriptionId =
      subscriptionRows[0]?.id;


    // ----------------------------------------------------
    // NO ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    if (
      !subscriptionId
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "An active subscription is required to access test series."

      );

    }


    // ----------------------------------------------------
    // LOAD SUBSCRIPTION + PLAN
    // ----------------------------------------------------

    const subscription =
      await tx.userSubscription.findUnique({

        where: {

          id:
            subscriptionId,

        },

        include: {

          plan: {

            include: {

              testLimits:
                true,

            },

          },

        },

      });


    if (!subscription) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "Active subscription could not be found."

      );

    }


    // ----------------------------------------------------
    // FIND LIMIT FOR TEST TYPE
    // ----------------------------------------------------

    const testLimit =
      subscription.plan.testLimits.find(

        (item) =>
          item.testType ===
          testType

      );


    // ----------------------------------------------------
    // NO TEST TYPE CONFIGURATION
    // ----------------------------------------------------

    if (!testLimit) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "This test type is not included in your subscription plan."

      );

    }


    // ----------------------------------------------------
    // NOT ALLOWED
    // ----------------------------------------------------

    if (
      testLimit.limitType ===
      "NOT_ALLOWED"
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "This test type is not included in your subscription plan."

      );

    }


    // ----------------------------------------------------
    // UNLIMITED
    // ----------------------------------------------------

    if (
      testLimit.limitType ===
      "UNLIMITED"
    ) {

      return {

        allowed:
          true,

        resource:
          ENTITLEMENT_RESOURCE.TEST_SERIES,

        limit:
          null,

        remaining:
          null,

        unlimited:
          true,

      };

    }


    // ----------------------------------------------------
    // INVALID LIMIT TYPE
    // ----------------------------------------------------

    if (
      testLimit.limitType !==
      "LIMITED"
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "Invalid test entitlement configuration."

      );

    }


    // ----------------------------------------------------
    // INVALID LIMIT
    // ----------------------------------------------------

    if (
      testLimit.limit ===
        null ||

      testLimit.limit ===
        undefined ||

      testLimit.limit < 0

    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "Test entitlement is incorrectly configured."

      );

    }


    // ----------------------------------------------------
    // DETERMINE PERIOD
    // ----------------------------------------------------

    let periodStart:
      Date;

    let periodEnd:
      Date;

    try {

      ({
        periodStart,
        periodEnd,
      } =
        getEntitlementPeriod(

          subscription,

          testLimit.period

        ));

    } catch {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        "This test entitlement has an unsupported usage period."

      );

    }


    // ----------------------------------------------------
    // CHECK WHETHER THIS TEST WAS EVER ATTEMPTED
    // ----------------------------------------------------
    //
    // IMPORTANT:
    //
    // We intentionally DO NOT filter by month.
    //
    // We intentionally DO NOT filter by status.
    //
    // Any historical TestAttempt means this test has
    // already consumed its first-access quota.
    //
    // ----------------------------------------------------

    const previousAttempt =
      await tx.testAttempt.findFirst({

        where: {

          userId,

          testId,

        },

        select: {

          id:
            true,

        },

      });


    // ----------------------------------------------------
    // ALREADY ATTEMPTED
    // ----------------------------------------------------
    //
    // Active subscription has already been verified.
    //
    // Test was previously attempted.
    //
    // Therefore:
    //
    // ALLOW
    // usage +0
    //
    // ----------------------------------------------------

    if (
      previousAttempt
    ) {

      const usage =
        await tx.subscriptionUsage.findUnique({

          where: {

            subscriptionId_resource_variant_periodStart: {

              subscriptionId,

              resource:
                ENTITLEMENT_RESOURCE.TEST_SERIES,

              variant:
                testType,

              periodStart,

            },

          },

          select: {

            used:
              true,

          },

        });


      const used =
        usage?.used ??
        0;


      const remaining =
        Math.max(

          testLimit.limit -
            used,

          0

        );


      return {

        allowed:
          true,

        resource:
          ENTITLEMENT_RESOURCE.TEST_SERIES,

        limit:
          testLimit.limit,

        remaining,

        unlimited:
          false,

        periodStart,

        periodEnd,

      };

    }


    // ----------------------------------------------------
    // GET OR CREATE USAGE
    // ----------------------------------------------------

    const usage =
      await tx.subscriptionUsage.upsert({

        where: {

          subscriptionId_resource_variant_periodStart: {

            subscriptionId,

            resource:
              ENTITLEMENT_RESOURCE.TEST_SERIES,

            variant:
              testType,

            periodStart,

          },

        },

        create: {

          subscriptionId,

          resource:
            ENTITLEMENT_RESOURCE.TEST_SERIES,

          variant:
            testType,

          periodStart,

          periodEnd,

          used:
            0,

        },

        update:
          {},

      });


    // ----------------------------------------------------
    // CALCULATE REMAINING
    // ----------------------------------------------------

    const remaining =
      Math.max(

        testLimit.limit -
          usage.used,

        0

      );


    // ----------------------------------------------------
    // QUOTA EXHAUSTED
    // ----------------------------------------------------

    if (
      remaining <= 0
    ) {

      return buildDeniedResult(

        ENTITLEMENT_RESOURCE.TEST_SERIES,

        subscription.isTrial

          ? `You have used all ${testType.toLowerCase()} tests available during your trial.`

          : `You have used all ${testType.toLowerCase()} tests available for this calendar month.`,

        testLimit.limit,

        0

      );

    }


    // ----------------------------------------------------
    // CONSUME ONE UNIQUE TEST
    // ----------------------------------------------------

    const updatedUsage =
      await tx.subscriptionUsage.update({

        where: {

          id:
            usage.id,

        },

        data: {

          used: {

            increment:
              1,

          },

        },

      });


    // ----------------------------------------------------
    // SUCCESS
    // ----------------------------------------------------

    return {

      allowed:
        true,

      resource:
        ENTITLEMENT_RESOURCE.TEST_SERIES,

      limit:
        testLimit.limit,

      remaining:
        testLimit.limit -
        updatedUsage.used,

      unlimited:
        false,

      periodStart,

      periodEnd,

    };

  };


// ======================================================
// GENERIC ENTITLEMENT CHECK
// ======================================================

export const checkEntitlement =
  async ({
    userId,
    resource,
    testType,
  }: {
    userId: string;
    resource: EntitlementResource;
    testType?: TestType;
  }): Promise<EntitlementResult> => {

    // ----------------------------------------------------
    // MENTORSHIP
    // ----------------------------------------------------

    if (
      resource ===
      ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION
    ) {

      return checkMentorshipEntitlement(
        userId
      );

    }


    // ----------------------------------------------------
    // TEST SERIES
    // ----------------------------------------------------

    if (
      resource ===
      ENTITLEMENT_RESOURCE.TEST_SERIES
    ) {

      if (
        !testType
      ) {

        throw new Error(
          "testType is required for test-series entitlement checks."
        );

      }


      return checkTestSeriesEntitlement({

        userId,

        testType,

      });

    }


    throw new Error(
      "Unsupported entitlement resource."
    );

  };


// ======================================================
// SUBSCRIPTION USAGE SUMMARY
// ======================================================
//
// Returns the usage information for the currently active
// subscription.
//
// Paid:
//
//   Current calendar month.
//
// Trial:
//
//   Entire trial subscription.
//
// Read operation does NOT create usage rows.
//
// ======================================================

export const getSubscriptionUsageSummary =
  async (
    userId: string
  ): Promise<
    SubscriptionUsageSummary | null
  > => {

    // ----------------------------------------------------
    // ACTIVE SUBSCRIPTION
    // ----------------------------------------------------

    const subscription =
      await getActiveSubscription(
        userId
      );


    if (!subscription) {

      return null;

    }


    // ----------------------------------------------------
    // DETERMINE SUMMARY PERIOD
    // ----------------------------------------------------

    const summaryPeriod =
      getEntitlementPeriod(

        subscription,

        subscription.isTrial
          ? "SUBSCRIPTION"
          : "MONTHLY"

      );


    const {
      periodStart,
      periodEnd,
    } =
      summaryPeriod;


    // ----------------------------------------------------
    // READ EXISTING USAGE
    // ----------------------------------------------------
    //
    // IMPORTANT:
    //
    // We intentionally use findMany instead of upsert.
    //
    // A read operation must not create usage rows.
    //
    // ----------------------------------------------------

    const usages =
      await prisma.subscriptionUsage.findMany({

        where: {

          subscriptionId:
            subscription.id,

          periodStart,

        },

        select: {

          resource:
            true,

          variant:
            true,

          used:
            true,

        },

      });


    // ----------------------------------------------------
    // BUILD USAGE LOOKUP
    // ----------------------------------------------------

    const usageMap =
      new Map<
        string,
        number
      >();


    for (
      const usage
      of usages
    ) {

      const key =
        `${usage.resource}:${usage.variant}`;


      usageMap.set(

        key,

        usage.used

      );

    }


    // ====================================================
    // MENTORSHIP
    // ====================================================

    const mentorshipKey =
      `${ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION}:${DEFAULT_VARIANT}`;


    const mentorshipUsed =
      usageMap.get(
        mentorshipKey
      ) ?? 0;


    const mentorshipLimit =
      subscription.plan
        .sessionsPerMonth;


    if (
      mentorshipLimit < 0
    ) {

      throw new Error(
        "Mentorship entitlement is incorrectly configured."
      );

    }


    const mentorshipRemaining =
      Math.max(

        mentorshipLimit -
          mentorshipUsed,

        0

      );


    const mentorship:
      EntitlementUsageItem = {

      resource:
        ENTITLEMENT_RESOURCE.MENTORSHIP_SESSION,

      variant:
        DEFAULT_VARIANT,

      limit:
        mentorshipLimit,

      used:
        mentorshipUsed,

      remaining:
        mentorshipRemaining,

      unlimited:
        false,

      allowed:
        mentorshipRemaining > 0,

      periodStart,

      periodEnd,

    };


    // ====================================================
    // TEST SERIES
    // ====================================================

    const testSeries:
      Partial<
        Record<
          TestType,
          EntitlementUsageItem
        >
      > = {};


    for (
      const testLimit
      of subscription.plan.testLimits
    ) {

      const testUsageKey =
        `${ENTITLEMENT_RESOURCE.TEST_SERIES}:${testLimit.testType}`;


      const used =
        usageMap.get(
          testUsageKey
        ) ?? 0;


      // --------------------------------------------------
      // NOT ALLOWED
      // --------------------------------------------------

      if (
        testLimit.limitType ===
        "NOT_ALLOWED"
      ) {

        testSeries[
          testLimit.testType
        ] = {

          resource:
            ENTITLEMENT_RESOURCE.TEST_SERIES,

          variant:
            testLimit.testType,

          limit:
            0,

          used,

          remaining:
            0,

          unlimited:
            false,

          allowed:
            false,

          periodStart,

          periodEnd,

        };


        continue;

      }


      // --------------------------------------------------
      // UNLIMITED
      // --------------------------------------------------

      if (
        testLimit.limitType ===
        "UNLIMITED"
      ) {

        testSeries[
          testLimit.testType
        ] = {

          resource:
            ENTITLEMENT_RESOURCE.TEST_SERIES,

          variant:
            testLimit.testType,

          limit:
            null,

          used,

          remaining:
            null,

          unlimited:
            true,

          allowed:
            true,

          periodStart,

          periodEnd,

        };


        continue;

      }


      // --------------------------------------------------
      // INVALID LIMIT TYPE
      // --------------------------------------------------

      if (
        testLimit.limitType !==
        "LIMITED"
      ) {

        testSeries[
          testLimit.testType
        ] = {

          resource:
            ENTITLEMENT_RESOURCE.TEST_SERIES,

          variant:
            testLimit.testType,

          limit:
            0,

          used,

          remaining:
            0,

          unlimited:
            false,

          allowed:
            false,

          periodStart,

          periodEnd,

        };


        continue;

      }


      // --------------------------------------------------
      // INVALID LIMIT
      // --------------------------------------------------

      if (
        testLimit.limit ===
          null ||

        testLimit.limit ===
          undefined ||

        testLimit.limit < 0

      ) {

        testSeries[
          testLimit.testType
        ] = {

          resource:
            ENTITLEMENT_RESOURCE.TEST_SERIES,

          variant:
            testLimit.testType,

          limit:
            0,

          used,

          remaining:
            0,

          unlimited:
            false,

          allowed:
            false,

          periodStart,

          periodEnd,

        };


        continue;

      }


      // --------------------------------------------------
      // VALIDATE PERIOD
      // ----------------------------------------------------

      if (
        testLimit.period !==
          "MONTHLY" &&

        testLimit.period !==
          "SUBSCRIPTION"
      ) {

        testSeries[
          testLimit.testType
        ] = {

          resource:
            ENTITLEMENT_RESOURCE.TEST_SERIES,

          variant:
            testLimit.testType,

          limit:
            0,

          used,

          remaining:
            0,

          unlimited:
            false,

          allowed:
            false,

          periodStart,

          periodEnd,

        };


        continue;

      }


      // --------------------------------------------------
      // LIMITED
      // --------------------------------------------------

      const remaining =
        Math.max(

          testLimit.limit -
            used,

          0

        );


      testSeries[
        testLimit.testType
      ] = {

        resource:
          ENTITLEMENT_RESOURCE.TEST_SERIES,

        variant:
          testLimit.testType,

        limit:
          testLimit.limit,

        used,

        remaining,

        unlimited:
          false,

        allowed:
          remaining > 0,

        periodStart,

        periodEnd,

      };

    }


    // ====================================================
    // FINAL SUMMARY
    // ====================================================

    return {

      subscriptionId:
        subscription.id,

      planId:
        subscription.planId,

      startsAt:
        subscription.startsAt,

      expiresAt:
        subscription.expiresAt,

      periodStart,

      periodEnd,

      mentorship,

      testSeries,

    };

  };