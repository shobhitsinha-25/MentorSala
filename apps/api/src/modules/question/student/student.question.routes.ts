import { Router } from "express";

import { protect } from "../../auth/auth.middleware";

import {
  getStudentQuestionsController,
  submitAnswerController,
} from "./student.question.controller";

const router = Router();

// ======================================================
// GET QUESTIONS FOR STUDENT
// ======================================================

router.get(
  "/",
  protect,
  getStudentQuestionsController
);

// ======================================================
// SUBMIT ANSWER
// ======================================================

router.post(
  "/submit",
  protect,
  submitAnswerController
);

export default router;