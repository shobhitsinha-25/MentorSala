import { Router } from "express";

import {
  adminProtect,
} from "../../admin/admin.auth.middleware";

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

  adminProtect,

  createTestController

);

router.get(

  "/",

  adminProtect,

  getTestsController

);

router.get(

  "/:testId",

  adminProtect,

  getTestByIdController

);

router.put(
  "/:testId",
  adminProtect,
  updateTestController
);

router.delete(

  "/:testId",

  adminProtect,

  deleteTestController

);
export default router;