import {
  Router,
} from "express";

import {
  protect,
} from "../../auth/auth.middleware";

import {
  getAvailablePlansController,
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


export default router;