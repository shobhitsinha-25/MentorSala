import { Router } from "express";

import { protect } from "../../auth/auth.middleware";

import {
  getStudentSubscriptionStateController,
  getStudentSubscriptionUsageController,
} from "./student.subscription.controller";

const router = Router();

router.get(
  "/state",
  protect,
  getStudentSubscriptionStateController
);

router.get(
  "/usage",
  protect,
  getStudentSubscriptionUsageController
);

export default router;