import { Router }
from "express";

import { protect }
from "../auth/auth.middleware";

import upload
from "../../middleware/upload.middleware";
import {
  authorizeRoles,
} from "../../middleware/role.middleware";

import {
  
  getMentorsController,
  getMentorByIdController,
} from "./mentor.controller";

import {

  submitMentorApplication,

} from "./mentor.controller";

const router =
  Router();

// ==========================================
// MENTOR ONBOARDING
// ==========================================

router.post(

  "/onboarding",

  protect,

  upload.single("resume"),

  submitMentorApplication

);

// ==========================================
// GET ASSIGNED SUBJECTS
// ==========================================






// ======================================================
// GET ALL MENTORS
// ======================================================

router.get(
  "/",
  getMentorsController
);

router.get(

  "/:mentorId",
  protect,
  getMentorByIdController

);


export default router;