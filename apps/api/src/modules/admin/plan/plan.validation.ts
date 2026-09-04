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
  z.object({

    testType:
      z.nativeEnum(TestType),

    limitType:
      z.nativeEnum(PlanLimitType),

    limit:
      z.number()
        .int()
        .min(0)
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
  z.object({

    title:
      z.string()
        .trim()
        .min(
          1,
          "Plan title is required."
        )
        .max(100),

    description:
      z.string()
        .trim()
        .max(1000)
        .optional(),

    examType:
      z.nativeEnum(ExamType),

    price:
      z.number()
        .positive(
          "Price must be greater than 0."
        ),

    durationInDays:
      z.number()
        .int()
        .positive(),

    sessionsPerMonth:
      z.number()
        .int()
        .min(0),

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
      // CHECK DUPLICATE TEST TYPES
      // ================================================

      const testTypes =
        data.testLimits.map(
          item => item.testType
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

    }
  );

export const updatePlanSchema =
  z.object({

    title:
      z.string()
        .trim()
        .min(
          1,
          "Plan title is required."
        )
        .max(100)
        .optional(),

    description:
      z.string()
        .trim()
        .max(1000)
        .optional(),

    examType:
      z.nativeEnum(ExamType)
        .optional(),

    price:
      z.number()
        .positive(
          "Price must be greater than 0."
        )
        .optional(),

    durationInDays:
      z.number()
        .int()
        .positive()
        .optional(),

    sessionsPerMonth:
      z.number()
        .int()
        .min(0)
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

  });