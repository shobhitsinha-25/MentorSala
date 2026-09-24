import type { XPTransactionType } from "@prisma/client";

export const XP_REWARDS: Record<
  XPTransactionType,
  number
> = {
  DAILY_PROBLEM: 15,
  CHAPTER_TEST: 25,
  SUBJECT_TEST: 40,
  MOCK_TEST: 75,
  PYQ: 60,
  PRACTICE: 50,
  DAILY_LOGIN: 20,
};

export const getCategoryFromXP = (
  xp: number
): string => {
  if (xp <= 500) {
    return "Rookie";
  }

  if (xp <= 1500) {
    return "Learner";
  }

  if (xp <= 3000) {
    return "Scholar";
  }

  if (xp <= 6000) {
    return "Gold Scholar";
  }

  if (xp <= 10000) {
    return "Expert";
  }

  if (xp <= 18000) {
    return "Champion";
  }

  if (xp <= 30000) {
    return "Grandmaster";
  }

  return "Legend";
};