import type {
  Request,
  Response,
} from "express";

import {
  getStudentLeaderboard,
  getTop100StudentLeaderboard,
} from "./leaderboard.service";


// ======================================================
// GET STUDENT LEADERBOARD
// ======================================================
// Dashboard
// ======================================================

export const getStudentLeaderboardController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const userId =
        req.user?.userId;


      // ==================================================
      // AUTHENTICATION CHECK
      // ==================================================

      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      // ==================================================
      // GET DASHBOARD LEADERBOARD
      // ==================================================

      const result =
        await getStudentLeaderboard(
          userId
        );


      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        leaderboard:
          result.leaderboard,

        currentUser:
          result.currentUser,

      });

    } catch (error: unknown) {

      console.error(
        "[Leaderboard] Failed to fetch leaderboard:",
        error
      );


      const message =
        error instanceof Error
          ? error.message
          : "Failed to load leaderboard.";


      return res.status(500).json({

        success: false,

        message,

      });

    }

  };


// ======================================================
// GET TOP 100 STUDENT LEADERBOARD
// ======================================================
// Dedicated leaderboard page
// ======================================================

export const getTop100StudentLeaderboardController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const userId =
        req.user?.userId;


      // ==================================================
      // AUTHENTICATION CHECK
      // ==================================================

      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Authentication required.",

        });

      }


      // ==================================================
      // GET TOP 100 LEADERBOARD
      // ==================================================

      const result =
        await getTop100StudentLeaderboard(
          userId
        );


      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        leaderboard:
          result.leaderboard,

        currentUser:
          result.currentUser,

      });

    } catch (error: unknown) {

      console.error(
        "[Leaderboard] Failed to fetch top 100 leaderboard:",
        error
      );


      const message =
        error instanceof Error
          ? error.message
          : "Failed to load leaderboard.";


      return res.status(500).json({

        success: false,

        message,

      });

    }

  };