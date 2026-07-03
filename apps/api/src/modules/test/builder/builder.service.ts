import prisma from "../../../config/prisma";

import {
  AttachQuestionsInput,ReorderQuestionsInput
} from "./builder.types";

// ======================================================
// ATTACH QUESTIONS TO TEST
// ======================================================

export const attachQuestions = async ({
  testId,
  questions,
}: AttachQuestionsInput) => {

  // ==========================================
  // TEST EXISTS
  // ==========================================

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

    });

  if (!test) {

    throw new Error(
      "Test not found."
    );

  }

  // ==========================================
  // PROCESS EACH QUESTION
  // ==========================================

  for (const item of questions) {

    // ----------------------------------------
    // QUESTION EXISTS
    // ----------------------------------------

    const question =
      await prisma.practiceQuestion.findFirst({

        where: {

          id: item.questionId,

          isDeleted: false,

          published: true,

        },

      });

    if (!question) {

      throw new Error(
  `Question '${item.questionId}' does not exist, is unpublished, or has been deleted.`
);

    }

    // ----------------------------------------
    // DUPLICATE CHECK
    // ----------------------------------------

    const exists =
      await prisma.testQuestion.findUnique({

        where: {

          testId_questionId: {

            testId,

            questionId:
              item.questionId,

          },

        },

      });

    if (exists) {

      continue;

    }

    // ----------------------------------------
    // ATTACH QUESTION
    // ----------------------------------------

    await prisma.testQuestion.create({

      data: {

        testId,

        questionId:
          item.questionId,

        displayOrder:
          item.displayOrder,

        marks:
          question.marks,

        negativeMarks:
          question.negativeMarks,

      },

    });

  }

  // ==========================================
  // RECALCULATE TEST
  // ==========================================

  const attachedQuestions =
    await prisma.testQuestion.findMany({

      where: {

        testId,

      },

    });

  const totalQuestions =
    attachedQuestions.length;

  const totalMarks =
    attachedQuestions.reduce(

      (sum, question) =>

        sum +
        (question.marks ?? 0),

      0

    );

  await prisma.test.update({

    where: {

      id: testId,

    },

    data: {

      totalQuestions,

      totalMarks,

    },

  });

  return {

    totalQuestions,

    totalMarks,

  };

};

// ======================================================
// GET TEST QUESTIONS
// ======================================================

export const getTestQuestions = async (
  testId: string
) => {

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

    });

  if (!test) {

    throw new Error(
      "Test not found."
    );

  }

  return prisma.testQuestion.findMany({

    where: {

      testId,

    },

    include: {

      question: {

        include: {

          subject: {

            select: {

              id: true,

              name: true,

            },

          },

          chapter: {

            select: {

              id: true,

              title: true,

            },

          },

        },

      },

    },

    orderBy: {

      displayOrder: "asc",

    },

  });

};

// ======================================================
// REMOVE QUESTION FROM TEST
// ======================================================

export const removeQuestion = async (
  testId: string,
  questionId: string
) => {

  // ==========================================
  // FIND ATTACHED QUESTION
  // ==========================================

  const testQuestion =
    await prisma.testQuestion.findUnique({

      where: {

        testId_questionId: {

          testId,

          questionId,

        },

      },

    });

  if (!testQuestion) {

    throw new Error(
      "Question is not attached to this test."
    );

  }

  // ==========================================
  // DELETE RELATION
  // ==========================================

  await prisma.testQuestion.delete({

    where: {

      testId_questionId: {

        testId,

        questionId,

      },

    },

  });

  // ==========================================
  // RECALCULATE TEST
  // ==========================================

  const remainingQuestions =
    await prisma.testQuestion.findMany({

      where: {

        testId,

      },

    });

  const totalQuestions =
    remainingQuestions.length;

  const totalMarks =
    remainingQuestions.reduce(

      (sum, item) =>

        sum + (item.marks ?? 0),

      0

    );

  await prisma.test.update({

    where: {

      id: testId,

    },

    data: {

      totalQuestions,

      totalMarks,

    },

  });

  return {

    totalQuestions,

    totalMarks,

  };

};

// ======================================================
// REORDER QUESTIONS
// ======================================================

export const reorderQuestions = async ({
  testId,
  questions,
}: ReorderQuestionsInput) => {

  // ==========================================
  // TEST EXISTS
  // ==========================================

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

    });

  if (!test) {

    throw new Error(
      "Test not found."
    );

  }

  // ==========================================
  // UPDATE DISPLAY ORDER
  // ==========================================

  await prisma.$transaction(

    questions.map((item) =>

      prisma.testQuestion.update({

        where: {

          testId_questionId: {

            testId,

            questionId:
              item.questionId,

          },

        },

        data: {

          displayOrder:
            item.displayOrder,

        },

      })

    )

  );

  return prisma.testQuestion.findMany({

    where: {

      testId,

    },

    include: {

      question: true,

    },

    orderBy: {

      displayOrder: "asc",

    },

  });

};

// ======================================================
// PUBLISH TEST
// ======================================================

export const publishTest = async (
  testId: string
) => {

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

      include: {

        questions: true,

      },

    });

  if (!test) {

    throw new Error(
      "Test not found."
    );

  }

  if (test.status === "PUBLISHED") {

    throw new Error(
      "Test is already published."
    );

  }

  // ==========================================
  // VALIDATIONS
  // ==========================================

  if (test.questions.length === 0) {

    throw new Error(
      "Add at least one question before publishing."
    );

  }

  if (test.totalQuestions <= 0) {

    throw new Error(
      "Total questions cannot be zero."
    );

  }

  if (test.totalMarks <= 0) {

    throw new Error(
      "Total marks cannot be zero."
    );

  }

  if (!test.duration || test.duration <= 0) {

    throw new Error(
      "Duration must be greater than zero."
    );

  }

  // ==========================================
  // PUBLISH
  // ==========================================

  return prisma.test.update({

    where: {

      id: testId,

    },

    data: {

      status: "PUBLISHED",

    },

  });

};