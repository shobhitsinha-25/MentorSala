import {
  Request,
  Response,
} from "express";

import prisma from "../../../config/prisma";

import { asyncHandler }
from "../../../utils/asyncHandler";



import {
  bookMentorshipSession,
  cancelSession,
  completeSession,
  updateMeetingLink,
  getMentorSessions,
  getStudentSessions,
} from "./session.service";

import {
  getNextSession,
} from "./session.service";

export const bookSession =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ==========================================
      // AUTH CHECK
      // ==========================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ==========================================
      // GET USER
      // ==========================================

      const userId =
        req.user.userId;

      // ==========================================
      // FIND STUDENT
      // ==========================================

      const student =
        await prisma.user.findUnique({

          where: {
            id: userId,
          },

        });

      if (!student) {

        return res.status(404).json({

          success: false,

          message:
            "Student not found",

        });

      }

      // ==========================================
      // BODY
      // ==========================================

      const {
        mentorId,
        scheduledAt,
      } = req.body;

      // ==========================================
      // VALIDATION
      // ==========================================

      if (
        !mentorId ||
        !scheduledAt
      ) {

        return res.status(400).json({

          success: false,

          message:
            "mentorId and scheduledAt are required",

        });

      }

      // ==========================================
      // BOOK SESSION
      // ==========================================

      const session =
        await bookMentorshipSession(

          student.id,

          mentorId,

          scheduledAt

        );

      // ==========================================
      // RESPONSE
      // ==========================================

      return res.status(201).json({

        success: true,

        message:
          "Session booked successfully",

        session,

      });

    }

  );

// ======================================================
// GET STUDENT SESSIONS
// ======================================================

export const getMySessions =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      const sessions =
        await getStudentSessions(

          req.user.userId

        );

      return res.status(200).json({

        success: true,

        sessions,

      });

    }

  );

export const getMentorUpcomingSessions =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ==========================================
      // AUTH CHECK
      // ==========================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ==========================================
      // GET SESSIONS
      // ==========================================

      const sessions =
        await getMentorSessions(

          req.user.userId

        );

      // ==========================================
      // RESPONSE
      // ==========================================

      return res.status(200).json({

        success: true,

        sessions,

      });

    }

  );


  // ======================================================
// COMPLETE SESSION
// ======================================================

export const completeMentorshipSession =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      const sessionId =
  req.params.sessionId as string;

      const session =
        await completeSession(

          sessionId,

          req.user.userId

        );

      return res.status(200).json({

        success: true,

        message:
          "Session marked as completed",

        session,

      });

    }

  );
// ======================================================
// CANCEL SESSION
// ======================================================

export const cancelBookedSession =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ==========================================
      // AUTH CHECK
      // ==========================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // ==========================================
      // PARAMS
      // ==========================================

      const sessionId =
        req.params.sessionId as string;

      // ==========================================
      // CANCEL
      // ==========================================

      const session =
        await cancelSession(

          sessionId,

          req.user.userId

        );

      // ==========================================
      // RESPONSE
      // ==========================================

      return res.status(200).json({

        success: true,

        message:
          "Session cancelled successfully",

        session,

      });

    }

  );

export const getNextSessionController =
  asyncHandler(

    async (
       req: Request,
      res: Response
    ) => {

      if (!req.user) {

        return res.status(401).json({

          success: false,

        });

      }

      const session =
        await getNextSession(

          req.user.userId

        );

      return res.json({

        success: true,

        session,

      });

    }

  );

export const getMentorSessionsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      const mentor =
        await prisma.mentor.findUnique({

          where: {

            userId:
              req.user.userId,

          },

        });

      if (!mentor) {

        return res.status(404).json({

          success: false,

          message:
            "Mentor not found",

        });

      }

      const sessions =
        await getMentorSessions(

          mentor.id

        );

      return res.status(200).json({

        success: true,

        sessions,

      });

    }

  );

  export const saveMeetingLink =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      const sessionId =
        req.params.sessionId as string;

      const {
        meetingLink,
      } = req.body;

      const session =
        await updateMeetingLink(

          sessionId,

          req.user.userId,

          meetingLink

        );

      return res.status(200).json({

        success: true,

        session,

      });

    }

  );

  