import { Router } from "express";

import { protect, authorizeRoles } from "../../auth/auth.middleware";
import { Role } from "@prisma/client";
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

  protect,
  authorizeRoles(Role.ADMIN),

  attachQuestionsController

);


router.get(

  "/:testId/questions",

  protect,
  authorizeRoles(Role.ADMIN),

  getTestQuestionsController

);

router.delete(

  "/:testId/questions/:questionId",

  protect,
  authorizeRoles(Role.ADMIN),

  removeQuestionController

);

router.put(

  "/:testId/questions/reorder",

  protect,
  authorizeRoles(Role.ADMIN),

  reorderQuestionsController

);

router.put(

  "/:testId/publish",

  protect,
  authorizeRoles(Role.ADMIN),

  publishTestController

);
export default router;