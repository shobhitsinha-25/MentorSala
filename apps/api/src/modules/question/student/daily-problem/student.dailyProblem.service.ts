import prisma from "../../../../config/prisma";

import {
  awardXP,
} from "../../../gamification/gamification.service";

// ======================================================
// DATE HELPERS
// ======================================================

const getTodayUtcStart = (): Date => {
  const now = new Date();

  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    )
  );
};

// ======================================================
// NORMALIZE MULTIPLE CORRECT ANSWER
// ======================================================

const normalizeMultipleCorrectAnswer = (
  value: unknown
): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      String(item)
        .trim()
        .toUpperCase()
    )
    .sort();
};

// ======================================================
// NORMALIZE SINGLE ANSWER
// ======================================================

const normalizeSingleAnswer = (
  value: unknown
): string => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toUpperCase();
};

// ======================================================
// CHECK ANSWER
// ======================================================

const isAnswerCorrect = ({
  questionType,
  submittedAnswer,
  correctAnswer,
}: {
  questionType: string;
  submittedAnswer: unknown;
  correctAnswer: unknown;
}): boolean => {
  // ==============================================
  // MULTIPLE CORRECT
  // ==============================================

  if (
    questionType ===
    "MULTIPLE_CORRECT"
  ) {
    const submitted =
      normalizeMultipleCorrectAnswer(
        submittedAnswer
      );

    const expected =
      normalizeMultipleCorrectAnswer(
        correctAnswer
      );

    if (
      submitted.length !==
      expected.length
    ) {
      return false;
    }

    return submitted.every(
      (value, index) =>
        value === expected[index]
    );
  }

  // ==============================================
  // SINGLE CORRECT
  // ==============================================

  return (
    normalizeSingleAnswer(
      submittedAnswer
    ) ===
    normalizeSingleAnswer(
      correctAnswer
    )
  );
};

// ======================================================
// GET TODAY'S DAILY PROBLEM
// ======================================================

export const getTodayDailyProblem =
  async () => {
    const today =
      getTodayUtcStart();

    const dailyProblem =
      await prisma.dailyProblem.findUnique(
        {
          where: {
            date: today,
          },

          include: {
            question: {
              include: {
                subject: {
                  select: {
                    id: true,
                    name: true,
                    examType: true,
                  },
                },

                chapter: {
                  select: {
                    id: true,
                    title: true,
                    order: true,
                  },
                },
              },
            },
          },
        }
      );

    if (
      !dailyProblem ||
      dailyProblem.question.isDeleted ||
      !dailyProblem.question.published
    ) {
      return null;
    }

    // IMPORTANT:
    // Never expose answer to student.
    const {
      answer,
      ...safeQuestion
    } = dailyProblem.question;

    return {
      id: dailyProblem.id,
      date: dailyProblem.date,
      question: safeQuestion,
    };
  };

// ======================================================
// VERIFY DAILY PROBLEM ANSWER
// ======================================================

export const verifyDailyProblemAnswer =
  async ({
    userId,
    dailyProblemId,
    answer,
  }: {
    userId: string;
    dailyProblemId: string;
    answer: unknown;
  }) => {
    const dailyProblem =
      await prisma.dailyProblem.findUnique(
        {
          where: {
            id: dailyProblemId,
          },

          include: {
            question: true,
          },
        }
      );

    if (!dailyProblem) {
      throw new Error(
        "Daily problem not found."
      );
    }

    if (
      dailyProblem.question.isDeleted ||
      !dailyProblem.question.published
    ) {
      throw new Error(
        "This daily problem is no longer available."
      );
    }

    // ==============================================
    // GET USER
    // ==============================================

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new Error(
        "User not found."
      );
    }

    // ==============================================
    // CHECK WHETHER USER ALREADY SOLVED TODAY
    // ==============================================

    const today =
      getTodayUtcStart();

    if (user.lastPotdSolvedAt) {
      const solvedDate =
        new Date(
          user.lastPotdSolvedAt
        );

      const solvedDay =
        new Date(
          Date.UTC(
            solvedDate.getUTCFullYear(),
            solvedDate.getUTCMonth(),
            solvedDate.getUTCDate()
          )
        );

      if (
        solvedDay.getTime() ===
        today.getTime()
      ) {
        return {
          correct: false,
          alreadySolved: true,
          user,
          xpAwarded: 0,
          level: user.level,
        };
      }
    }

    // ==============================================
    // VERIFY ANSWER
    // ==============================================

    const isCorrect =
      isAnswerCorrect({
        questionType:
          dailyProblem.question
            .questionType,

        submittedAnswer: answer,

        correctAnswer:
          dailyProblem.question
            .answer,
      });

    // ==============================================
    // INCORRECT
    // ==============================================

    if (!isCorrect) {
      return {
        correct: false,
        alreadySolved: false,
        user,
        xpAwarded: 0,
        level: user.level,
      };
    }

    // ==============================================
    // UPDATE POTD COMPLETION
    // ==============================================

    const updatedUser =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          streak: {
            increment: 1,
          },

          lastPotdSolvedAt:
            new Date(),
        },
      });

    // ==============================================
    // AWARD XP
    // ==============================================

    const xpResult =
      await awardXP({
        userId,

        type:
          "DAILY_PROBLEM",

        referenceId:
          dailyProblem.id,

        description:
          "Completed Problem of the Day",
      });

    // ==============================================
    // GET FINAL USER
    // ==============================================

    const finalUser =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    return {
      correct: true,
      alreadySolved: false,

      user:
        finalUser ??
        updatedUser,

      xpAwarded:
        xpResult.amount,

      level:
        xpResult.level,
    };
  };