import { Router } from "express";

import { protect } from "../auth/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

import {
  getStudentLeaderboardController,
  getTop100StudentLeaderboardController,
} from "./leaderboard.controller";


const router =
  Router();


// ======================================================
// DASHBOARD LEADERBOARD
// ======================================================

router.get(
  "/",
  protect,
  authorizeRoles("STUDENT"),
  getStudentLeaderboardController
);


// ======================================================
// TOP 100 LEADERBOARD
// ======================================================

router.get(
  "/all",
  protect,
  authorizeRoles("STUDENT"),
  getTop100StudentLeaderboardController
);


export default router;