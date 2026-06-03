import { Router } from "express";

import {
  createQuestionController,
  getStudentQuestionsController,
  submitAnswerController
} from "./question.controller";
import { protect } from "../auth/auth.middleware";

const router = Router();

router.post(
  "/",
  createQuestionController
);

router.get(
  "/student",
  protect,
  getStudentQuestionsController
);

router.post(
  "/submit",
  protect,
  submitAnswerController
);

export default router;