import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../../utils/asyncHandler";

import {
  setDailyProblem,
  getDailyProblem,
  removeDailyProblem,
} from "./admin.dailyProblem.service";

// ======================================================
// SET DAILY PROBLEM
// ======================================================

export const setDailyProblemController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const {
        questionId,
        date,
      } = req.body;

      if (
        typeof questionId !== "string" ||
        !questionId.trim()
      ) {
        throw new Error(
          "Question ID is required."
        );
      }

      if (
        typeof date !== "string" ||
        !date.trim()
      ) {
        throw new Error(
          "Date is required."
        );
      }

      const parsedDate =
        new Date(date);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        throw new Error(
          "Invalid date."
        );
      }

      const dailyProblem =
        await setDailyProblem({
          questionId,
          date: parsedDate,
        });

      return res.status(201).json({
        success: true,

        message:
          "Daily problem set successfully.",

        dailyProblem,
      });
    }
  );

// ======================================================
// GET DAILY PROBLEM
// ======================================================

export const getDailyProblemController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const date =
        req.query.date as string;

      if (!date) {
        throw new Error(
          "Date is required."
        );
      }

      const parsedDate =
        new Date(date);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        throw new Error(
          "Invalid date."
        );
      }

      const dailyProblem =
        await getDailyProblem(
          parsedDate
        );

      return res.status(200).json({
        success: true,

        dailyProblem,
      });
    }
  );

// ======================================================
// REMOVE DAILY PROBLEM
// ======================================================

export const removeDailyProblemController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const date =
        req.query.date as string;

      if (!date) {
        throw new Error(
          "Date is required."
        );
      }

      const parsedDate =
        new Date(date);

      if (
        Number.isNaN(
          parsedDate.getTime()
        )
      ) {
        throw new Error(
          "Invalid date."
        );
      }

      await removeDailyProblem(
        parsedDate
      );

      return res.status(200).json({
        success: true,

        message:
          "Daily problem removed successfully.",
      });
    }
  );