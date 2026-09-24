import prisma from "../../../config/prisma";

// ======================================================
// GET AVAILABLE PLANS FOR STUDENT
// ======================================================


export const getAvailablePlans = async (
  userId: string
) => {

  // ====================================================
  // GET STUDENT
  // ====================================================

  const student =
    await prisma.user.findUnique({

      where: {
        id: userId,
      },

      select: {
        targetExam: true,
      },

    });

  if (!student) {

    throw new Error(
      "Student not found."
    );

  }

  if (!student.targetExam) {

    throw new Error(
      "Target exam is not set."
    );

  }

  // ====================================================
  // GET CURRENT ACTIVE PAID SUBSCRIPTION
  // ====================================================

  const currentSubscription =
    await prisma.userSubscription.findFirst({

      where: {

        userId,

        status: "ACTIVE",

        expiresAt: {
          gt: new Date(),
        },

      },

      include: {

        plan: {
          select: {
            id: true,
            title: true,
            level: true,
            price: true,
          },
        },

      },

      orderBy: {

        expiresAt: "desc",

      },

    });

  // ====================================================
  // BUILD PLAN FILTER
  // ====================================================

  const planWhere: any = {

    isActive: true,

    examType:
      student.targetExam,

  };

  /*
   * If the student has an active paid subscription,
   * only show plans with a HIGHER level.
   *
   * Example:
   *
   * Current Level 1
   * → show Level 2, 3, ...
   *
   * Current Level 2
   * → show Level 3, 4, ...
   *
   * Current Level 3
   * → show Level 4, 5, ...
   *
   * No active subscription
   * → show all plans.
   */

  if (currentSubscription) {

    planWhere.level = {

      gt:
        currentSubscription.plan.level,

    };

  }

  // ====================================================
  // GET AVAILABLE PLANS
  // ====================================================

  const plans =
    await prisma.subscriptionPlan.findMany({

      where: planWhere,

      include: {

        testLimits: {

          orderBy: {

            testType: "asc",

          },

        },

      },

      orderBy: [

        {
          level: "asc",
        },

        {
          price: "asc",
        },

      ],

    });

  // ====================================================
  // ADD PRICING INFORMATION
  // ====================================================

  const plansWithPricing =
    plans.map((plan) => {

      // ==================================================
      // NORMAL PURCHASE
      // ==================================================

      if (!currentSubscription) {

        return {

          ...plan,

          isSubscribed: false,

          isUpgrade: false,

          payablePrice:
            plan.price,

        };

      }

      // ==================================================
      // UPGRADE PURCHASE
      // ==================================================

      const currentPlan =
        currentSubscription.plan;

      const upgradePrice =
        plan.price -
        currentPlan.price;

      // ==================================================
      // SAFETY CHECK
      // ==================================================

      /*
       * Since this is an upgrade, the target plan should
       * normally cost more than the current plan.
       *
       * If admin accidentally creates a higher-level plan
       * with the same/lower price, do not expose an invalid
       * payable amount.
       */

      if (upgradePrice <= 0) {

        throw new Error(
          `Invalid pricing configuration for plan "${plan.title}". ` +
          `A higher-level plan must have a higher price than the current plan.`
        );

      }

      return {

        ...plan,

        isSubscribed: false,

        isUpgrade: true,

        payablePrice:
          upgradePrice,

      };

    });

  // ====================================================
  // RETURN PLANS
  // ====================================================

  return plansWithPricing;
};


// ======================================================
// GET PLAN BY ID
// ======================================================

export const getPlanById = async (
  userId: string,
  planId: string
) => {

  // ====================================================
  // GET STUDENT
  // ====================================================

  const student =
    await prisma.user.findUnique({

      where: {
        id: userId,
      },

      select: {
        targetExam: true,
      },

    });

  if (!student) {

    throw new Error(
      "Student not found."
    );

  }

  if (!student.targetExam) {

    throw new Error(
      "Target exam is not set."
    );

  }

  // ====================================================
  // GET PLAN
  // ====================================================

  const plan =
    await prisma.subscriptionPlan.findFirst({

      where: {

        id: planId,

        isActive: true,

        examType:
          student.targetExam,

      },

      include: {

        testLimits: {

          orderBy: {

            testType: "asc",

          },

        },

      },

    });

  if (!plan) {

    throw new Error(
      "Plan not found or not available for your exam."
    );

  }

  // ====================================================
  // GET CURRENT ACTIVE SUBSCRIPTION
  // ====================================================

  const currentSubscription =
    await prisma.userSubscription.findFirst({

      where: {

        userId,

        status: "ACTIVE",

        expiresAt: {
          gt: new Date(),
        },

      },

      include: {

        plan: {

          select: {

            id: true,

            title: true,

            level: true,

            price: true,

          },

        },

      },

      orderBy: {

        expiresAt: "desc",

      },

    });

  // ====================================================
  // NORMAL PURCHASE
  // ====================================================

  if (!currentSubscription) {

    return {

      ...plan,

      isSubscribed: false,

      isUpgrade: false,

      payablePrice: plan.price,

    };

  }

  // ====================================================
  // CURRENT PLAN
  // ====================================================

  const currentPlan =
    currentSubscription.plan;

  // ====================================================
  // SAME PLAN
  // ====================================================

  if (currentPlan.id === plan.id) {

    return {

      ...plan,

      isSubscribed: true,

      isUpgrade: false,

      payablePrice: plan.price,

    };

  }

  // ====================================================
  // PREVENT DOWNGRADE
  // ====================================================

  if (plan.level <= currentPlan.level) {

    throw new Error(
      "You can only upgrade to a higher-level plan. Downgrading is not supported."
    );

  }

  // ====================================================
  // CALCULATE UPGRADE PRICE
  // ====================================================

  const upgradePrice =
    plan.price - currentPlan.price;

  // ====================================================
  // SAFETY CHECK
  // ====================================================

  if (upgradePrice <= 0) {

    throw new Error(
      `Invalid pricing configuration for plan "${plan.title}". A higher-level plan must have a higher price than the current plan.`
    );

  }

  // ====================================================
  // UPGRADE
  // ====================================================

  return {

    ...plan,

    isSubscribed: false,

    isUpgrade: true,

    payablePrice: upgradePrice,

  };

};


// ======================================================
// GET UPGRADE PRICE
// ======================================================

export const getUpgradePrice = async (
  userId: string,
  targetPlanId: string
) => {

  // ====================================================
  // GET STUDENT
  // ====================================================

  const student =
    await prisma.user.findUnique({

      where: {
        id: userId,
      },

      select: {
        targetExam: true,
      },

    });

  if (!student) {

    throw new Error(
      "Student not found."
    );

  }

  if (!student.targetExam) {

    throw new Error(
      "Target exam is not set."
    );

  }

  // ====================================================
  // GET TARGET PLAN
  // ====================================================

  const targetPlan =
    await prisma.subscriptionPlan.findFirst({

      where: {

        id: targetPlanId,

        isActive: true,

        examType:
          student.targetExam,

      },

    });

  if (!targetPlan) {

    throw new Error(
      "Target plan not found or not available for your exam."
    );

  }

  // ====================================================
  // GET CURRENT ACTIVE SUBSCRIPTION
  // ====================================================

  const currentSubscription =
    await prisma.userSubscription.findFirst({

      where: {

        userId,

        status: "ACTIVE",

        expiresAt: {
          gt: new Date(),
        },

      },

      include: {

        plan: true,

      },

      orderBy: {

        expiresAt: "desc",

      },

    });

  // ====================================================
  // NO ACTIVE PAID PLAN
  // ====================================================

  if (!currentSubscription) {

    throw new Error(
      "You do not have an active paid plan to upgrade."
    );

  }

  const currentPlan =
    currentSubscription.plan;

  // ====================================================
  // SAME PLAN
  // ====================================================

  if (
    currentPlan.id ===
    targetPlan.id
  ) {

    throw new Error(
      "You are already subscribed to this plan."
    );

  }

  // ====================================================
  // PREVENT DOWNGRADE
  // ====================================================

  if (
    targetPlan.level <=
    currentPlan.level
  ) {

    throw new Error(
      "You can only upgrade to a higher-level plan. Downgrading is not supported."
    );

  }

  // ====================================================
  // CALCULATE UPGRADE PRICE
  // ====================================================

  const upgradePrice =
    targetPlan.price -
    currentPlan.price;

  // ====================================================
  // SAFETY CHECK
  // ====================================================

  if (upgradePrice <= 0) {

    throw new Error(
      "Upgrade price must be greater than zero."
    );

  }

  return {

    currentPlan: {

      id:
        currentPlan.id,

      title:
        currentPlan.title,

      level:
        currentPlan.level,

      price:
        currentPlan.price,

    },

    targetPlan: {

      id:
        targetPlan.id,

      title:
        targetPlan.title,

      level:
        targetPlan.level,

      price:
        targetPlan.price,

    },

    upgradePrice,

  };

};