import {
  Router,
} from "express";

import { protect }
from "../auth/auth.middleware";

import {
  authorizeRoles,
}
from "../../middleware/role.middleware";

import { adminProtect }
from "../admin/admin.auth.middleware";

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
  adminProtect,
  createSubjectController
);

// ======================================================
// GET SUBJECTS
// ======================================================

router.get(

  "/",

  adminProtect,

  getSubjectsController

);

// ======================================================
// UPDATE SUBJECT
// ======================================================

router.put(

  "/:subjectId",

  adminProtect,

  updateSubjectController

);

router.delete(
  "/:subjectId",
  adminProtect,
  deleteSubjectController
);

export default router;