import prisma from "../../../config/prisma";

import {
  buildWordSearch,
} from "../../../utils/buildSearchFilter";

import type {
  CreatePlanInput,
  GetPlansInput,UpdatePlanInput,
} from "../plan/plan.types";


// ======================================================
// CREATE PLAN
// ======================================================

export const createPlan = async (
  data: CreatePlanInput
) => {

  return prisma.$transaction(

    async (tx) => {

      // ================================================
      // CREATE PLAN
      // ================================================

      const plan =
        await tx.subscriptionPlan.create({

          data: {

            title:
              data.title,

            description:
              data.description,

            examType:
              data.examType,

            price:
              data.price,

            durationInDays:
              data.durationInDays,

            sessionsPerMonth:
              data.sessionsPerMonth,

            isPopular:
              data.isPopular ?? false,

            isActive:
              data.isActive ?? true,

          },

        });


      // ================================================
      // CREATE RESOURCE LIMITS
      // ================================================

      await tx.planTestLimit.createMany({

        data:
          data.testLimits.map(
            (limit) => ({

              planId:
                plan.id,

              testType:
                limit.testType,

              limitType:
                limit.limitType,

              limit:
                limit.limit ?? null,

              period:
                limit.period ??
                "MONTHLY",

            })
          ),

      });


      // ================================================
      // RETURN COMPLETE PLAN
      // ================================================

      return tx.subscriptionPlan.findUnique({

        where: {

          id:
            plan.id,

        },

        include: {

          testLimits: {

            orderBy: {

              testType:
                "asc",

            },

          },

        },

      });

    }

  );

};


// ======================================================
// GET ALL PLANS
// ======================================================

export const getPlans = async ({
  page = 1,
  limit = 20,
  search,
  examType,
  isActive,
}: GetPlansInput) => {

  // ====================================================
  // PAGINATION
  // ====================================================

  const skip =
    (page - 1) * limit;


  // ====================================================
  // WHERE FILTER
  // ====================================================

  const where: any = {};


  // ====================================================
  // SEARCH
  // ====================================================

  const searchFilter =
    buildWordSearch(

      search,

      [

        (word) => ({

          title: {

            contains:
              word,

            mode:
              "insensitive",

          },

        }),


        (word) => ({

          description: {

            contains:
              word,

            mode:
              "insensitive",

          },

        }),

      ]

    );


  if (searchFilter) {

    where.AND = [

      ...(where.AND || []),

      ...searchFilter,

    ];

  }


  // ====================================================
  // EXAM TYPE FILTER
  // ====================================================

  if (examType) {

    where.examType =
      examType;

  }


  // ====================================================
  // ACTIVE STATUS FILTER
  // ====================================================

  if (
    isActive !== undefined
  ) {

    where.isActive =
      isActive;

  }


  // ====================================================
  // FETCH PLANS + TOTAL
  // ====================================================

  const [
    plans,
    total,
  ] =
    await prisma.$transaction([

      prisma.subscriptionPlan.findMany({

        where,

        include: {

          testLimits: {

            orderBy: {

              testType:
                "asc",

            },

          },

        },

        orderBy: {

          createdAt:
            "desc",

        },

        skip,

        take:
          limit,

      }),


      prisma.subscriptionPlan.count({

        where,

      }),

    ]);


  // ====================================================
  // RETURN
  // ====================================================

  return {

    plans,

    pagination: {

      page,

      limit,

      total,

      pages:
        Math.ceil(
          total / limit
        ),

    },

  };

};

// ======================================================
// GET PLAN BY ID
// ======================================================

export const getPlanById = async (
  planId: string
) => {

  const plan =
    await prisma.subscriptionPlan.findUnique({

      where: {
        id: planId,
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
      "Subscription plan not found."
    );

  }


  return plan;

};

// ======================================================
// UPDATE PLAN
// ======================================================

export const updatePlan = async ({
  planId,
  testLimits,
  ...data
}: UpdatePlanInput) => {

  return prisma.$transaction(

    async (tx) => {

      const existingPlan =
        await tx.subscriptionPlan.findUnique({

          where: {
            id: planId,
          },

        });


      if (!existingPlan) {

        throw new Error(
          "Subscription plan not found."
        );

      }


      await tx.subscriptionPlan.update({

        where: {
          id: planId,
        },

        data,

      });


      // ================================================
      // UPDATE TEST LIMITS
      // ================================================

      if (testLimits) {

        await tx.planTestLimit.deleteMany({

          where: {
            planId,
          },

        });


        if (testLimits.length > 0) {

          await tx.planTestLimit.createMany({

            data: testLimits.map(
              (limit) => ({

                planId,

                testType:
                  limit.testType,

                limitType:
                  limit.limitType,

                limit:
                  limit.limit ?? null,

                period:
                  limit.period ?? "MONTHLY",

              })
            ),

          });

        }

      }


      // ================================================
      // RETURN UPDATED PLAN
      // ================================================

      return tx.subscriptionPlan.findUnique({

        where: {
          id: planId,
        },

        include: {

          testLimits: {

            orderBy: {
              testType: "asc",
            },

          },

        },

      });

    }

  );

};

// ======================================================
// DEACTIVATE PLAN
// ======================================================

export const deactivatePlan = async (
  planId: string
) => {

  const plan =
    await prisma.subscriptionPlan.findUnique({

      where: {
        id: planId,
      },

    });

  if (!plan) {

    throw new Error(
      "Subscription plan not found."
    );

  }

  if (!plan.isActive) {

    throw new Error(
      "Subscription plan is already inactive."
    );

  }

  return prisma.subscriptionPlan.update({

    where: {
      id: planId,
    },

    data: {
      isActive: false,
    },

  });

};