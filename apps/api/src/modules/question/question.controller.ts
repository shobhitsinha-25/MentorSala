import { Request, Response }
from "express";

import {
  createQuestion,
  getQuestionsForStudent
} from "./question.service";
import prisma from "../../config/prisma";
import { ExamType } from "@prisma/client";

export const createQuestionController =
async (
  req: Request,
  res: Response
) => {

  const question =
    await createQuestion(
      req.body
    );

  return res.status(201).json({
    success: true,
    data: question,
  });

};

export const getStudentQuestionsController =
async (
  req: Request,
  res: Response
) => {

  if (!req.user) {
  return res.status(401).json({
    message: "Unauthorized",
  });
}

const user = await prisma.user.findUnique({
  where: {
    id: req.user.userId,
  },
});

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  if (!user.targetExam) {
  return res.status(400).json({
    success: false,
    message: "Target exam not selected",
  });
}

  const page =
  Number(req.query.page) || 1;

const result =
  await getQuestionsForStudent(
    user.targetExam,
    req.user.userId,
    page
  );

return res.json({
  success: true,
  questions: result.questions,
  total: result.total,
  totalPages: result.totalPages,
  currentPage: page,
});

};

export const submitAnswerController =
async (req: Request, res: Response) => {

  const { questionId, answer } =
    req.body;

  const question =
    await prisma.practiceQuestion.findUnique({
      where: {
        id: questionId,
      },
    });

  if (!question) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  const isCorrect =
    answer === question.answer;

  await prisma.questionAttempt.upsert({
  where: {
    userId_questionId: {
      userId: req.user!.userId,
      questionId,
    },
  },

  update: {
    selectedAnswer: answer,
    isCorrect,
    attemptedAt: new Date(),
  },

  create: {
    userId: req.user!.userId,
    questionId,
    selectedAnswer: answer,
    isCorrect,
  },
});

  return res.json({
    success: true,
    isCorrect,
    correctAnswer:
      question.answer,
  });

};