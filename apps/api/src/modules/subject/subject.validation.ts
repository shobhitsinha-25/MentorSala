import { z } from "zod";

export const createSubjectSchema = z.object({

  name: z
    .string()
    .trim()
    .min(1, "Subject name is required.")
    .max(100),

  examType: z.enum([
    "JEE",
    "WBJEE",
    "BOARDS",
  ]),

});

export type CreateSubjectDto =
  z.infer<typeof createSubjectSchema>;