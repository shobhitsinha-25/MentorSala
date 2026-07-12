import { Router } from "express";

import { protect, authorizeRoles } from "../../auth/auth.middleware";
import { Role } from "@prisma/client";

import {
  createTestController,getTestsController,getTestByIdController,updateTestController,deleteTestController
} from "./admin.test.controller";

const router =
  Router();

// ======================================================
// CREATE TEST
// ======================================================

router.post(

  "/",

  protect,
  authorizeRoles(Role.ADMIN),

  createTestController

);

router.get(

  "/",

  protect,
  authorizeRoles(Role.ADMIN),

  getTestsController

);

router.get(

  "/:testId",

  protect,
  authorizeRoles(Role.ADMIN),

  getTestByIdController

);

router.put(
  "/:testId",
  protect,
  authorizeRoles(Role.ADMIN),
  updateTestController
);

router.delete(

  "/:testId",

  protect,
  authorizeRoles(Role.ADMIN),

  deleteTestController

);
export default router;