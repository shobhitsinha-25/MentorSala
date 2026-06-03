import { Router } from "express";

import { protect } from "../auth/auth.middleware";
import {
  createPlanController,
  getMySubscriptionController,
  getPlansController,
  getStudentPlansController,
  purchasePlanController
} from "./subscription.controller";

const router = Router();

router.post(
  "/",
  createPlanController
);

router.get(
  "/",
  getPlansController
);

router.get(
  "/student",
  protect,
  getStudentPlansController
);

router.get(
  "/my-subscription",
  protect,
  getMySubscriptionController
);

router.post(
  "/purchase",
  protect,
  purchasePlanController
);

export default router;