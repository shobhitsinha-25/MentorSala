import { z } from "zod";

import {
  ExamType,
  TestType,
} from "@prisma/client";

export const createTestSchema = z.object({

  title: z
    .string()
    .trim()
    .min(3)
    .max(150),

  description:
    z.string().optional(),

  examType:
    z.nativeEnum(ExamType),

  type:
    z.nativeEnum(TestType),

  subjectId:
    z.string().optional(),

  chapterId:
    z.string().optional(),

  duration:
    z.number().min(1),

  negativeMarks:
    z.number().optional(),

  instructions:
    z.string().optional(),

  maxAttempts:
    z.number().optional(),

  startsAt:
    z.coerce.date().optional(),

  endsAt:
    z.coerce.date().optional(),

  subscriptionPlanId: z
  .string()
  .trim()
  .optional()
  .transform(value => value || undefined),
});

export type CreateTestDto =
  z.infer<typeof createTestSchema>;