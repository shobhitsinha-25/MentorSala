import {
  Router,
} from "express";

import { protect, authorizeRoles } from "../auth/auth.middleware";
import { Role } from "@prisma/client";

import {

  createSubjectController,getSubjectsController,
  updateSubjectController,deleteSubjectController


}
from "./subject.controller";

const router =
Router();

// ======================================================
// CREATE SUBJECT
// ======================================================

router.post(
  "/",
  protect,
  authorizeRoles(Role.ADMIN),
  createSubjectController
);

// ======================================================
// GET SUBJECTS
// ======================================================

router.get(

  "/",

  protect,
  authorizeRoles(Role.ADMIN),

  getSubjectsController

);

// ======================================================
// UPDATE SUBJECT
// ======================================================

router.put(

  "/:subjectId",

  protect,
  authorizeRoles(Role.ADMIN),

  updateSubjectController

);

router.delete(
  "/:subjectId",
  protect,
  authorizeRoles(Role.ADMIN),
  deleteSubjectController
);

export default router;