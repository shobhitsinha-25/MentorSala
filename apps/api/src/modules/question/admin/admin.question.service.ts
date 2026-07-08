import prisma from "../../../config/prisma";
import {
  Prisma,
} from "@prisma/client";

import {
  CreateQuestionInput,GetQuestionsInput,UpdateQuestionInput
} from "../question.types";
import { buildWordSearch } from "../../../utils/buildSearchFilter";

// ======================================================
// CREATE QUESTION
// ======================================================

export const createQuestion = async (
  data: CreateQuestionInput
) => {

  // ==========================================
  // SUBJECT VALIDATION
  // ==========================================

  const subject =
    await prisma.subject.findFirst({

      where: {

        id: data.subjectId,

        isDeleted: false,

      },

    });

  if (!subject) {

    throw new Error(
      "Subject not found."
    );

  }

  // ==========================================
  // CHAPTER VALIDATION
  // ==========================================

  const chapter =
    await prisma.chapter.findFirst({

      where: {

        id: data.chapterId,

        subjectId: data.subjectId,

        isDeleted: false,

      },

    });

  if (!chapter) {

    throw new Error(
      "Chapter not found."
    );

  }

  // ==========================================
  // ACTIVE DUPLICATE CHECK
  // ==========================================

  const existingQuestion =
    await prisma.practiceQuestion.findFirst({

      where: {

        examType: data.examType,

        subjectId: data.subjectId,

        chapterId: data.chapterId,

        question: data.question.trim(),

        questionType: data.questionType,

        isDeleted: false,

      },

    });

  if (existingQuestion) {

    throw new Error(
      "Question already exists."
    );

  }

  // ==========================================
  // SOFT DELETED QUESTION
  // ==========================================

  const deletedQuestion =
    await prisma.practiceQuestion.findFirst({

      where: {

        examType: data.examType,

        subjectId: data.subjectId,

        chapterId: data.chapterId,

        question: data.question.trim(),

        questionType: data.questionType,

        isDeleted: true,

      },

    });

  if (deletedQuestion) {

    return prisma.practiceQuestion.update({

      where: {

        id: deletedQuestion.id,

      },

      data: {

        question: data.question,

        questionType: data.questionType,

        questionImageUrl: data.questionImageUrl,

        options:
  data.options as unknown as Prisma.InputJsonValue,

        optionImages: data.optionImages,

        answer: data.answer,

        solution: data.solution,

        solutionImageUrl: data.solutionImageUrl,

        difficulty: data.difficulty,

        examType: data.examType,

        subjectId: data.subjectId,

        chapterId: data.chapterId,

        year: data.year,

        marks: data.marks,

        negativeMarks: data.negativeMarks,

        isPremium: data.isPremium ?? false,

        published: data.published ?? true,

        createdBy: data.createdBy,

        isDeleted: false,

        deletedAt: null,

      },

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

    });

  }

  // ==========================================
  // CREATE NEW QUESTION
  // ==========================================

  return prisma.practiceQuestion.create({

    data: {

      questionType: data.questionType,

      question: data.question,

      questionImageUrl: data.questionImageUrl,

      options:
  data.options as unknown as Prisma.InputJsonValue,

      optionImages: data.optionImages,

      answer: data.answer,

      solution: data.solution,

      solutionImageUrl: data.solutionImageUrl,

      difficulty: data.difficulty,

      examType: data.examType,

      subjectId: data.subjectId,

      chapterId: data.chapterId,

      year: data.year,

      marks: data.marks,

      negativeMarks: data.negativeMarks,

      isPremium: data.isPremium ?? false,

      published: data.published ?? true,

      createdBy: data.createdBy,

    },

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

  });

};

// ======================================================
// GET QUESTIONS
// ======================================================

export const getQuestions = async ({
  examType,
  subjectId,
  chapterId,
  difficulty,
  questionType,
  search,
  page = 1,
  limit = 20,
}: GetQuestionsInput) => {

  const skip =
    (page - 1) * limit;

  const where: any = {

    isDeleted: false,

  };

  if (examType) {

    where.examType = examType;

  }

  if (subjectId) {

    where.subjectId = subjectId;

  }

  if (chapterId) {

    where.chapterId = chapterId;

  }

  if (difficulty) {

    where.difficulty = difficulty;

  }

  if (questionType) {

    where.questionType = questionType;

  }

const searchFilter = buildWordSearch(search, [

  (word) => ({
    question: {
      contains: word,
      mode: "insensitive",
    },
  }),

  (word) => ({
    subject: {
      name: {
        contains: word,
        mode: "insensitive",
      },
    },
  }),

  (word) => ({
    chapter: {
      title: {
        contains: word,
        mode: "insensitive",
      },
    },
  }),

]);

if (searchFilter) {

  where.AND = [

    ...(where.AND || []),

    ...searchFilter,

  ];

}
  const [questions, total] =
    await prisma.$transaction([

      prisma.practiceQuestion.findMany({

        where,

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

        orderBy: {

          createdAt: "desc",

        },

        skip,

        take: limit,

      }),

      prisma.practiceQuestion.count({

        where,

      }),

    ]);

  return {

    questions,

    pagination: {

      page,

      limit,

      total,

      pages:
        Math.ceil(total / limit),

    },

  };

};

// ======================================================
// GET QUESTION BY ID
// ======================================================

export const getQuestionById = async (
  questionId: string
) => {

  const question =
    await prisma.practiceQuestion.findFirst({

      where: {

        id: questionId,

        isDeleted: false,

      },

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

    });

  if (!question) {

    throw new Error(
      "Question not found."
    );

  }

  return question;

};

// ======================================================
// UPDATE QUESTION
// ======================================================

export const updateQuestion = async ({
  questionId,
  ...data
}: UpdateQuestionInput) => {

  // ==========================================
  // QUESTION EXISTS
  // ==========================================

  const existingQuestion =
    await prisma.practiceQuestion.findFirst({

      where: {

        id: questionId,

        isDeleted: false,

      },

    });

  if (!existingQuestion) {

    throw new Error(
      "Question not found."
    );

  }

  // ==========================================
  // SUBJECT VALIDATION
  // ==========================================

  const subject =
    await prisma.subject.findFirst({

      where: {

        id: data.subjectId,

        isDeleted: false,

      },

    });

  if (!subject) {

    throw new Error(
      "Subject not found."
    );

  }

  // ==========================================
  // CHAPTER VALIDATION
  // ==========================================

  const chapter =
    await prisma.chapter.findFirst({

      where: {

        id: data.chapterId,

        subjectId: data.subjectId,

        isDeleted: false,

      },

    });

  if (!chapter) {

    throw new Error(
      "Chapter not found."
    );

  }

  // ==========================================
  // UPDATE
  // ==========================================

  const question =
    await prisma.practiceQuestion.update({

      where: {

        id: questionId,

      },

      data: {

        questionType:
          data.questionType,

        question:
          data.question,

        questionImageUrl:
          data.questionImageUrl,

        options:
  data.options as unknown as Prisma.InputJsonValue,

        optionImages:
          data.optionImages,

        answer:
          data.answer,

        solution:
          data.solution,

        solutionImageUrl:
          data.solutionImageUrl,

        difficulty:
          data.difficulty,

        examType:
          data.examType,

        subjectId:
          data.subjectId,

        chapterId:
          data.chapterId,

        year:
          data.year,

        marks:
          data.marks,

        negativeMarks:
          data.negativeMarks,

        isPremium:
          data.isPremium,

        published:
          data.published,

      },

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

    });

  return question;

};

// ======================================================
// DELETE QUESTION
// ======================================================

export const deleteQuestion = async (
  questionId: string
) => {

  // ==========================================
  // QUESTION EXISTS
  // ==========================================

  const question =
    await prisma.practiceQuestion.findFirst({

      where: {

        id: questionId,

        isDeleted: false,

      },

      include: {

        testQuestions: true,

      },

    });

  if (!question) {

    throw new Error(
      "Question not found."
    );

  }

  // ==========================================
  // LINKED TO TESTS
  // ==========================================

  if (question.testQuestions.length > 0) {

    throw new Error(
      "Question is already linked with one or more tests."
    );

  }

  // ==========================================
  // SOFT DELETE
  // ==========================================

  await prisma.practiceQuestion.update({

    where: {

      id: questionId,

    },

    data: {

      isDeleted: true,

      deletedAt: new Date(),

      published: false,

    },

  });

};