import { z } from "zod";

import {
  ExamType,
  PlanLimitPeriod,
  PlanLimitType,
  TestType,
} from "@prisma/client";


// ======================================================
// TEST LIMIT VALIDATION
// ======================================================

const planTestLimitSchema =
  z
    .object({

      testType:
        z.nativeEnum(TestType),

      limitType:
        z.nativeEnum(PlanLimitType),

      limit:
        z.number()
          .int()
          .min(
            0,
            "Limit cannot be negative."
          )
          .optional(),

      period:
        z.nativeEnum(PlanLimitPeriod)
          .optional(),

    })
    .superRefine(
      (data, ctx) => {

        // ================================================
        // LIMITED
        // ================================================

        if (
          data.limitType ===
          PlanLimitType.LIMITED
        ) {

          if (
            data.limit === undefined
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Limit is required for LIMITED access.",

              path: ["limit"],

            });

          }

          if (
            data.period === undefined
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Period is required for LIMITED access.",

              path: ["period"],

            });

          }

        }


        // ================================================
        // UNLIMITED
        // ================================================

        if (
          data.limitType ===
          PlanLimitType.UNLIMITED
        ) {

          if (
            data.limit !== undefined
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Limit must not be provided for UNLIMITED access.",

              path: ["limit"],

            });

          }

          if (
            data.period !== undefined
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Period must not be provided for UNLIMITED access.",

              path: ["period"],

            });

          }

        }


        // ================================================
        // NOT ALLOWED
        // ================================================

        if (
          data.limitType ===
          PlanLimitType.NOT_ALLOWED
        ) {

          if (
            data.limit !== undefined
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Limit must not be provided for NOT_ALLOWED access.",

              path: ["limit"],

            });

          }

          if (
            data.period !== undefined
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Period must not be provided for NOT_ALLOWED access.",

              path: ["period"],

            });

          }

        }

      }
    );


// ======================================================
// CREATE PLAN
// ======================================================

export const createPlanSchema =
  z
    .object({

      title:
        z.string()
          .trim()
          .min(
            1,
            "Plan title is required."
          )
          .max(
            100,
            "Plan title cannot exceed 100 characters."
          ),

      description:
        z.string()
          .trim()
          .max(
            1000,
            "Description cannot exceed 1000 characters."
          )
          .optional(),

      examType:
        z.nativeEnum(ExamType),

      level:
        z.number()
          .int()
          .min(
            0,
            "Plan level cannot be negative."
          ),

      // ================================================
      // PRICE
      // ================================================

      /**
       * Trial:
       *   price = 0
       *
       * Paid:
       *   price > 0
       */
      price:
        z.number()
          .min(
            0,
            "Price cannot be negative."
          ),

      durationInDays:
        z.number()
          .int()
          .positive(
            "Duration must be greater than 0 days."
          ),

      sessionsPerMonth:
        z.number()
          .int()
          .min(
            0,
            "Sessions cannot be negative."
          ),

      // ================================================
      // PLAN TYPE
      // ================================================

      isTrial:
        z.boolean()
          .optional()
          .default(false),

      isPopular:
        z.boolean()
          .optional()
          .default(false),

      isActive:
        z.boolean()
          .optional()
          .default(true),

      testLimits:
        z.array(
          planTestLimitSchema
        )
        .length(
          Object.values(TestType).length,
          "All test types must be configured."
        ),

    })
    .superRefine(
      (data, ctx) => {

        // ================================================
        // DUPLICATE TEST TYPES
        // ================================================

        const testTypes =
          data.testLimits.map(
            (item) =>
              item.testType
          );

        const uniqueTestTypes =
          new Set(testTypes);

        if (
          uniqueTestTypes.size !==
          Object.values(TestType).length
        ) {

          ctx.addIssue({

            code:
              z.ZodIssueCode.custom,

            message:
              "Each test type must be configured exactly once.",

            path: ["testLimits"],

          });

        }


        // ================================================
        // TRIAL PLAN
        // ================================================

        if (
          data.isTrial
        ) {

          // ----------------------------------------------
          // Trial must be free
          // ----------------------------------------------

          if (
            data.price !== 0
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Free trial plans must have a price of 0.",

              path: ["price"],

            });

          }


          // ----------------------------------------------
          // Trial entitlement period
          // ----------------------------------------------

          data.testLimits.forEach(
            (item, index) => {

              if (
                item.limitType ===
                PlanLimitType.LIMITED
              ) {

                if (
                  item.period !==
                  PlanLimitPeriod.SUBSCRIPTION
                ) {

                  ctx.addIssue({

                    code:
                      z.ZodIssueCode.custom,

                    message:
                      "Trial plan limits must use the SUBSCRIPTION period.",

                    path: [
                      "testLimits",
                      index,
                      "period",
                    ],

                  });

                }

              }

            }
          );

        }


        // ================================================
        // PAID PLAN
        // ================================================

        if (
          !data.isTrial
        ) {

          // ----------------------------------------------
          // Paid plan must have positive price
          // ----------------------------------------------

          if (
            data.price <= 0
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Paid plans must have a price greater than 0.",

              path: ["price"],

            });

          }


          // ----------------------------------------------
          // Paid entitlement period
          // ----------------------------------------------

          data.testLimits.forEach(
            (item, index) => {

              if (
                item.limitType ===
                PlanLimitType.LIMITED
              ) {

                if (
                  item.period !==
                  PlanLimitPeriod.MONTHLY
                ) {

                  ctx.addIssue({

                    code:
                      z.ZodIssueCode.custom,

                    message:
                      "Paid plan limits must use the MONTHLY period.",

                    path: [
                      "testLimits",
                      index,
                      "period",
                    ],

                  });

                }

              }

            }
          );

        }

      }
    );


// ======================================================
// UPDATE PLAN
// ======================================================

export const updatePlanSchema =
  z
    .object({

      title:
        z.string()
          .trim()
          .min(
            1,
            "Plan title is required."
          )
          .max(
            100,
            "Plan title cannot exceed 100 characters."
          )
          .optional(),

      description:
        z.string()
          .trim()
          .max(
            1000,
            "Description cannot exceed 1000 characters."
          )
          .optional(),

      examType:
        z.nativeEnum(ExamType)
          .optional(),

      level:
        z.number()
          .int()
          .min(
            0,
            "Plan level cannot be negative."
          )
          .optional(),

      price:
        z.number()
          .min(
            0,
            "Price cannot be negative."
          )
          .optional(),

      durationInDays:
        z.number()
          .int()
          .positive(
            "Duration must be greater than 0 days."
          )
          .optional(),

      sessionsPerMonth:
        z.number()
          .int()
          .min(
            0,
            "Sessions cannot be negative."
          )
          .optional(),

      // ================================================
      // PLAN TYPE
      // ================================================

      isTrial:
        z.boolean()
          .optional(),

      isPopular:
        z.boolean()
          .optional(),

      isActive:
        z.boolean()
          .optional(),

      testLimits:
        z.array(
          planTestLimitSchema
        )
        .length(
          Object.values(TestType).length,
          "All test types must be configured."
        )
        .optional(),

    })
    .superRefine(
      (data, ctx) => {

        // ================================================
        // PRICE + PLAN TYPE
        // ================================================

        if (
          data.isTrial === true &&
          data.price !== undefined
        ) {

          if (
            data.price !== 0
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Free trial plans must have a price of 0.",

              path: ["price"],

            });

          }

        }


        if (
          data.isTrial === false &&
          data.price !== undefined
        ) {

          if (
            data.price <= 0
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Paid plans must have a price greater than 0.",

              path: ["price"],

            });

          }

        }


        // ================================================
        // TEST LIMITS
        // ================================================

        if (
          data.testLimits
        ) {

          // ----------------------------------------------
          // Duplicate test types
          // ----------------------------------------------

          const testTypes =
            data.testLimits.map(
              (item) =>
                item.testType
            );

          const uniqueTestTypes =
            new Set(testTypes);

          if (
            uniqueTestTypes.size !==
            Object.values(TestType).length
          ) {

            ctx.addIssue({

              code:
                z.ZodIssueCode.custom,

              message:
                "Each test type must be configured exactly once.",

              path: ["testLimits"],

            });

          }


          // ----------------------------------------------
          // Validate period when plan type is provided
          // ----------------------------------------------

          if (
            data.isTrial !== undefined
          ) {

            data.testLimits.forEach(
              (item, index) => {

                if (
                  item.limitType !==
                  PlanLimitType.LIMITED
                ) {
                  return;
                }

                const expectedPeriod =
                  data.isTrial
                    ? PlanLimitPeriod.SUBSCRIPTION
                    : PlanLimitPeriod.MONTHLY;

                if (
                  item.period !==
                  expectedPeriod
                ) {

                  ctx.addIssue({

                    code:
                      z.ZodIssueCode.custom,

                    message:
                      data.isTrial
                        ? "Trial plan limits must use the SUBSCRIPTION period."
                        : "Paid plan limits must use the MONTHLY period.",

                    path: [
                      "testLimits",
                      index,
                      "period",
                    ],

                  });

                }

              }
            );

          }

        }

      }
    );