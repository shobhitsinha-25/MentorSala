import { z } from "zod";

export const createQuestionSchema = z.object({

  questionType: z.enum([
    "SINGLE_CORRECT",
    "MULTIPLE_CORRECT",
    "INTEGER",
    "ASSERTION_REASON",
  ]),

  question: z
    .string()
    .trim()
    .min(1, "Question is required."),

  options: z.array(

    z.object({

      key: z.string(),

      text: z.string(),

    })

  ).min(2),

  answer: z.array(
    z.string()
  ).min(1),

  solution: z
    .string()
    .optional(),

  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),

  examType: z.enum([
    "JEE",
    "WBJEE",
    "BOARDS",
  ]),

  subjectId: z.string(),

  chapterId: z.string(),

  year: z.number().optional(),

  marks: z.number().optional(),

  negativeMarks: z.number().optional(),

  isPremium: z.boolean().optional(),

  published: z.boolean().optional(),

});

export type CreateQuestionDto =
  z.infer<
    typeof createQuestionSchema
  >;