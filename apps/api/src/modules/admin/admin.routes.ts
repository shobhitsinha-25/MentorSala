import {
  Router,
} from "express";

import {
  protect,
} from "../auth/auth.middleware";

import {
  authorizeRoles,
} from "../../middleware/role.middleware";

/*import {
  createCourse,
} from "./admin.controller";

import {
  createSubject,
} from "./admin.controller";*/

import {
  assignMentor,
} from "./admin.controller";

const router =
  Router();

// ==========================================
// CREATE COURSE
// ==========================================

/*router.post(

  "/courses",

  protect,

  authorizeRoles(
    "ADMIN"
  ),

  createCourse

);

router.post(

  "/subjects",

  protect,

  authorizeRoles(
    "ADMIN"
  ),

  createSubject

);*/

router.post(

  "/assign-mentor",

  protect,

  authorizeRoles(
    "ADMIN"
  ),

  assignMentor

);

export default router;