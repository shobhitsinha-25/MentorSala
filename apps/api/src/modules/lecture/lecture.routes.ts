import express from "express";

import {
  createLectureHandler,
  getCourseLecturesHandler,
  markLectureCompleteHandler,
  continueLearningHandler,
} from "./lecture.controller";

import { authorizeRoles, protect } from "../auth/auth.middleware";


const router = express.Router();

router.post(
  "/course/:courseId",
  protect,
  createLectureHandler
);

router.get(
  "/course/:courseId",
  protect,
  getCourseLecturesHandler
);

router.post(
  "/:lectureId/complete",
  protect,
  authorizeRoles("MENTOR", "ADMIN"),
  markLectureCompleteHandler
);

router.get(
  "/continue-learning",
  protect,
  continueLearningHandler
);

export default router;