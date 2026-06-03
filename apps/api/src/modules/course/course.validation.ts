import { z } from "zod";

export const createCourseSchema =
  z.object({
    title: z
      .string()
      .min(5, "Title is too short"),

    description: z
      .string()
      .min(
        20,
        "Description is too short"
      ),

    thumbnail: z
      .string()
      .optional(),

    price: z.number().min(0),

    category: z.enum([
      "JEE",
      "NEET",
      "WBJEE",
      "BOARDS",
    ]),

    level: z.string(),

    duration: z.string(),
  });