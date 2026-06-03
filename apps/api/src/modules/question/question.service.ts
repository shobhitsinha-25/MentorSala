import prisma from "../../config/prisma";
import { ExamType, DifficultyLevel } from "@prisma/client";

export const createQuestion = async (
  data: {
    question: string;
    options: string[];
    answer: string;
    difficulty: DifficultyLevel;
    examType: ExamType;
    subject: string;
    chapter: string;
  }
) => {

  return prisma.practiceQuestion.create({
    data: {
      question: data.question,
      options: data.options,
      answer: data.answer,
      difficulty: data.difficulty,
      examType: data.examType,
      subject: data.subject,
      chapter: data.chapter,
    },
  });

};

export const getQuestionsForStudent =
async (
  examType: ExamType,
  userId: string,
  page: number = 1,
) => {

  const limit = 10;

  const skip =
    (page - 1) * limit;

  const questions =
    await prisma.practiceQuestion.findMany({

      where: {
        examType,
        published: true,
      },

      include: {

        attempts: {

          where: {
            userId,
          },

          select: {
            isCorrect: true,
            selectedAnswer: true,
          },

        },

      },

      orderBy: {
        createdAt: "desc",
      },

      skip,
      take: limit,

    });

  const total =
    await prisma.practiceQuestion.count({

      where: {
        examType,
        published: true,
      },

    });

  return {

    questions,

    total,

    totalPages:
      Math.ceil(
        total / limit
      ),

  };

};