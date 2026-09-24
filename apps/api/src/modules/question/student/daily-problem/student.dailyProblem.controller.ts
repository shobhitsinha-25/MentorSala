import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../../utils/asyncHandler";

import {
  getTodayDailyProblem,
  verifyDailyProblemAnswer,
} from "./student.dailyProblem.service";

// ======================================================
// GET TODAY'S DAILY PROBLEM
// ======================================================

export const getTodayDailyProblemController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const dailyProblem =
        await getTodayDailyProblem();

      return res.status(200).json({
        success: true,
        dailyProblem,
      });
    }
  );

// ======================================================
// VERIFY DAILY PROBLEM
// ======================================================

export const verifyDailyProblemController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const {
        dailyProblemId,
        answer,
      } = req.body;

      if (!dailyProblemId) {
        return res.status(400).json({
          success: false,
          message:
            "Daily problem ID is required.",
        });
      }

      if (
        answer === undefined ||
        answer === null
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Answer is required.",
        });
      }

      const result =
        await verifyDailyProblemAnswer({
          userId:
            req.user.userId,

          dailyProblemId,

          answer,
        });

      // ==============================================
      // ALREADY SOLVED
      // ==============================================

      if (
        result.alreadySolved
      ) {
        return res.status(200).json({
          success: true,

          correct: false,

          alreadySolved: true,

          xpAwarded:
            result.xpAwarded,

          level:
            result.level,

          message:
            "Problem of the Day already completed.",

          user:
            result.user,
        });
      }

      // ==============================================
      // INCORRECT
      // ==============================================

      if (!result.correct) {
        return res.status(200).json({
          success: true,

          correct: false,

          alreadySolved: false,

          xpAwarded:
            0,

          level:
            result.level,

          message:
            "Incorrect answer.",
        });
      }

      // ==============================================
      // CORRECT
      // ==============================================

      return res.status(200).json({
        success: true,

        correct: true,

        alreadySolved: false,

        xpAwarded:
          result.xpAwarded,

        level:
          result.level,

        message:
          "Correct answer! Problem completed successfully.",

        user:
          result.user,
      });
    }
  );