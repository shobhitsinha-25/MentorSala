import prisma from "../../../../config/prisma";

import {
  ExamType,
  Prisma,
} from "@prisma/client";


export const ensureFreeTrial = async (
  userId: string,
  targetExam: ExamType
) => {

  return prisma.$transaction(
    async (tx) => {

      // ==================================================
      // LOCK USER
      // ==================================================

      const userRows =
        await tx.$queryRaw<
          Array<{
            id: string;
            role: string;
            targetExam: ExamType | null;
            onboardingCompleted: boolean;
            trialStartedAt: Date | null;
            trialExpiresAt: Date | null;
          }>
        >(
          Prisma.sql`
            SELECT
              "id",
              "role",
              "targetExam",
              "onboardingCompleted",
              "trialStartedAt",
              "trialExpiresAt"
            FROM "User"
            WHERE "id" = ${userId}
            FOR UPDATE
          `
        );

      const user = userRows[0];

      if (!user) {
        throw new Error(
          "User not found."
        );
      }


      // ==================================================
      // ONLY STUDENTS GET FREE TRIAL
      // ==================================================

      if (user.role !== "STUDENT") {
        return null;
      }


      // ==================================================
      // DETERMINE TARGET EXAM
      // ==================================================

      /*
       * During first-time onboarding, targetExam may not
       * have been saved yet.
       *
       * In that case, use the targetExam received from
       * the onboarding controller.
       *
       * If the user already has a targetExam in DB,
       * preserve that value.
       */

      const finalTargetExam =
        user.targetExam ?? targetExam;

      if (!finalTargetExam) {
        throw new Error(
          "Target exam is required for free trial."
        );
      }


      // ==================================================
      // GET TRIAL PLAN
      // ==================================================
      //
      // Trial plans are configured by ADMIN.
      //
      // We identify them using:
      //
      //   isTrial = true
      //   examType = student's target exam
      //   isActive = true
      //
      // We do NOT depend on the plan title.
      //

      const trialPlan =
        await tx.subscriptionPlan.findFirst({
          where: {
            examType:
              finalTargetExam,

            isTrial:
              true,

            isActive:
              true,
          },

          orderBy: {
            createdAt:
              "desc",
          },
        });

      if (!trialPlan) {
        throw new Error(
          `Free trial plan is not configured for ${finalTargetExam}.`
        );
      }


      // ==================================================
      // CURRENT TIME
      // ==================================================

      const now =
        new Date();


      // ==================================================
      // CHECK PAID SUBSCRIPTION
      // ==================================================
      //
      // A user who already has an active paid
      // subscription should never receive a trial.
      //

      const paidSubscription =
        await tx.userSubscription.findFirst({
          where: {

            userId,

            isTrial:
              false,

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

          orderBy: {
            expiresAt:
              "desc",
          },
        });

      if (paidSubscription) {

        /*
         * User already has a paid subscription.
         *
         * Do not create a free trial.
         */

        return paidSubscription;
      }


      // ==================================================
      // CHECK WHETHER TRIAL ALREADY EXISTS
      // ==================================================
      //
      // A trial is granted only once.
      //
      // Even if the previous trial has expired, we must
      // not create another trial.
      //

      const existingTrial =
        await tx.userSubscription.findFirst({
          where: {
            userId,

            isTrial:
              true,
          },

          orderBy: {
            createdAt:
              "asc",
          },
        });

      if (existingTrial) {

        /*
         * Trial already exists.
         *
         * Never create another trial.
         */

        return existingTrial;
      }


      // ==================================================
      // CALCULATE TRIAL PERIOD
      // ==================================================
      //
      // The ADMIN controls the trial duration through:
      //
      //   SubscriptionPlan.durationInDays
      //
      // There is no hardcoded 7-day value here.
      //

      const trialStartedAt =
        now;

      const trialExpiresAt =
        new Date(
          trialStartedAt
        );

      trialExpiresAt.setDate(
        trialExpiresAt.getDate() +
          trialPlan.durationInDays
      );


      // ==================================================
      // CREATE TRIAL SUBSCRIPTION
      // ==================================================

      const trialSubscription =
        await tx.userSubscription.create({
          data: {

            userId,

            planId:
              trialPlan.id,

            isTrial:
              true,

            status:
              trialExpiresAt > now
                ? "ACTIVE"
                : "EXPIRED",

            startsAt:
              trialStartedAt,

            expiresAt:
              trialExpiresAt,
          },
        });


      // ==================================================
      // SAVE ONBOARDING + TRIAL DATA
      // ==================================================

      await tx.user.update({
        where: {
          id:
            userId,
        },

        data: {

          targetExam:
            finalTargetExam,

          onboardingCompleted:
            true,

          trialStartedAt,

          trialExpiresAt,
        },
      });


      // ==================================================
      // RETURN TRIAL SUBSCRIPTION
      // ==================================================

      return trialSubscription;
    },
    {
         // Time to wait for a database connection.
      maxWait: 5000,

      // Maximum time allowed for the transaction.
      timeout: 10000,
    }
  );
};