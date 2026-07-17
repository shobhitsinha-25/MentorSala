import prisma from "../../../config/prisma";


import {
  Prisma,
} from "@prisma/client";

import type {
  GetTestsInput,
} from "./student.test.types";

import { validateAttemptAccess } from "./student.test.helper";

import {
  calculateScore,evaluateAnswer
} from "./student.test.scoring";


export interface SaveAnswerInput {

  attemptId: string;

  userId: string;

  questionId: string;

  selectedAnswer: Prisma.InputJsonValue | null;

  timeSpent: number;

}

export interface MarkForReviewInput {

  attemptId: string;

  userId: string;

  questionId: string;

  markedForReview: boolean;

}


// ======================================================
// GET ALL AVAILABLE TESTS
// ======================================================

export const getTests = async (

  userId: string,

  {

    page = 1,

    limit = 10,

    type,

    subjectId,

    chapterId,

    search,

  }: GetTestsInput

) => {

  const skip =
    (page - 1) * limit;

  // ==========================================
  // GET STUDENT TARGET EXAM
  // ==========================================

  const user =
    await prisma.user.findUnique({

      where: {

        id: userId,

      },

      select: {

        targetExam: true,

      },

    });

  if (!user) {

    throw new Error(

      "User not found."

    );

  }

  if (!user.targetExam) {

    throw new Error(

      "Student has not selected a target exam."

    );

  }

  // ==========================================
  // WHERE CLAUSE
  // ==========================================

  const where:
    Prisma.TestWhereInput = {

    status: "PUBLISHED",

    isDeleted: false,

    examType: user.targetExam!,

  };

  // ==========================================
  // FILTERS
  // ==========================================

  if (type) {

    where.type = type;

  }

  if (subjectId) {

    where.subjectId = subjectId;

  }

  if (chapterId) {

    where.chapterId = chapterId;

  }

  if (search) {

    where.OR = [

      {

        title: {

          contains: search,

          mode: "insensitive",

        },

      },

      {

        description: {

          contains: search,

          mode: "insensitive",

        },

      },

    ];

  }

  // ==========================================
  // LOAD TESTS
  // ==========================================

  const [

    tests,

    total,

  ] = await prisma.$transaction([

    prisma.test.findMany({

      where,

      select: {

        id: true,

        title: true,

        description: true,

        examType: true,

        type: true,

        duration: true,

        totalMarks: true,

        totalQuestions: true,

        negativeMarks: true,

        startsAt: true,

        endsAt: true,

        status: true,

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

      orderBy: {

        createdAt: "desc",

      },

      skip,

      take: limit,

    }),

    prisma.test.count({

      where,

    }),

  ]);

  // ==========================================
  // RETURN
  // ==========================================

  return {

    tests,

    pagination: {

      page,

      limit,

      total,

      totalPages:

        Math.ceil(total / limit),

      hasNextPage:

        page * limit < total,

      hasPreviousPage:

        page > 1,

    },

  };

};
// ======================================================
// GET TEST DETAILS
// ======================================================

export const getTestDetails = async (

  testId: string,

  userId: string

) => {

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        status: "PUBLISHED",

        isDeleted: false,

      },

      select: {

        id: true,

        title: true,

        description: true,

        examType: true,

        type: true,

        duration: true,

        totalMarks: true,

        totalQuestions: true,

        negativeMarks: true,

        instructions: true,

        startsAt: true,

        endsAt: true,

        createdAt: true,

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

    });

  if (!test) {

    throw new Error(

      "Test not found."

    );

  }

  const attemptsUsed =
    await prisma.testAttempt.count({

      where: {

        userId,

        testId,

      },

    });

  return {

    ...test,

    attemptsUsed,

  };

};


// ======================================================
// START TEST
// ======================================================

export const startTest = async (

  testId: string,

  userId: string

) => {

  // ==========================================
  // TEST EXISTS
  // ==========================================

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        status: "PUBLISHED",

        isDeleted: false,

      },

      select: {

        id: true,

        duration: true,

      },

    });

  if (!test) {

    throw new Error(

      "Test not found."

    );

  }

  // ==========================================
  // START / RESUME ATTEMPT
  // ==========================================

  

try {

  const attempt =
  await prisma.$transaction(

    async (tx) => {

      // ======================================
      // RESUME EXISTING ATTEMPT
      // ======================================

      const activeAttempt =
        await tx.testAttempt.findFirst({

          where: {

            testId,

            userId,

            status: "IN_PROGRESS",

          },

          select: {

            id: true,

            attemptNumber: true,

            startedAt: true,

            expiresAt: true,

            status: true,

          },

        });

      if (activeAttempt) {

        return activeAttempt;

      }

      // ======================================
      // FIND LAST ATTEMPT
      // ======================================

      const lastAttempt =
        await tx.testAttempt.findFirst({

          where: {

            testId,

            userId,

          },

          orderBy: {

            attemptNumber: "desc",

          },

          select: {

            attemptNumber: true,

          },

        });

      const attemptNumber =
        lastAttempt
          ? lastAttempt.attemptNumber + 1
          : 1;

      // ======================================
      // CALCULATE TIME
      // ======================================

      const startedAt =
        new Date();

      const expiresAt =
        new Date(

          startedAt.getTime() +

          test.duration * 60 * 1000

        );

      // ======================================
      // CREATE ATTEMPT
      // ======================================

      return tx.testAttempt.create({

        data: {

          userId,

          testId,

          attemptNumber,

          startedAt,

          expiresAt,

          status: "IN_PROGRESS",

        },

        select: {

          id: true,

          attemptNumber: true,

          startedAt: true,

          expiresAt: true,

          status: true,

        },

      });

    }
    

  );
  return attempt;

} catch (error) {

  if (

    error instanceof Prisma.PrismaClientKnownRequestError &&

    error.code === "P2002"

  ) {

    const existingAttempt =
      await prisma.testAttempt.findFirst({

        where: {

          testId,

          userId,

          status: "IN_PROGRESS",

        },

        select: {

          id: true,

          attemptNumber: true,

          startedAt: true,

          expiresAt: true,

          status: true,

        },

      });

    if (existingAttempt) {

      return existingAttempt;

    }

  }

  throw error;

}



};

// ======================================================
// LOAD TEST ENGINE
// ======================================================

export const getAttempt = async (

  attemptId: string,

  userId: string

) => {

  // ==========================================
  // ATTEMPT EXISTS
  // ==========================================

  const attempt =
    await prisma.testAttempt.findFirst({

      where: {

        id: attemptId,

        userId,

      },

      select: {

        id: true,

        startedAt: true,

        expiresAt: true,

        status: true,

        test: {

          select: {

            id: true,

            title: true,

            duration: true,

            totalMarks: true,

            totalQuestions: true,

            negativeMarks: true,

          },

        },

      },

    });

  if (!attempt) {

    throw new Error(

      "Attempt not found."

    );

  }

  // ==========================================
  // AUTO SUBMIT IF TIME EXPIRED
  // ==========================================

  if (

    attempt.status === "IN_PROGRESS" &&

    new Date() >= attempt.expiresAt

  ) {

    await submitTest(

      attempt.id,

      userId

    );

    return {

      autoSubmitted: true,

      attemptId: attempt.id,

    };

  }

  // ==========================================
  // ATTEMPT STATUS
  // ==========================================

  if (

    attempt.status !== "IN_PROGRESS"

  ) {

    throw new Error(

      "This test attempt is no longer active."

    );

  }

  // ==========================================
  // REMAINING TIME
  // ==========================================

  const remainingTime =
    Math.max(

      0,

      Math.floor(

        (

          attempt.expiresAt.getTime() -

          Date.now()

        ) / 1000

      )

    );

  // ==========================================
  // LOAD TEST QUESTIONS
  // ==========================================

  const questions =
    await prisma.testQuestion.findMany({

      where: {

        testId:

          attempt.test.id,

      },

      orderBy: {

        displayOrder: "asc",

      },

      select: {

        id: true,

        displayOrder: true,

        marks: true,

        negativeMarks: true,

        question: {

          select: {

            id: true,

            questionType: true,

            question: true,

            questionImageUrl: true,

            options: true,

            optionImages: true,

            difficulty: true,

            subjectId: true,

            chapterId: true,

          },

        },

      },

    });

  // ==========================================
  // LOAD SAVED ANSWERS
  // ==========================================

  const savedAnswers =
    await prisma.attemptAnswer.findMany({

      where: {

        attemptId,

      },

      select: {

        questionId: true,

        selectedAnswer: true,

        markedForReview: true,

        visited: true,

        timeSpent: true,

      },

    });

  // ==========================================
  // MAP ANSWERS
  // ==========================================

  const answerMap =
    new Map(

      savedAnswers.map(

        (answer) => [

          answer.questionId,

          answer,

        ]

      )

    );

  // ==========================================
  // BUILD QUESTION RESPONSE
  // ==========================================

  const formattedQuestions =
    questions.map(

      (item) => {

        const answerState =
          answerMap.get(

            item.question.id

          );

        return {

          id:

            item.question.id,

          questionNumber:

            item.displayOrder,

          questionType:

            item.question.questionType,

          question:

            item.question.question,

          questionImageUrl:

            item.question.questionImageUrl,

          options:

            item.question.options,

          optionImages:

            item.question.optionImages,

          marks:

            item.marks,

          negativeMarks:

            item.negativeMarks,

          difficulty:

            item.question.difficulty,

          subjectId:

            item.question.subjectId,

          chapterId:

            item.question.chapterId,

          answerState: {

            selectedAnswer:

              answerState?.selectedAnswer ?? null,

            markedForReview:

              answerState?.markedForReview ?? false,

            visited:

              answerState?.visited ?? false,

            timeSpent:

              answerState?.timeSpent ?? 0,

          },

        };

      }

    );

  // ==========================================
  // RETURN
  // ==========================================

  return {

    id:

      attempt.id,

    status:

      attempt.status,

    startedAt:

      attempt.startedAt,

    expiresAt:

      attempt.expiresAt,

    remainingTime,

    test:

      attempt.test,

    questions:

      formattedQuestions,

  };

};

// ======================================================
// SAVE ANSWER
// ======================================================

export const saveAnswer = async ({

  attemptId,

  userId,

  questionId,

  selectedAnswer,

  timeSpent,

}: SaveAnswerInput) => {

  // ==========================================
  // VALIDATE ATTEMPT & QUESTION
  // ==========================================

  const { attempt } =
  await validateAttemptAccess(

    attemptId,

    userId,

    questionId

  );

  // ==========================================
  // UPSERT ANSWER
  // ==========================================

  const answer =
    await prisma.$transaction(

      async (tx) => {

        const existingAnswer =
          await tx.attemptAnswer.findUnique({

            where: {

              attemptId_questionId: {

                attemptId,

                questionId,

              },

            },

            select: {

              timeSpent: true,

            },

          });

        return tx.attemptAnswer.upsert({

          where: {

            attemptId_questionId: {

              attemptId,

              questionId,

            },

          },

          update: {

            selectedAnswer,

            visited: true,

            timeSpent:
              (existingAnswer?.timeSpent ?? 0) +

              timeSpent,

          },

          create: {

            attemptId,

            questionId,

            selectedAnswer,

            visited: true,

            markedForReview: false,

            timeSpent,

          },

          select: {

            questionId: true,

            selectedAnswer: true,

            visited: true,

            markedForReview: true,

            timeSpent: true,

          },

        });

      }

    );

  return answer;

};

// ======================================================
// MARK FOR REVIEW
// ======================================================

export const markForReview = async ({

  attemptId,

  userId,

  questionId,

  markedForReview,

}: MarkForReviewInput) => {

  // ==========================================
  // VALIDATE ATTEMPT ACCESS
  // ==========================================

  await validateAttemptAccess(

    attemptId,

    userId,

    questionId

  );

  // ==========================================
  // UPSERT REVIEW STATE
  // ==========================================

  const answer =
    await prisma.attemptAnswer.upsert({

      where: {

        attemptId_questionId: {

          attemptId,

          questionId,

        },

      },

      update: {

        markedForReview,

        visited: true,

      },

      create: {

        attemptId,

        questionId,

        selectedAnswer: null,

        visited: true,

        markedForReview,

        timeSpent: 0,

      },

      select: {

        questionId: true,

        selectedAnswer: true,

        visited: true,

        markedForReview: true,

        timeSpent: true,

      },

    });

  return answer;

};


// ======================================================
// SUBMIT TEST
// ======================================================

export const submitTest = async (

  attemptId: string,

  userId: string

) => {

  // ==========================================
  // FIND ATTEMPT
  // ==========================================

  const attempt =
    await prisma.testAttempt.findFirst({

      where: {

        id: attemptId,

        userId,

      },

      select: {

        id: true,

        testId: true,

        startedAt: true,

        expiresAt: true,

        status: true,

      },

    });

  if (!attempt) {

    throw new Error(

      "Test attempt not found."

    );

  }

  // ==========================================
  // ALREADY SUBMITTED
  // ==========================================

  if (attempt.status === "SUBMITTED") {

    throw new Error(

      "This test has already been submitted."

    );

  }

  // ==========================================
  // INVALID STATUS
  // ==========================================

  if (attempt.status !== "IN_PROGRESS") {

    throw new Error(

      "Only active test attempts can be submitted."

    );

  }

  // ==========================================
  // LOAD TEST QUESTIONS
  // ==========================================

  const questions =
    await prisma.testQuestion.findMany({

      where: {

        testId: attempt.testId,

      },

      orderBy: {

        displayOrder: "asc",

      },

      select: {

        marks: true,

        negativeMarks: true,

        question: {

          select: {

            id: true,

            questionType: true,

            answer: true,

          },

        },

      },

    });

  // ==========================================
  // LOAD STUDENT ANSWERS
  // ==========================================

  const studentAnswers =
    await prisma.attemptAnswer.findMany({

      where: {

        attemptId,

      },

      select: {

        questionId: true,

        selectedAnswer: true,

        timeSpent: true,

      },

    });

  // ==========================================
  // CREATE ANSWER MAP
  // ==========================================

  const answerMap =
    new Map(

      studentAnswers.map(

        (answer) => [

          answer.questionId,

          answer,

        ]

      )

    );

  // ==========================================
  // CALCULATE SCORE
  // ==========================================

  const result =
    calculateScore(

      questions,

      answerMap

    );

  // ==========================================
  // TOTAL MARKS
  // ==========================================

  const totalMarks =
    questions.reduce(

      (sum, question) =>

        sum + (question.marks ?? 0),

      0

    );

  // ==========================================
  // PERCENTAGE
  // ==========================================

  const percentage =
    totalMarks > 0

      ? Number(

          (

            (Math.max(result.score, 0) /

              totalMarks) *

            100

          ).toFixed(2)

        )

      : 0;

  // ==========================================
  // TIME TAKEN
  // ==========================================

  const submittedAt =
    new Date();

  const timeTaken =
    Math.floor(

      (

        submittedAt.getTime() -

        attempt.startedAt.getTime()

      ) / 1000

    );

  // ==========================================
  // UPDATE ATTEMPT
  // ==========================================

  await prisma.testAttempt.update({

    where: {

      id: attemptId,

    },

    data: {

      status: "SUBMITTED",

      submittedAt,

      timeTaken,

      score: result.score,

      percentage,

      correctAnswers:
        result.correct,

      wrongAnswers:
        result.wrong,

      unanswered:
        result.unanswered,

    },

  });

  // ==========================================
  // RETURN SUMMARY
  // ==========================================

  return {

    attemptId,

    score:
      result.score,

    percentage,

    correctAnswers:
      result.correct,

    wrongAnswers:
      result.wrong,

    unanswered:
      result.unanswered,

    totalQuestions:
      questions.length,

    totalMarks,

    obtainedMarks:
      result.score,

    timeTaken,

    submittedAt,

  };

};

// ======================================================
// GET RESULT SUMMARY
// ======================================================

export const getResult = async (

  attemptId: string,

  userId: string

) => {

  // ==========================================
  // LOAD SUBMITTED ATTEMPT
  // ==========================================

  const attempt =
    await prisma.testAttempt.findFirst({

      where: {

        id: attemptId,

        userId,

        status: "SUBMITTED",

      },

      select: {

        id: true,

        score: true,

        percentage: true,

        correctAnswers: true,

        wrongAnswers: true,

        unanswered: true,

        timeTaken: true,

        submittedAt: true,

        test: {

          select: {

            id: true,

            title: true,

            duration: true,

            examType: true,

            type: true,

            totalQuestions: true,

            totalMarks: true,

          },

        },

      },

    });

  if (!attempt) {

    throw new Error(

      "Result not found."

    );

  }

  // ==========================================
  // RESPONSE
  // ==========================================

  return {

    attemptId:

      attempt.id,

    score:

      attempt.score,

    percentage:

      attempt.percentage,

    correctAnswers:

      attempt.correctAnswers,

    wrongAnswers:

      attempt.wrongAnswers,

    unanswered:

      attempt.unanswered,

    totalQuestions:

      attempt.test.totalQuestions,

    totalMarks:

      attempt.test.totalMarks,

    obtainedMarks:

      attempt.score,

    timeTaken:

      attempt.timeTaken,

    submittedAt:

      attempt.submittedAt,

    test: {

      id:

        attempt.test.id,

      title:

        attempt.test.title,

      duration:

        attempt.test.duration,

      examType:

        attempt.test.examType,

      type:

        attempt.test.type,

    },

  };

};

// ======================================================
// GET QUESTION REVIEW
// ======================================================

export const getReview = async (

  attemptId: string,

  userId: string

) => {

  // ==========================================
  // VALIDATE SUBMITTED ATTEMPT
  // ==========================================

  const { attempt } =
    await validateAttemptAccess(

      attemptId,

      userId,

      undefined,

      ["SUBMITTED"]

    );

    // ==========================================
// LOAD TEST CONFIGURATION
// ==========================================

const test =
  await prisma.test.findUnique({

    where: {

      id: attempt.testId,

    },

    select: {

      showAnswersAfterSubmit: true,

    },

  });

if (!test) {

  throw new Error(

    "Test not found."

  );

}

  // ==========================================
  // LOAD QUESTIONS
  // ==========================================

  const questions =
    await prisma.testQuestion.findMany({

      where: {

        testId: attempt.testId,

      },

      orderBy: {

        displayOrder: "asc",

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

    });

  // ==========================================
  // LOAD STUDENT ANSWERS
  // ==========================================

  const answers =
    await prisma.attemptAnswer.findMany({

      where: {

        attemptId,

      },

    });

  const answerMap =
    new Map(

      answers.map(

        answer => [

          answer.questionId,

          answer,

        ]

      )

    );
      // ==========================================
  // BUILD QUESTION REVIEW
  // ==========================================

  const reviewQuestions =
    questions.map(

      (item, index) => {

        const answer =
          answerMap.get(

            item.question.id

          );

        const studentAnswer =
          answer?.selectedAnswer ?? null;

        const isAnswered =
          studentAnswer !== null &&
          studentAnswer !== undefined;

        const isCorrect =
          isAnswered
            ? evaluateAnswer({

                questionType:
                  item.question.questionType,

                correctAnswer:
                  item.question.answer,

                studentAnswer,

              })
            : false;

        let status:
          "CORRECT" |
          "WRONG" |
          "UNANSWERED";

        if (!isAnswered) {

          status =
            "UNANSWERED";

        } else if (isCorrect) {

          status =
            "CORRECT";

        } else {

          status =
            "WRONG";

        }

        const marksAwarded =
          status === "CORRECT"

            ? (item.marks ?? 0)

            : status === "WRONG"

            ? -(item.negativeMarks ?? 0)

            : 0;

        return {

          questionNumber:
            index + 1,

          questionId:
            item.question.id,

          questionType:
            item.question.questionType,

          question:
            item.question.question,

          questionImageUrl:
            item.question.questionImageUrl,

          options:
            item.question.options,

          optionImages:
            item.question.optionImages,

          studentAnswer,

         correctAnswer:
            test.showAnswersAfterSubmit
              ? item.question.answer
              : null,

          status,

          marksAwarded,

          marks:
            item.marks,

          negativeMarks:
            item.negativeMarks,

          difficulty:
            item.question.difficulty,

          solution:
  test.showAnswersAfterSubmit
    ? item.question.solution
    : null,

          solutionImageUrl:
  test.showAnswersAfterSubmit
    ? item.question.solutionImageUrl
    : null,

          timeSpent:
            answer?.timeSpent ?? 0,

          markedForReview:
            answer?.markedForReview ?? false,

          subject: {

            id:
              item.question.subject.id,

            name:
              item.question.subject.name,

          },

          chapter: {

            id:
              item.question.chapter.id,

            title:
              item.question.chapter.title,

          },

        };

      }

    );
      // ==========================================
  // RETURN REVIEW
  // ==========================================

  return {

  attemptId:

    attempt.id,

  totalQuestions:

    reviewQuestions.length,

  showAnswers:

    test.showAnswersAfterSubmit,

  questions:

    reviewQuestions,

};

};

export const getStudentSubjects = async (

  userId: string

) => {

  // ==========================================
  // LOAD STUDENT
  // ==========================================

  const user =
    await prisma.user.findUnique({

      where: {

        id: userId,

      },

      select: {

        targetExam: true,

      },

    });

  if (!user) {

    throw new Error(

      "User not found."

    );

  }

  if (!user.targetExam) {

    throw new Error(

      "Student has not selected a target exam."

    );

  }

  // ==========================================
  // LOAD SUBJECTS
  // ==========================================

  const subjects =
    await prisma.subject.findMany({

      where: {

        examType:

          user.targetExam,

        isDeleted: false,

      },

      select: {

        id: true,

        name: true,

        slug: true,

      },

      orderBy: {

  name: "asc",

},
    });

  return subjects;

};

// ======================================================
// GET STUDENT CHAPTERS
// ======================================================

export const getStudentChapters = async (

  userId: string,

  subjectId: string

) => {

  // ==========================================
  // LOAD STUDENT
  // ==========================================

  const user =
    await prisma.user.findUnique({

      where: {

        id: userId,

      },

      select: {

        targetExam: true,

      },

    });

  if (!user) {

    throw new Error(

      "User not found."

    );

  }

  if (!user.targetExam) {

    throw new Error(

      "Student has not selected a target exam."

    );

  }

  // ==========================================
  // VERIFY SUBJECT
  // ==========================================

  const subject =
    await prisma.subject.findFirst({

      where: {

        id: subjectId,

        examType: user.targetExam,

        isDeleted: false,

      },

      select: {

        id: true,

      },

    });

  if (!subject) {

    throw new Error(

      "Subject not found."

    );

  }

  // ==========================================
  // LOAD CHAPTERS
  // ==========================================

  const chapters =
    await prisma.chapter.findMany({

      where: {

        subjectId,

        isDeleted: false,

      },

      select: {

        id: true,

        title: true,

      },

      orderBy: {

        title: "asc",

      },

    });

  return chapters;

};