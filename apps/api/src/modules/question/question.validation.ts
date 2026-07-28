import { z } from "zod";

const baseSchema = {
  question: z.string().trim().min(1),
  options: z.array(
    z.object({
      key: z.string(),
      text: z.string(),
    })
  ).min(2),

  solution: z.string().optional(),

  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  examType: z.enum(["JEE", "WBJEE", "BOARDS"]),

  subjectId: z.string(),
  chapterId: z.string(),

  year: z.number().optional(),
  marks: z.number().optional(),
  negativeMarks: z.number().optional(),

  isPremium: z.boolean().optional(),
  published: z.boolean().optional(),
};

export const createQuestionSchema = z.discriminatedUnion(
  "questionType",
  [
    z.object({
      ...baseSchema,
      questionType: z.literal("SINGLE_CORRECT"),
      answer: z.string(),
    }),

    z.object({
      ...baseSchema,
      questionType: z.literal("MULTIPLE_CORRECT"),
      answer: z.array(z.string()).min(1),
    }),

    z.object({
      ...baseSchema,
      questionType: z.literal("INTEGER"),
      answer: z.number(),
    }),

    z.object({
      ...baseSchema,
      questionType: z.literal("ASSERTION_REASON"),
      answer: z.string(),
    }),
  ]
);