import type {
  Request,
  Response,
} from "express";

import {
  getStudentTestProgress,
} from "./test-progress.service";


// ======================================================
// GET STUDENT TEST PROGRESS
// ======================================================

export const getStudentTestProgressController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const userId =
        req.user?.userId;


      // ==================================================
      // AUTH CHECK
      // ==================================================

      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      // ==================================================
      // GET PROGRESS
      // ==================================================

      const progress =
        await getStudentTestProgress(
          userId
        );


      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        progress,

      });

    } catch (error: unknown) {

      console.error(
        "[Test Progress] Failed to fetch:",
        error
      );


      const message =
        error instanceof Error
          ? error.message
          : "Failed to load test progress.";


      return res.status(500).json({

        success: false,

        message,

      });

    }

  };