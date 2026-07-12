import { Router } from "express";

import { protect, authorizeRoles } from "../../auth/auth.middleware";
import { Role } from "@prisma/client";

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

  protect,
  authorizeRoles(Role.ADMIN),

  createQuestionController

);

router.get(
  "/",
  protect,
  authorizeRoles(Role.ADMIN),
  getQuestionsController
);

// ======================================================
// GET QUESTION BY ID
// ======================================================

router.get(

  "/:questionId",
  protect,
  authorizeRoles(Role.ADMIN),
  getQuestionByIdController

);

router.put(

  "/:questionId",

  protect,
  authorizeRoles(Role.ADMIN),

  updateQuestionController

);

router.delete(

  "/:questionId",

  protect,
  authorizeRoles(Role.ADMIN),

  deleteQuestionController

);
export default router;