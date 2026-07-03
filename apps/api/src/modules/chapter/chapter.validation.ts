import { z } from "zod";

export const createChapterSchema = z.object({

  title: z
    .string()
    .trim()
    .min(1, "Chapter title is required.")
    .max(150),

  order: z
    .number()
    .int()
    .positive(),

  subjectId: z
    .string()
    .min(1),

});

export type CreateChapterDto =
  z.infer<typeof createChapterSchema>;