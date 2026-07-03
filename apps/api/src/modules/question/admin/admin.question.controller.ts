import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  createQuestionSchema,
} from "../question.validation";

import {
  createQuestion,getQuestions,getQuestionById,updateQuestion,deleteQuestion
} from "./admin.question.service";

// ======================================================
// CREATE QUESTION
// ======================================================

export const createQuestionController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const data =
        createQuestionSchema.parse(
          req.body
        );

      const question =
        await createQuestion({
          ...data,
          createdBy:
            "ADMIN", 
        });

      return res.status(201).json({

        success: true,

        message:
          "Question created successfully.",

        question,

      });

    }

  );


// ======================================================
// GET QUESTIONS
// ======================================================

export const getQuestionsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const result =
        await getQuestions({

          examType:
            req.query.examType as string,

          subjectId:
            req.query.subjectId as string,

          chapterId:
            req.query.chapterId as string,

          difficulty:
            req.query.difficulty as string,

          questionType:
            req.query.questionType as string,

          search:
            req.query.search as string,

          page:
            Number(req.query.page) || 1,

          limit:
            Number(req.query.limit) || 20,

        });

      return res.status(200).json({

        success: true,

        ...result,

      });

    }

  );

// ======================================================
// GET QUESTION BY ID
// ======================================================

export const getQuestionByIdController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const question =
        await getQuestionById(

          req.params.questionId as string

        );

      return res.status(200).json({

        success: true,

        question,

      });

    }

  );

// ======================================================
// UPDATE QUESTION
// ======================================================

export const updateQuestionController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const question =
        await updateQuestion({

          questionId:
            req.params.questionId as string,

          ...req.body,

        });

      return res.status(200).json({

        success: true,

        message:
          "Question updated successfully.",

        question,

      });

    }

  );

// ======================================================
// DELETE QUESTION
// ======================================================

export const deleteQuestionController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      await deleteQuestion(

        req.params.questionId as string

      );

      return res.status(200).json({

        success: true,

        message:
          "Question deleted successfully.",

      });

    }

  );