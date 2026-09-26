import { Router } from "express";

import {
  createMentorReviewController,
} from "./mentor.review.controller";

import { protect } from "../../auth/auth.middleware";
import { authorizeRoles } from "../../../middleware/role.middleware";

import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/sessions/:sessionId/review",
  protect,
  authorizeRoles(Role.STUDENT),
  createMentorReviewController
);

export default router;