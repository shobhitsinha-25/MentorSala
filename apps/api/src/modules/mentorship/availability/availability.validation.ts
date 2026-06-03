import { z } from "zod";

export const createAvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),

  startTime: z.string(),

  endTime: z.string(),
});