import type {
  Request,
  Response,
} from "express";

import { asyncHandler }
from "../../utils/asyncHandler";

import {
  createSubjectSchema,
}
from "./subject.validation";

import {
  createSubject,getSubjects,updateSubject,
}
from "./subject.service";


// ======================================================
// CREATE SUBJECT
// ======================================================

export const createSubjectController =
asyncHandler(

  async (

    req: Request,

    res: Response

  ) => {

    const data =
      createSubjectSchema.parse(
        req.body
      );

    const subject =
      await createSubject(data);

    return res.status(201).json({

      success: true,

      message:
        "Subject created successfully.",

      subject,

    });

  }

);

// ======================================================
// GET SUBJECTS
// ======================================================

export const getSubjectsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const {

        examType,

        search,

        page,

        limit,

      } = req.query;

      const result =
        await getSubjects({

          examType:
            examType as string,

          search:
            search as string,

          page:
            page
              ? Number(page)
              : 1,

          limit:
            limit
              ? Number(limit)
              : 10,

        });

      return res.status(200).json({

        success: true,

        ...result,

      });

    }

  );


// ======================================================
// UPDATE SUBJECT
// ======================================================

export const updateSubjectController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const subject =
        await updateSubject({

          subjectId:
            req.params.subjectId,

          ...req.body,

        });

      return res.status(200).json({

        success: true,

        message:
          "Subject updated successfully.",

        subject,

      });

    }

  );

import {
  deleteSubject,
} from "./subject.service";

// ======================================================
// DELETE SUBJECT
// ======================================================

export const deleteSubjectController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const subjectId = req.params.subjectId as string;

      await deleteSubject(subjectId);

      return res.status(200).json({

        success: true,

        message:
          "Subject deleted successfully.",

      });

    }

  );