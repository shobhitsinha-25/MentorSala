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

} from "./user.controller";

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