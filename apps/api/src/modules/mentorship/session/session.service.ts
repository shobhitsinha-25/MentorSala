import prisma from "../../../config/prisma";

import dayjs from "../../../lib/dayjs";

// ======================================================
// BOOK SESSION
// ======================================================

export const bookMentorshipSession =
  async (

    studentId: string,

    mentorId: string,

    scheduledAt: string

  ) => {

    // ==================================================
    // CONVERT TO DATE
    // ==================================================

    const sessionDate =
      dayjs(scheduledAt).toDate();

    // ==================================================
    // CHECK MENTOR EXISTS
    // ==================================================

    const mentor =
      await prisma.mentor.findUnique({

        where: {
          id: mentorId,
        },

      });

    if (!mentor) {

      throw new Error(
        "Mentor not found"
      );

    }

    // ==================================================
    // CHECK EXISTING SESSION
    // ==================================================

    const existingSession =
      await prisma.mentorshipSession.findUnique({

        where: {

          mentorId_scheduledAt: {

            mentorId,

            scheduledAt:
              sessionDate,

          },

        },

      });

    // ==================================================
    // IF SESSION EXISTS AND IS CANCELLED
    // REUSE THE SLOT
    // ==================================================

    if (
      existingSession &&
      existingSession.status ===
        "CANCELLED"
    ) {

      const reopenedSession =
        await prisma.mentorshipSession.update({

          where: {

            id:
              existingSession.id,

          },

          data: {

            studentId,

            status:
              "SCHEDULED",

            cancellationReason:
              null,

            studentFeedback:
              null,

          },

        });

      return reopenedSession;

    }

    // ==================================================
    // SLOT ALREADY TAKEN
    // ==================================================

    if (
      existingSession
    ) {

      throw new Error(
        "Slot already booked"
      );

    }

    // ==================================================
    // CREATE NEW SESSION
    // ==================================================

    const session =
      await prisma.mentorshipSession.create({

        data: {

          mentorId,

          studentId,

          scheduledAt:
            sessionDate,

          duration: 30,

          status:
            "SCHEDULED",

        },

      });

    // ==================================================
    // RETURN
    // ==================================================

    return session;

  };
// ======================================================
// GET STUDENT SESSIONS
// ======================================================

export const getStudentSessions =
  async (
    studentId: string
  ) => {

    await prisma.mentorshipSession.updateMany({

      where: {

        studentId,

        status: "SCHEDULED",

        scheduledAt: {

          lt: new Date(),

        },

      },

      data: {

        status: "CANCELLED",

      },

    });

    const sessions =
      await prisma.mentorshipSession.findMany({

        where: {

          studentId,

        },

        include: {

          mentor: {

            include: {

              user: {

                select: {

                  id: true,

                  name: true,

                  email: true,

                  avatar: true,

                },

              },

            },

          },

        },

        orderBy: {

          scheduledAt: "asc",

        },

      });

    return sessions;

  };

// ======================================================
// GET MENTOR SESSIONS
// ======================================================

export const getMentorSessions =
  async (

    mentorUserId: string

  ) => {

    // ==================================================
    // FIND MENTOR PROFILE
    // ==================================================

    const mentor =
      await prisma.mentor.findUnique({

        where: {

          userId:
            mentorUserId,

        },

      });

    // ==================================================
    // MENTOR NOT FOUND
    // ==================================================

    if (!mentor) {

      throw new Error(
        "Mentor not found"
      );

    }

    // ==================================================
    // GET SESSIONS
    // ==================================================

    const sessions =
      await prisma.mentorshipSession.findMany({

        where: {

          mentorId:
            mentor.id,

        },

        include: {

          student: {

            select: {

              id: true,

              name: true,

              email: true,

              avatar: true,

            },

          },

        },

        orderBy: {

          scheduledAt: "asc",

        },

      });

    return sessions;

  };

// ======================================================
// CANCEL SESSION
// ======================================================

export const cancelSession =
  async (

    sessionId: string,

    userId: string

  ) => {

    // ==================================================
    // FIND SESSION
    // ==================================================

    const session =
      await prisma.mentorshipSession.findUnique({

        where: {

          id: sessionId,

        },

      });

    // ==================================================
    // SESSION NOT FOUND
    // ==================================================

    if (!session) {

      throw new Error(
        "Session not found"
      );

    }

    // ==================================================
    // ONLY STUDENT CAN CANCEL OWN SESSION
    // ==================================================

    if (
      session.studentId !==
      userId
    ) {

      throw new Error(
        "Unauthorized"
      );

    }

    // ==================================================
    // CHECK SESSION STATUS
    // ==================================================

    if (
      session.status ===
      "CANCELLED"
    ) {

      throw new Error(
        "Session already cancelled"
      );

    }

    // ==================================================
    // CHECK 8 HOUR RULE
    // ==================================================

    const now =
      dayjs();

    const sessionTime =
      dayjs(
        session.scheduledAt
      );

    const hoursDifference =
      sessionTime.diff(
        now,
        "hour"
      );

    // ==================================================
    // CANNOT CANCEL
    // ==================================================

    if (
      hoursDifference < 8
    ) {

      throw new Error(

        "Session can only be cancelled at least 8 hours before scheduled time"

      );

    }

    // ==================================================
    // CANCEL SESSION
    // ==================================================

    const cancelledSession =
      await prisma.mentorshipSession.update({

        where: {

          id: sessionId,

        },

        data: {

          status:
            "CANCELLED",

        },

      });

    return cancelledSession;

  };

  export const getNextSession =
  async (
    studentId: string
  ) => {

    const session =
      await prisma.mentorshipSession.findFirst({

        where: {

          studentId,

          status:
            "SCHEDULED",

          scheduledAt: {

            gte:
              new Date(),

          },

        },

        include: {

          mentor: {

            include: {

              user: true,

            },

          },

        },

        orderBy: {

          scheduledAt:
            "asc",

        },

      });

    return session;

  };

// ======================================================
// COMPLETE SESSION
// ======================================================

export const completeSession =
  async (
    sessionId: string,
    mentorUserId: string
  ) => {

    const mentor =
      await prisma.mentor.findUnique({

        where: {

          userId:
            mentorUserId,

        },

      });

    if (!mentor) {

      throw new Error(
        "Mentor not found"
      );

    }

    const session =
      await prisma.mentorshipSession.findUnique({

        where: {

          id: sessionId,

        },

      });

    if (!session) {

      throw new Error(
        "Session not found"
      );

    }

    if (
      session.mentorId !==
      mentor.id
    ) {

      throw new Error(
        "You can only complete your own sessions"
      );

    }

    if (
      session.status ===
      "CANCELLED"
    ) {

      throw new Error(
        "Cancelled sessions cannot be completed"
      );

    }

    if (
      session.status ===
      "COMPLETED"
    ) {

      throw new Error(
        "Session already completed"
      );

    }
    if (
  new Date() <
  session.scheduledAt
) {

  throw new Error(
    "Session has not started yet"
  );

}

    return prisma.mentorshipSession.update({

      where: {

        id: sessionId,

      },

      data: {

        status:
          "COMPLETED",

      },

    });

  };

export const updateMeetingLink =
  async (

    sessionId: string,

    mentorUserId: string,

    meetingLink: string

  ) => {

    const mentor =
      await prisma.mentor.findUnique({

        where: {

          userId:
            mentorUserId,

        },

      });

    if (!mentor) {

      throw new Error(
        "Mentor not found"
      );

    }

    const session =
      await prisma.mentorshipSession.findUnique({

        where: {

          id: sessionId,

        },

      });

    if (!session) {

      throw new Error(
        "Session not found"
      );

    }

    if (
      session.mentorId !==
      mentor.id
    ) {

      throw new Error(
        "Unauthorized"
      );

    }

    return prisma.mentorshipSession.update({

      where: {

        id: sessionId,

      },

      data: {

        meetingLink,

      },

    });

  };
