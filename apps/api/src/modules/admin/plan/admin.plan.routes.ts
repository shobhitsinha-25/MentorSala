import {
  Router,
} from "express";

import {
  protect,
  authorizeRoles,
} from "../../auth/auth.middleware";

import {
  Role,
} from "@prisma/client";

import {
  createPlanController,
  getPlanByIdController,
  getPlansController,updatePlanController,deactivatePlanController
} from "./admin.plan.controller";


const router =
  Router();


// ======================================================
// CREATE PLAN
// POST /admin/plans
// ======================================================

router.post(

  "/",

  protect,

  authorizeRoles(
    Role.ADMIN
  ),

  createPlanController

);


// ======================================================
// GET ALL PLANS
// GET /admin/plans
// ======================================================

router.get(

  "/",

  protect,

  authorizeRoles(
    Role.ADMIN
  ),

  getPlansController

);

router.get(

  "/:planId",

  protect,

  authorizeRoles(
    Role.ADMIN
  ),

  getPlanByIdController

);

router.put(

  "/:planId",

  protect,

  authorizeRoles(
    Role.ADMIN
  ),

  updatePlanController

);

router.patch(

  "/:planId/deactivate",

  protect,

  authorizeRoles(
    Role.ADMIN
  ),

  deactivatePlanController

);


export default router;