import { Router } from "express";

import {
  adminProtect,
} from "../../admin/admin.auth.middleware";

import {
  attachQuestionsController,
  getTestQuestionsController,
  publishTestController,
  removeQuestionController,
  reorderQuestionsController,
} from "./builder.controller";

const router =
  Router();

// ======================================================
// ATTACH QUESTIONS TO TEST
// ======================================================

router.post(

  "/:testId/questions",

  adminProtect,

  attachQuestionsController

);


router.get(

  "/:testId/questions",

  adminProtect,

  getTestQuestionsController

);

router.delete(

  "/:testId/questions/:questionId",

  adminProtect,

  removeQuestionController

);

router.put(

  "/:testId/questions/reorder",

  adminProtect,

  reorderQuestionsController

);

router.put(

  "/:testId/publish",

  adminProtect,

  publishTestController

);
export default router;