import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  createTestSchema,
} from "../test.validation";

import {
  createTest,getTests,getTestById,updateTest,deleteTest
} from "./admin.test.service";

// ======================================================
// CREATE TEST
// ======================================================

export const createTestController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const data =
        createTestSchema.parse(
          req.body
        );

      const test =
        await createTest({

          ...data,

          createdBy: "ADMIN",

        });

      return res.status(201).json({

        success: true,

        message:
          "Test created successfully.",

        test,

      });

    }

  );

// ======================================================
// GET TESTS
// ======================================================

export const getTestsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const result =
        await getTests({

          page:
            Number(req.query.page) || 1,

          limit:
            Number(req.query.limit) || 20,

          search:
            req.query.search as string,

          examType:
            req.query.examType as string,

          type:
            req.query.type as string,

          status:
            req.query.status as string,

          subjectId:
            req.query.subjectId as string,

          chapterId:
            req.query.chapterId as string,

        });

      return res.status(200).json({

        success: true,

        ...result,

      });

    }

  );



// ======================================================
// GET TEST BY ID
// ======================================================

export const getTestByIdController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const test =
        await getTestById(

          req.params.testId as string

        );

      return res.status(200).json({

        success: true,

        test,

      });

    }

  );

// ======================================================
// UPDATE TEST
// ======================================================

export const updateTestController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const test =
        await updateTest({

          testId:
            req.params.testId,

          ...req.body,

        });

      return res.status(200).json({

        success: true,

        message:
          "Test updated successfully.",

        test,

      });

    }

  );


// ======================================================
// DELETE TEST
// ======================================================

export const deleteTestController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      await deleteTest(
        req.params.testId as string
      );

      return res.status(200).json({

        success: true,

        message:
          "Test deleted successfully.",

      });

    }

  );