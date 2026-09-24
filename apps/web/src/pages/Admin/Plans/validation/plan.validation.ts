import { z } from "zod";


// ======================================================
// ENUMS
// ======================================================

export const examTypeSchema =
  z.enum([
    "JEE",
    "WBJEE",
    "BOARDS",
  ]);

export const testTypeSchema =
  z.enum([
    "CHAPTER",
    "SUBJECT",
    "MOCK",
    "PYQ",
    "PRACTICE",
  ]);

export const planLimitTypeSchema =
  z.enum([
    "LIMITED",
    "UNLIMITED",
    "NOT_ALLOWED",
  ]);

export const planLimitPeriodSchema =
  z.enum([
    "MONTHLY",
    "SUBSCRIPTION",
  ]);


// ======================================================
// TEST LIMIT
// ======================================================

export const planTestLimitSchema =
  z
    .object({

      testType:
        testTypeSchema,

      limitType:
        planLimitTypeSchema,

      limit:
        z
          .number()
          .int()
          .min(
            0,
            "Limit cannot be negative."
          )
          .nullable()
          .optional(),

      period:
        planLimitPeriodSchema
          .nullable()
          .optional(),

    })
    .superRefine(
      (data, ctx) => {

        // ================================================
        // LIMITED
        // ================================================

        if (
          data.limitType === "LIMITED"
        ) {

          if (
            data.limit === undefined ||
            data.limit === null
          ) {

            ctx.addIssue({

              code: "custom",

              message:
                "Limit is required for LIMITED access.",

              path: ["limit"],

            });

          }

          if (
            data.period === undefined ||
            data.period === null
          ) {

            ctx.addIssue({

              code: "custom",

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
          data.limitType === "UNLIMITED"
        ) {

          if (
            data.limit !== undefined &&
            data.limit !== null
          ) {

            ctx.addIssue({

              code: "custom",

              message:
                "Limit must not be provided for UNLIMITED access.",

              path: ["limit"],

            });

          }

          if (
            data.period !== undefined &&
            data.period !== null
          ) {

            ctx.addIssue({

              code: "custom",

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
          data.limitType === "NOT_ALLOWED"
        ) {

          if (
            data.limit !== undefined &&
            data.limit !== null
          ) {

            ctx.addIssue({

              code: "custom",

              message:
                "Limit must not be provided for NOT_ALLOWED access.",

              path: ["limit"],

            });

          }

          if (
            data.period !== undefined &&
            data.period !== null
          ) {

            ctx.addIssue({

              code: "custom",

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
        z
          .string()
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
        z
          .string()
          .trim()
          .max(
            1000,
            "Description cannot exceed 1000 characters."
          )
          .optional(),

      examType:
        examTypeSchema,

      level:
        z
          .number()
          .int()
          .min(
            1,
            "Plan level must be at least 1."
          ),

      /**
       * Trial plans are free.
       * Paid plans must have a positive price.
       */
      price:
        z
          .number()
          .min(
            0,
            "Price cannot be negative."
          ),

      durationInDays:
        z
          .number()
          .int()
          .positive(
            "Duration must be greater than 0."
          ),

      sessionsPerMonth:
        z
          .number()
          .int()
          .min(
            0,
            "Sessions cannot be negative."
          ),

      isTrial:
        z
          .boolean()
          .default(false),

      isPopular:
        z
          .boolean()
          .default(false),

      isActive:
        z
          .boolean()
          .default(true),

      testLimits:
        z
          .array(
            planTestLimitSchema
          )
          .length(
            5,
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
          uniqueTestTypes.size !== 5
        ) {

          ctx.addIssue({

            code: "custom",

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

              code: "custom",

              message:
                "Free trial plans must have a price of 0.",

              path: ["price"],

            });

          }


          // ----------------------------------------------
          // Trial LIMITED limits
          // must use SUBSCRIPTION period
          // ----------------------------------------------

          data.testLimits.forEach(
            (item, index) => {

              if (
                item.limitType === "LIMITED" &&
                item.period !== "SUBSCRIPTION"
              ) {

                ctx.addIssue({

                  code: "custom",

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

              code: "custom",

              message:
                "Paid plans must have a price greater than 0.",

              path: ["price"],

            });

          }


          // ----------------------------------------------
          // Paid LIMITED limits
          // must use MONTHLY period
          // ----------------------------------------------

          data.testLimits.forEach(
            (item, index) => {

              if (
                item.limitType === "LIMITED" &&
                item.period !== "MONTHLY"
              ) {

                ctx.addIssue({

                  code: "custom",

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
        z
          .string()
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
        z
          .string()
          .trim()
          .max(
            1000,
            "Description cannot exceed 1000 characters."
          )
          .optional(),

      examType:
        examTypeSchema
          .optional(),

      level:
        z
          .number()
          .int()
          .min(
            1,
            "Plan level must be at least 1."
          )
          .optional(),

      /**
       * Price can be 0 only when isTrial === true.
       *
       * Because update fields are partial, the final
       * trial/paid state is validated when both values
       * are available.
       */
      price:
        z
          .number()
          .min(
            0,
            "Price cannot be negative."
          )
          .optional(),

      durationInDays:
        z
          .number()
          .int()
          .positive(
            "Duration must be greater than 0."
          )
          .optional(),

      sessionsPerMonth:
        z
          .number()
          .int()
          .min(
            0,
            "Sessions cannot be negative."
          )
          .optional(),

      isTrial:
        z
          .boolean()
          .optional(),

      isPopular:
        z
          .boolean()
          .optional(),

      isActive:
        z
          .boolean()
          .optional(),

      testLimits:
        z
          .array(
            planTestLimitSchema
          )
          .length(
            5,
            "All test types must be configured."
          )
          .optional(),

    })
    .superRefine(
      (data, ctx) => {

        // ================================================
        // TEST LIMIT VALIDATION
        // ================================================

        if (
          data.testLimits
        ) {

          const testTypes =
            data.testLimits.map(
              (item) =>
                item.testType
            );

          const uniqueTestTypes =
            new Set(testTypes);

          if (
            uniqueTestTypes.size !== 5
          ) {

            ctx.addIssue({

              code: "custom",

              message:
                "Each test type must be configured exactly once.",

              path: ["testLimits"],

            });

          }


          // ==============================================
          // PERIOD VALIDATION
          //
          // If isTrial is explicitly supplied:
          // trial -> SUBSCRIPTION
          // paid  -> MONTHLY
          // ==============================================

          if (
            data.isTrial !== undefined
          ) {

            data.testLimits.forEach(
              (item, index) => {

                if (
                  item.limitType !== "LIMITED"
                ) {
                  return;
                }

                const expectedPeriod =
                  data.isTrial
                    ? "SUBSCRIPTION"
                    : "MONTHLY";

                if (
                  item.period !== expectedPeriod
                ) {

                  ctx.addIssue({

                    code: "custom",

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


        // ================================================
        // PRICE + TRIAL VALIDATION
        // ================================================

        if (
          data.isTrial === true &&
          data.price !== undefined &&
          data.price !== 0
        ) {

          ctx.addIssue({

            code: "custom",

            message:
              "Free trial plans must have a price of 0.",

            path: ["price"],

          });

        }


        if (
          data.isTrial === false &&
          data.price !== undefined &&
          data.price <= 0
        ) {

          ctx.addIssue({

            code: "custom",

            message:
              "Paid plans must have a price greater than 0.",

            path: ["price"],

          });

        }

      }
    );


// ======================================================
// TYPES
// ======================================================

export type CreatePlanFormValues =
  z.infer<
    typeof createPlanSchema
  >;

export type UpdatePlanFormValues =
  z.infer<
    typeof updatePlanSchema
  >;