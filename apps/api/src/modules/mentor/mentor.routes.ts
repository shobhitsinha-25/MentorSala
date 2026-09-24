import { Router } from "express";

import { protect } from "../auth/auth.middleware";

import upload from "../../middleware/upload.middleware";

import {
  getMentorsController,
  getMentorByIdController,
  getPublicMentorsController,
  submitMentorApplication,
} from "./mentor.controller";

const router = Router();

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
// PUBLIC MENTOR ROUTES
// ==========================================

// Get verified mentors for public Mentors page
router.get(
  "/public",
  getPublicMentorsController
);

// ==========================================
// PROTECTED MENTOR ROUTES
// ==========================================

// Get all mentors
router.get(
  "/",
  protect,
  getMentorsController
);

// Get mentor by ID
router.get(
  "/:mentorId",
  protect,
  getMentorByIdController
);

export default router;