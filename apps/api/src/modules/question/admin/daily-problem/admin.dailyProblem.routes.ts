import { Router } from "express";

import {
  protect,
  authorizeRoles,
} from "../../../auth/auth.middleware";

import { Role } from "@prisma/client";

import {
  setDailyProblemController,
  getDailyProblemController,
  removeDailyProblemController,
} from "./admin.dailyProblem.controller";

const router = Router();

// ======================================================
// SET DAILY PROBLEM
// ======================================================

router.post(
  "/",
  protect,
  authorizeRoles(Role.ADMIN),
  setDailyProblemController
);

// ======================================================
// GET DAILY PROBLEM
// ======================================================

router.get(
  "/",
  protect,
  authorizeRoles(Role.ADMIN),
  getDailyProblemController
);

// ======================================================
// REMOVE DAILY PROBLEM
// ======================================================

router.delete(
  "/",
  protect,
  authorizeRoles(Role.ADMIN),
  removeDailyProblemController
);

export default router;