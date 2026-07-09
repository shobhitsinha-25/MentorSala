import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../utils/asyncHandler";

import {
  createChapterSchema,
} from "./chapter.validation";

import {
  createChapter,getChapters,updateChapter,deleteChapter,getAllChapters
} from "./chapter.service";

// ======================================================
// CREATE CHAPTER
// ======================================================

export const createChapterController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const data =
        createChapterSchema.parse(
          req.body
        );

      const chapter =
        await createChapter(
          data
        );

      return res.status(201).json({

        success: true,

        message:
          "Chapter created successfully.",

        chapter,

      });

    }

  );

  

// ======================================================
// GET CHAPTERS
// ======================================================

export const getChaptersController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const {

        subjectId,

        search,

        page,

        limit,

      } = req.query;

      const result =
        await getChapters({

          subjectId:
            subjectId as string,

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
// GET ALL CHAPTERS (NO PAGINATION)
// ======================================================

export const getAllChaptersController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const { subjectId } = req.query;

      const chapters =
        await getAllChapters(

          subjectId as string | undefined

        );

      return res.status(200).json({

        success: true,

        chapters,

      });

    }

  );

// ======================================================
// UPDATE CHAPTER
// ======================================================

export const updateChapterController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const chapter =
        await updateChapter({

          chapterId:
            req.params.chapterId as string,

          ...req.body,

        });

      return res.status(200).json({

        success: true,

        message:
          "Chapter updated successfully.",

        chapter,

      });

    }

  );


// ======================================================
// DELETE CHAPTER
// ======================================================

export const deleteChapterController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      await deleteChapter(
        req.params.chapterId as string
      );

      return res.status(200).json({

        success: true,

        message:
          "Chapter deleted successfully.",

      });

    }

  );