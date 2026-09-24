import {
  Router,
} from "express";

import {
  protect,
} from "../auth/auth.middleware";

import {
  authorizeRoles,
} from "../../middleware/role.middleware";

import {
  getStudentTestProgressController,
} from "./test-progress.controller";


const router =
  Router();


// ======================================================
// STUDENT TEST PROGRESS
// ======================================================

router.get(
  "/",
  protect,
  authorizeRoles("STUDENT"),
  getStudentTestProgressController
);


export default router;