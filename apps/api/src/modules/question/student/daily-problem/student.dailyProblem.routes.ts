import { Router } from "express";

import {
  protect,
} from "../../../auth/auth.middleware";

import {
  getTodayDailyProblemController,
  verifyDailyProblemController,
} from "./student.dailyProblem.controller";

const router = Router();

// ======================================================
// GET TODAY'S DAILY PROBLEM
// ======================================================

router.get(
  "/",
  protect,
  getTodayDailyProblemController
);

// ======================================================
// VERIFY ANSWER
// ======================================================

router.post(
  "/verify",
  protect,
  verifyDailyProblemController
);

export default router;