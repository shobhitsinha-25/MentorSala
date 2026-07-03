import { Router } from "express";

import {
  adminProtect,
} from "../../admin/admin.auth.middleware";

import {
  createQuestionController,
  deleteQuestionController,
  getQuestionByIdController,
  getQuestionsController,
  updateQuestionController,
} from "./admin.question.controller";

const router =
  Router();

// ======================================================
// CREATE QUESTION
// ======================================================

router.post(

  "/",

  adminProtect,

  createQuestionController

);

router.get(
  "/",
  adminProtect,
  getQuestionsController
);

// ======================================================
// GET QUESTION BY ID
// ======================================================

router.get(

  "/:questionId",

  adminProtect,

  getQuestionByIdController

);

router.put(

  "/:questionId",

  adminProtect,

  updateQuestionController

);

router.delete(

  "/:questionId",

  adminProtect,

  deleteQuestionController

);
export default router;