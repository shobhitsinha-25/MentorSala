import prisma from "../../../config/prisma";
import { AttemptStatus } from "@prisma/client";

// ======================================================
// VALIDATE ATTEMPT ACCESS
// ======================================================

export const validateAttemptAccess = async (

  attemptId: string,

  userId: string,

  questionId?: string,

  allowedStatuses: AttemptStatus[] = [

    "IN_PROGRESS",

  ]

) => {

  // ==========================================
  // ATTEMPT EXISTS
  // ==========================================

  const attempt =
    await prisma.testAttempt.findFirst({

      where: {

        id: attemptId,

        userId,

        status: {

          in: allowedStatuses,

        },

      },

      select: {

        id: true,

        testId: true,

        startedAt: true,

        expiresAt: true,

        submittedAt: true,

        status: true,

        attemptNumber: true,

      },

    });

  if (!attempt) {

    throw new Error(

      "Test attempt not found or is not accessible."

    );

  }

  // ==========================================
  // QUESTION VALIDATION
  // ==========================================

  if (!questionId) {

    return {

      attempt,

    };

  }

  const testQuestion =
    await prisma.testQuestion.findFirst({

      where: {

        testId: attempt.testId,

        questionId,

      },

      select: {

        id: true,

        questionId: true,

      },

    });

  if (!testQuestion) {

    throw new Error(

      "Question does not belong to this test."

    );

  }

  return {

    attempt,

    testQuestion,

  };

};