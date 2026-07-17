import { z } from "zod";

import {
  ExamType,
  TestType,
} from "@prisma/client";

export const getTestsSchema =
  z.object({

    page:

      z.coerce
        .number()
        .min(1)
        .default(1),

    limit:

      z.coerce
        .number()
        .min(1)
        .max(50)
        .default(10),

    examType:

      z.nativeEnum(
        ExamType
      ).optional(),

    type:

      z.nativeEnum(
        TestType
      ).optional(),

    subjectId:

      z.string()
        .cuid()
        .optional(),

    chapterId:

      z.string()
        .cuid()
        .optional(),

    search:

      z.string()
        .trim()
        .optional(),

  });


  // ======================================================
// SAVE ANSWER
// ======================================================

export const saveAnswerSchema =
  z.object({

    questionId:

      z.string().cuid(),

    selectedAnswer: z.union([
                    z.string(),
                    z.number(),
                    z.array(z.string())
                  ]).nullable(),

    timeSpent:

      z.number()

        .int()

        .min(0),

  });

export type SaveAnswerInput =
  z.infer<typeof saveAnswerSchema>;

// ======================================================
// MARK FOR REVIEW
// ======================================================

export const markForReviewSchema =
  z.object({

    questionId:

      z.string().cuid(),

    markedForReview:

      z.boolean(),

  });

export type MarkForReviewInput =
  z.infer<typeof markForReviewSchema>;

// ======================================================
// SUBMIT TEST
// ======================================================

export const submitTestSchema =
  z.object({});