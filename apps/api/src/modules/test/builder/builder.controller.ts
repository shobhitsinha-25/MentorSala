import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  attachQuestionsSchema,
} from "./builder.validation";

import {
  attachQuestions,getTestQuestions,removeQuestion,reorderQuestions,publishTest
} from "./builder.service";

// ======================================================
// ATTACH QUESTIONS TO TEST
// ======================================================

export const attachQuestionsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const data =
        attachQuestionsSchema.parse(
          req.body
        );

      const result =
        await attachQuestions({

          testId:
            req.params.testId as string,

          questions:
            data.questions,

        });

      return res.status(200).json({

        success: true,

        message:
          "Questions attached successfully.",

        data: result,

      });

    }

  );


// ======================================================
// GET TEST QUESTIONS
// ======================================================

export const getTestQuestionsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const questions =
        await getTestQuestions(

          req.params.testId as string

        );

      return res.status(200).json({

        success: true,

        questions,

      });

    }

  );

// ======================================================
// REMOVE QUESTION
// ======================================================

export const removeQuestionController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const result =
        await removeQuestion(

          req.params.testId as string,

          req.params.questionId as string

        );

      return res.status(200).json({

        success: true,

        message:
          "Question removed successfully.",

        data: result,

      });

    }

  );

import {
  reorderQuestionsSchema,
} from "./builder.validation";


// ======================================================
// REORDER QUESTIONS
// ======================================================

export const reorderQuestionsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const data =
        reorderQuestionsSchema.parse(
          req.body
        );

      const questions =
        await reorderQuestions({

          testId:
            req.params.testId as string,

          questions:
            data.questions,

        });

      return res.status(200).json({

        success: true,

        message:
          "Questions reordered successfully.",

        questions,

      });

    }

  );

// ======================================================
// PUBLISH TEST
// ======================================================

export const publishTestController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const test =
        await publishTest(

          req.params.testId as string

        );

      return res.status(200).json({

        success: true,

        message:
          "Test published successfully.",

        test,

      });

    }

  );