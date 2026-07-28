import {
  Request,
  Response,
} from "express";

import prisma from "../../../config/prisma";

import { asyncHandler }
from "../../../utils/asyncHandler";

import { Resend } from "resend";




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

        const mentor = await prisma.mentor.findUnique({
  where: {
    id: mentorId,
  },
  include: {
    user: true,
  },
});

const resend = new Resend(
  process.env.RESEND_API_KEY
);

try {
  // ==========================================
  // EMAIL TO STUDENT
  // ==========================================

  await resend.emails.send({
    from: `MentorSala <${process.env.EMAIL_FROM}>`,
    to: student.email,
    subject: "Your Mentorship Session is Confirmed 🎉",
    html: `
      <h2>Session Confirmed</h2>

      <p>Hi ${student.name},</p>

      <p>Your mentorship session has been successfully booked.</p>

      <table>
        <tr>
          <td><strong>Mentor</strong></td>
          <td>${mentor?.user?.name}</td>
        </tr>

        <tr>
          <td><strong>Date & Time</strong></td>
          <td>${new Date(session.scheduledAt).toLocaleString()}</td>
        </tr>

        <tr>
          <td><strong>Duration</strong></td>
          <td>${session.duration} Minutes</td>
        </tr>
      </table>

      <p>Please join the session on time.</p>

      <br />

      <p>Regards,<br />MentorSala Team</p>
    `,
  });

  // ==========================================
  // EMAIL TO MENTOR
  // ==========================================

  await resend.emails.send({
    from: `MentorSala <${process.env.EMAIL_FROM}>`,
    to: mentor?.user?.email ?? "",
    subject: "New Mentorship Session Booked",
    html: `
      <h2>New Session Booked</h2>

      <p>Hi ${mentor?.user?.name},</p>

      <p>A student has booked a mentorship session with you.
      Kindly Update the Meeting Link from your Side.
      </p>

      <table>
        <tr>
          <td><strong>Student</strong></td>
          <td>${student.name}</td>
        </tr>

        <tr>
          <td><strong>Email</strong></td>
          <td>${student.email}</td>
        </tr>

        <tr>
          <td><strong>Date & Time</strong></td>
          <td>${new Date(session.scheduledAt).toLocaleString()}</td>
        </tr>

        <tr>
          <td><strong>Duration</strong></td>
          <td>${session.duration} Minutes</td>
        </tr>
      </table>

      <p>Please be available a few minutes before the session starts.</p>

      <br />

      <p>Regards,<br />MentorSala Team</p>
    `,
  });
} catch (error) {
  console.error("Failed to send booking emails:", error);
}



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

  