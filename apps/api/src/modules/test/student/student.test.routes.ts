import {
  Router,
} from "express";

import {
  protect,authorizeRoles
} from "../../auth/auth.middleware";

import {

  getTestsController,getTestDetailsController,
  startTestController,getAttemptController,saveAnswerController,
  markForReviewController,submitTestController,getResultController,
  getReviewController,getStudentSubjectsController,getStudentChaptersController
} from "./student.test.controller";

const router =
  Router();


// ======================================================
// TESTS
// ======================================================

router.get(

  "/",

  protect,

  getTestsController

);

// ======================================================
// STUDENT SUBJECTS
// ======================================================

router.get(
  "/subjects",
  protect,
  authorizeRoles("STUDENT"),
  getStudentSubjectsController
);

// ======================================================
// GET STUDENT CHAPTERS
// ======================================================

router.get(

  "/subjects/:subjectId/chapters",

  protect,

  authorizeRoles(

    "STUDENT"

  ),

  getStudentChaptersController

);
// ======================================================
// GET SINGLE TEST
// ======================================================

router.get(
  "/:testId",
  protect,
  getTestDetailsController
);

router.post(
  "/:testId/start",
  protect,
  startTestController
);

router.get(

  "/attempts/:attemptId",

  protect,

  getAttemptController

);

// ======================================================
// SAVE ANSWER
// ======================================================

router.patch(

  "/attempts/:attemptId/answer",

  protect,

  saveAnswerController

);

// ======================================================
// MARK FOR REVIEW
// ======================================================

router.patch(

  "/attempts/:attemptId/review",

  protect,

  markForReviewController

);

// ======================================================
// SUBMIT TEST
// ======================================================

router.post(

  "/attempts/:attemptId/submit",

  protect,

  submitTestController

);

// ======================================================
// GET RESULT SUMMARY
// ======================================================

router.get(

  "/attempts/:attemptId/result",

  protect,

  getResultController

);

// ======================================================
// GET QUESTION REVIEW
// ======================================================

router.get(

  "/attempts/:attemptId/review",

  protect,

  getReviewController

);

export default router;