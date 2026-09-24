import prisma from "../../../../config/prisma";

// ======================================================
// SET DAILY PROBLEM
// ======================================================

export const setDailyProblem = async ({
  questionId,
  date,
}: {
  questionId: string;
  date: Date;
}) => {
  // ======================================================
  // QUESTION VALIDATION
  // ======================================================

  const question =
    await prisma.practiceQuestion.findFirst({
      where: {
        id: questionId,
        isDeleted: false,
        published: true,
      },
    });

  if (!question) {
    throw new Error(
      "The selected question is not available in the question bank."
    );
  }

  // ======================================================
  // CHECK EXISTING DAILY PROBLEM
  // ======================================================

  const existingDailyProblem =
    await prisma.dailyProblem.findUnique({
      where: {
        date,
      },
    });

  if (existingDailyProblem) {
    throw new Error(
      "A daily problem is already set for this date."
    );
  }

  // ======================================================
  // CREATE DAILY PROBLEM
  // ======================================================

  return prisma.dailyProblem.create({
    data: {
      questionId,
      date,
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
  });
};

// ======================================================
// GET DAILY PROBLEM BY DATE
// ======================================================

export const getDailyProblem = async (
  date: Date
) => {
  return prisma.dailyProblem.findUnique({
    where: {
      date,
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
  });
};


// ======================================================
// REMOVE DAILY PROBLEM
// ======================================================

export const removeDailyProblem = async (
  date: Date
) => {
  const dailyProblem =
    await prisma.dailyProblem.findUnique({
      where: {
        date,
      },
    });

  if (!dailyProblem) {
    throw new Error(
      "No daily problem is configured for this date."
    );
  }

  await prisma.dailyProblem.delete({
    where: {
      date,
    },
  });
};