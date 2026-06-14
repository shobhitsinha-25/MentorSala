import { Router } from "express";

import {
  protect,
} from "../auth/auth.middleware";

import {

  getProfile,

  updateProfile,

  getStats,

  leaderboard,

  getActivity,
  verifyDailyProblem,
  getAllStudentsController,
  completeOnboardingController,
  uploadAvatarController,

} from "./user.controller";
import uploadAvatar from "../../middleware/uploadAvatar";

const router = Router();

// ======================================================
// PROFILE
// ======================================================

router.get(

  "/profile",

  protect,

  getProfile

);

router.patch(

  "/profile",

  protect,

  updateProfile

);

router.patch(
  "/avatar",
  protect,
  uploadAvatar.single("avatar"),
  uploadAvatarController
);

// ======================================================
// DASHBOARD STATS
// ======================================================

router.get(

  "/dashboard-stats",

  protect,

  getStats

);

router.post(
  "/onboarding",
  protect,
  completeOnboardingController
);

// ======================================================
// LEADERBOARD
// ======================================================

router.get(

  "/leaderboard",

  leaderboard

);

// ======================================================
// USER ACTIVITY
// ======================================================

router.get(

  "/activity",

  protect,

  getActivity

);

router.post(

  "/gamification/verify-potd",

  protect,

  verifyDailyProblem

);

router.get(
  "/students",
  getAllStudentsController
);
export default router;