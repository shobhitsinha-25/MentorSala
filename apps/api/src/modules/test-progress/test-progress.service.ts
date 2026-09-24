import prisma from "../../config/prisma";


// ======================================================
// TYPES
// ======================================================

interface TestProgressPoint {
  attemptId: string;
  testId: string;
  testTitle: string;
  testType: string;
  percentage: number;
  score: number;
  submittedAt: Date;
}


// ======================================================
// GET STUDENT TEST PROGRESS
// ======================================================

export const getStudentTestProgress = async (
  userId: string
): Promise<TestProgressPoint[]> => {

  // ====================================================
  // GET SUBMITTED TEST ATTEMPTS
  // ====================================================
const attempts =
  await prisma.testAttempt.findMany({

    where: {
      userId,

      status: "SUBMITTED",

      submittedAt: {
        not: null,
      },

      test: {
        isDeleted: false,
      },
    },

    select: {

      id: true,

      testId: true,

      score: true,

      percentage: true,

      submittedAt: true,

      test: {
        select: {

          title: true,

          type: true,

        },
      },
    },

    orderBy: {
      submittedAt: "desc",
    },

    take: 10,

  });


const progress =
  attempts
    .reverse()
    .map(
      (attempt) => ({

        attemptId:
          attempt.id,

        testId:
          attempt.testId,

        testTitle:
          attempt.test.title,

        testType:
          attempt.test.type,

        percentage:
          Number(
            (
              attempt.percentage ?? 0
            ).toFixed(2)
          ),

        score:
          Number(
            (
              attempt.score ?? 0
            ).toFixed(2)
          ),

        submittedAt:
          attempt.submittedAt!,

      })
    );

return progress;
  


};