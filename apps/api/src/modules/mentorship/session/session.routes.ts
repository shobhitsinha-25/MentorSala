import { Router }
from "express";

import {
  bookSession,
  cancelBookedSession,
  completeMentorshipSession,
  getMentorUpcomingSessions,
  getMySessions,
  getNextSessionController,
  saveMeetingLink,
} from "./session.controller";

import {
  protect,
  authorizeRoles,
} from "../../auth/auth.middleware";

const router = Router();

router.post(

  "/book",

  protect,

  authorizeRoles("STUDENT"),

  bookSession

);

router.get(

  "/student",

  protect,

  authorizeRoles("STUDENT"),

  getMySessions

);

router.get(

  "/mentor",

  protect,

  authorizeRoles("MENTOR"),

  getMentorUpcomingSessions

);

router.patch(

  "/:sessionId/complete",

  protect,

  authorizeRoles(
    "MENTOR"
  ),

  completeMentorshipSession

);

router.patch(

  "/:sessionId/cancel",

  protect,

  authorizeRoles("STUDENT"),

  cancelBookedSession

);

router.patch(

  "/:sessionId/meeting-link",

  protect,

  authorizeRoles(
    "MENTOR"
  ),

  saveMeetingLink

);
router.get(
  "/next",
  protect,
  getNextSessionController
);



export default router;