import { z } from "zod";

export const signupSchema =
  z.object({

    name: z.string()
      .min(2),

    email: z.string()
      .email(),

    password: z.string()
      .min(6),

    role: z.enum([
      "STUDENT",
      "MENTOR",
      "ADMIN",
    ]).optional(),

    targetExam:
      z.string()
      .optional(),

  });

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});