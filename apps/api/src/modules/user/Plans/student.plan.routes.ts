import {
  Router,
} from "express";

import {
  protect,
} from "../../auth/auth.middleware";

import {
  getAvailablePlansController,getPlanByIdController,
  getUpgradePriceController
} from "./student.plan.controller";


const router =
  Router();

// ======================================================
// GET AVAILABLE PLANS
// ======================================================

router.get(
  "/",
  protect,
  getAvailablePlansController
);

router.get(
  "/upgrade-price/:planId",
  protect,
  getUpgradePriceController
);

router.get(
  "/:planId",
  protect,
  getPlanByIdController
);


export default router;