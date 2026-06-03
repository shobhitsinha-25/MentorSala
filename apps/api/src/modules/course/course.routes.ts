import { Router } from "express";

import { protect } from "../auth/auth.middleware";

import { authorizeRoles } from "../../middleware/role.middleware";

import {getAllCoursesController, searchCoursesController, updateProgressController} from "./course.controller";

import { getSingleCourseController } from "./course.controller";

import { enrollCourseController } from "./course.controller";

import { getMyCoursesController } from "./course.controller";

import {
  createCourseController,
} from "./course.controller";

const router = Router();

router.get(
  "/",
  getAllCoursesController
);

router.get(
  "/my-courses",
  protect,
  getMyCoursesController
);

router.get(
  "/search",
  searchCoursesController
);

router.get(
  "/:id",
  getSingleCourseController
);

router.post(
  "/",
  protect,
  authorizeRoles(
    "MENTOR",
    "ADMIN"
  ),
  createCourseController
);

router.post(
  "/:id/enroll",
  protect,
  enrollCourseController
);

router.patch(
  "/:id/progress",
  protect,
  updateProgressController
);



export default router;