import type {

  Request,

  Response,

} from "express";

import {

  asyncHandler,

} from "../../../utils/asyncHandler";

import {

  getTestsSchema,saveAnswerSchema,markForReviewSchema,

} from "./student.test.validation";

import {

  getTests,getTestDetails,
  startTest,getAttempt,saveAnswer,markForReview,submitTest,
  getResult,getReview,getStudentSubjects,getStudentChapters

} from "./student.test.service";

interface TestParams {

  testId: string;

}

interface AttemptParams {

  attemptId: string;

}


// ======================================================
// GET ALL TESTS
// ======================================================

export const getTestsController =
  asyncHandler(

    async (

      req: Request,

      res: Response

    ) => {

      const query =
        getTestsSchema.parse(

          req.query

        );

      const result =
        await getTests(

          req.user!.userId,

          query

        );

      return res.status(200).json({

        success: true,

        ...result,

      });

    }

  );



// ======================================================
// GET TEST DETAILS
// ======================================================

export const getTestDetailsController =
  asyncHandler(

    async (

      req: Request,

      res: Response

    ) => {

      const test =
        await getTestDetails(

          req.params.testId as string,
          req.user!.userId as string
        );

      return res.status(200).json({

        success: true,

        test,

      });

    }

  );

  

// ======================================================
// START TEST
// ======================================================

export const startTestController =
  asyncHandler(

    async (

      req: Request<TestParams>,

      res: Response

    ) => {

      const attempt =
        await startTest(

          req.params.testId,

          req.user!.userId

        );

      return res.status(201).json({

        success: true,

        message:
          "Test started successfully.",

        attempt,

      });

    }

  );

  // ======================================================
// LOAD TEST ENGINE
// ======================================================

export const getAttemptController =
  asyncHandler(

    async (

      req: Request<AttemptParams>,

      res: Response

    ) => {

      const attempt =
        await getAttempt(

          req.params.attemptId,

          req.user!.userId

        );

      return res.status(200).json({

        success: true,

        attempt,

      });

    }

  );

  // ======================================================
// SAVE ANSWER
// ======================================================

export const saveAnswerController =
  asyncHandler(

    async (

      req: Request<AttemptParams>,

      res: Response

    ) => {

      const data =
        saveAnswerSchema.parse(

          req.body

        );

      const answer =
        await saveAnswer({

          attemptId:

            req.params.attemptId,

          userId:

            req.user!.userId,

          questionId:

            data.questionId,

          selectedAnswer:

            data.selectedAnswer,

          timeSpent:

            data.timeSpent,

        });

      return res.status(200).json({

        success: true,

        message:

          "Answer saved successfully.",

        answer,

      });

    }

  );

  // ======================================================
// MARK FOR REVIEW
// ======================================================

export const markForReviewController =
  asyncHandler(

    async (

      req: Request<AttemptParams>,

      res: Response

    ) => {

      const data =
        markForReviewSchema.parse(

          req.body

        );

      const answer =
        await markForReview({

          attemptId:

            req.params.attemptId,

          userId:

            req.user!.userId,

          questionId:

            data.questionId,

          markedForReview:

            data.markedForReview,

        });

      return res.status(200).json({

        success: true,

        message:

          "Review status updated successfully.",

        answer,

      });

    }

  );

// ======================================================
// SUBMIT TEST
// ======================================================

export const submitTestController =
  asyncHandler(

    async (

      req: Request<AttemptParams>,

      res: Response

    ) => {

      const result =
        await submitTest(

          req.params.attemptId,

          req.user!.userId

        );

      return res.status(200).json({

        success: true,

        message:

          "Test submitted successfully.",

        result,

      });

    }

  );

  // ======================================================
// GET RESULT SUMMARY
// ======================================================

export const getResultController =
  asyncHandler(

    async (

      req: Request<AttemptParams>,

      res: Response

    ) => {

      const result =
        await getResult(

          req.params.attemptId,

          req.user!.userId

        );

      return res.status(200).json({

        success: true,

        result,

      });

    }

  );

  // ======================================================
// GET QUESTION REVIEW
// ======================================================

export const getReviewController =
  asyncHandler(

    async (

      req: Request<AttemptParams>,

      res: Response

    ) => {

      const review =
        await getReview(

          req.params.attemptId,

          req.user!.userId

        );

      return res.status(200).json({

        success: true,

        review,

      });

    }

  );

  export const getStudentSubjectsController =
    asyncHandler(
  
      async (
  
        req: Request,
  
        res: Response
  
      ) => {
  
        const subjects =
          await getStudentSubjects(
  
            req.user!.userId
  
          );
  
        return res.status(200).json({
  
          success: true,
  
          subjects,
  
        });
  
      }
  
    );

// ======================================================
// GET STUDENT CHAPTERS
// ======================================================

export const getStudentChaptersController =
  asyncHandler(

    async (

      req: Request<{

        subjectId: string;

      }>,

      res: Response

    ) => {

      const chapters =
        await getStudentChapters(

          req.user!.userId,

          req.params.subjectId

        );

      return res.status(200).json({

        success: true,

        chapters,

      });

    }

  );