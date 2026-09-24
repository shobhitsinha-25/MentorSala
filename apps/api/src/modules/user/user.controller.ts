import {
  Request,
  Response,
} from "express";

import {
  ExamType,
} from "@prisma/client";

import {
  asyncHandler,
} from "../../utils/asyncHandler";

import prisma from "../../config/prisma";

import {

  getUserProfile,

  updateUserProfile,

  getDashboardStats,

  getLeaderboard,

  getUserActivity,
  getStudents,
  uploadUserAvatar,

} from "./user.service";
import uploadAvatar from "../../middleware/uploadAvatar";

import {
  ensureFreeTrial,
} from "./subscription/entitlement/free-trial.service";

// ======================================================
// GET PROFILE
// ======================================================

export const getProfile =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // AUTH CHECK
      // ================================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ================================================
      // FETCH PROFILE
      // ================================================

      const user =
        await getUserProfile(

          req.user.userId

        );

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        user,

      });

    }

  );

// ======================================================
// COMPLETE ONBOARDING OF STUDENT
// ======================================================

export const completeOnboardingController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // AUTH CHECK
      // ================================================

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // ================================================
      // REQUEST DATA
      // ================================================

      const {
        targetExam,
      } = req.body;

      if (!targetExam) {
        return res.status(400).json({
          success: false,
          message: "Target exam is required.",
        });
      }

      // ================================================
      // VALIDATE TARGET EXAM
      // ================================================

      if (
        !Object.values(ExamType).includes(
          targetExam as ExamType
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid target exam.",
        });
      }

      // ================================================
      // CHECK CURRENT USER
      // ================================================

      const existingUser =
        await prisma.user.findUnique({
          where: {
            id: req.user.userId,
          },

          select: {
            id: true,
            onboardingCompleted: true,
          },
        });

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // ================================================
      // ONBOARDING ALREADY COMPLETED
      // ================================================

      if (
        existingUser.onboardingCompleted
      ) {
        const user =
          await prisma.user.findUnique({
            where: {
              id: req.user.userId,
            },
          });

        return res.status(200).json({
          success: true,
          message: "Onboarding already completed.",
          user,
        });
      }

      // ================================================
      // START FREE TRIAL
      // ================================================
      //
      // ensureFreeTrial() is responsible for:
      //
      // 1. Finding the correct trial plan
      // 2. Creating the UserSubscription
      // 3. Setting trialStartedAt
      // 4. Setting trialExpiresAt
      // 5. Marking the subscription as isTrial = true
      //
      // Trial starts ONLY after onboarding is completed.
      //

      await ensureFreeTrial(
        req.user.userId,
        targetExam as ExamType
      );

      // ================================================
      // FETCH UPDATED USER
      // ================================================

      const user =
        await prisma.user.findUnique({
          where: {
            id: req.user.userId,
          },
        });

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({
        success: true,
        message:
          "Onboarding completed and free trial started successfully.",
        user,
      });
    }
  );

// ======================================================
// UPDATE PROFILE
// ======================================================

export const updateProfile =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // AUTH CHECK
      // ================================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ================================================
      // USER ID
      // ================================================

      const userId =
        req.user.userId;

      // ================================================
      // BODY
      // ================================================

      const {

        name,

        avatar,

        targetExam,

        onboardingCompleted,

      } = req.body;

      // ================================================
      // UPDATE USER
      // ================================================

      const updatedUser =
        await updateUserProfile(

          userId,

          {

            name,

            avatar,

            targetExam:

              targetExam

                ? targetExam as ExamType

                : undefined,

            onboardingCompleted,

          }

        );

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        user:
          updatedUser,

      });

    }

  );

// ======================================================
// DASHBOARD STATS
// ======================================================

export const getStats =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // AUTH CHECK
      // ================================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ================================================
      // FETCH STATS
      // ================================================

      const stats =
        await getDashboardStats(

          req.user.userId

        );

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        stats,

      });

    }

  );

// ======================================================
// LEADERBOARD
// ======================================================

export const leaderboard =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const users =
        await getLeaderboard();

      return res.status(200).json({

        success: true,

        users,

      });

    }

  );

// ======================================================
// USER ACTIVITY
// ======================================================

export const getActivity =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // AUTH CHECK
      // ================================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ================================================
      // FETCH ACTIVITY
      // ================================================

      const activities =
        await getUserActivity(

          req.user.userId

        );

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        activities,

      });

    }

  );

// ======================================================
// VERIFY DAILY PROBLEM
// ======================================================

export const verifyDailyProblem =
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

      const userId =
        req.user.userId;

      const user =
        await prisma.user.findUnique({

          where: {

            id: userId,

          },

        });

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      const today =
        new Date();

      const todayString =
        today
          .toISOString()
          .split("T")[0];

      if (
        user.lastPotdSolvedAt
      ) {

        const solvedDate =
          user.lastPotdSolvedAt
            .toISOString()
            .split("T")[0];

        if (
          solvedDate ===
          todayString
        ) {

          return res.status(200).json({

            success: true,

            alreadySolved: true,

            message:
              "Problem of the Day already completed",

          });

        }

      }

      const updatedUser =
        await prisma.user.update({

          where: {

            id: userId,

          },

          data: {

            streak: {

              increment: 1,

            },

            xp: {

              increment: 10,

            },

            lastPotdSolvedAt:
              new Date(),

          },

        });

      return res.status(200).json({

        success: true,

        alreadySolved: false,

        message:
          "Problem completed successfully",

        user:
          updatedUser,

      });

    }

  );

export const getAllStudentsController =
async (
      req: Request,
      res: Response
) => {

  const students =
    await getStudents();

  return res.status(200).json({
    success: true,
    data: students,
  });

};

export const uploadAvatarController =
  asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Avatar image is required",
      });
    }

    const user = await uploadUserAvatar(userId, req.file);

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      user,
    });

  });