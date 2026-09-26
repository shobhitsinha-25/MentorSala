import prisma from "../../../config/prisma";

import dayjs from "../../../lib/dayjs";

import {
  consumeMentorshipSession,
} from "../../user/subscription/entitlement/entitlement.service";

// ======================================================
// BOOK SESSION
// ======================================================

export const bookMentorshipSession = async (
  studentId: string,
  mentorId: string,
  scheduledAt: string
) => {
  // ==================================================
  // CONVERT TO DATE
  // ==================================================

  const parsedDate = dayjs(scheduledAt);

  if (!parsedDate.isValid()) {
    throw new Error("Invalid scheduled time.");
  }

  const sessionDate = parsedDate.toDate();

  // ==================================================
  // CHECK MENTOR EXISTS
  // ==================================================

  const mentor = await prisma.mentor.findUnique({
    where: {
      id: mentorId,
    },
  });

  if (!mentor) {
    throw new Error("Mentor not found");
  }

  // ==================================================
  // TRANSACTION
  // ==================================================

  const session = await prisma.$transaction(
    async (tx) => {
      // ==================================================
      // CHECK EXISTING SESSION
      // ==================================================

      const existingSession =
        await tx.mentorshipSession.findUnique({
          where: {
            mentorId_scheduledAt: {
              mentorId,
              scheduledAt: sessionDate,
            },
          },
        });

      // ==================================================
      // SLOT ALREADY TAKEN
      // ==================================================

      if (
        existingSession &&
        existingSession.status !== "CANCELLED"
      ) {
        throw new Error("Slot already booked");
      }

      // ==================================================
      // CONSUME MENTORSHIP ENTITLEMENT
      // ==================================================
      //
      // IMPORTANT:
      // Quota is consumed during booking.
      // This prevents a student with 0 remaining
      // sessions from booking a slot.
      //

      const entitlement =
        await consumeMentorshipSession(
          tx,
          studentId
        );

      // ==================================================
      // ENTITLEMENT DENIED
      // ==================================================

      if (!entitlement.allowed) {
        throw new Error(
          entitlement.reason ??
            "You are not eligible to book a mentorship session."
        );
      }

      // ==================================================
      // IF SESSION EXISTS AND IS CANCELLED
      // REUSE THE SLOT
      // ==================================================

      if (
        existingSession &&
        existingSession.status === "CANCELLED"
      ) {
        return tx.mentorshipSession.update({
          where: {
            id: existingSession.id,
          },

          data: {
            studentId,

            status: "SCHEDULED",

            cancellationReason: null,

            studentFeedback: null,
          },
        });
      }

      // ==================================================
      // CREATE NEW SESSION
      // ==================================================

      return tx.mentorshipSession.create({
        data: {
          mentorId,

          studentId,

          scheduledAt: sessionDate,

          duration: 30,

          status: "SCHEDULED",
        },
      });
    },

    // ==================================================
    // INTERACTIVE TRANSACTION OPTIONS
    // ==================================================

    {
      maxWait: 10000,
      timeout: 15000,
    }
  );

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

          review: true,
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

export const cancelSession = async (
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
    throw new Error("Session not found");
  }

  // ==================================================
  // ONLY STUDENT CAN CANCEL OWN SESSION
  // ==================================================

  if (session.studentId !== userId) {
    throw new Error("Unauthorized");
  }

  // ==================================================
  // CHECK SESSION STATUS
  // ==================================================

  if (session.status === "CANCELLED") {
    throw new Error("Session already cancelled");
  }

  // ==================================================
  // CHECK 8 HOUR RULE
  // ==================================================

  const now = dayjs();

  const sessionTime = dayjs(
    session.scheduledAt
  );

  const hoursDifference =
    sessionTime.diff(
      now,
      "hour"
    );

  // ==================================================
  // CANNOT CANCEL WITHIN 8 HOURS
  // ==================================================

  if (hoursDifference < 8) {
    throw new Error(
      "Session can only be cancelled at least 8 hours before scheduled time"
    );
  }

  // ==================================================
  // CANCEL SESSION + RELEASE QUOTA
  // ==================================================

  const cancelledSession =
    await prisma.$transaction(
      async (tx) => {

        // ==================================================
        // FIND ACTIVE SUBSCRIPTION
        // ==================================================

        const activeSubscription =
          await tx.userSubscription.findFirst({
            where: {
              userId,

              status: "ACTIVE",

              startsAt: {
                lte: now.toDate(),
              },

              expiresAt: {
                gt: now.toDate(),
              },
            },

            orderBy: [
              {
                isTrial: "asc",
              },
              {
                expiresAt: "desc",
              },
            ],
          });

        // ==================================================
        // RELEASE MENTORSHIP USAGE
        // ==================================================

        if (activeSubscription) {

          // ==================================================
          // DETERMINE USAGE PERIOD
          // ==================================================

          let periodStart: Date;
          let periodEnd: Date;

          // ==================================================
          // TRIAL PERIOD
          // ==================================================

          if (activeSubscription.isTrial) {

            periodStart =
              activeSubscription.startsAt;

            periodEnd =
              activeSubscription.expiresAt;

          }

          // ==================================================
          // PAID SUBSCRIPTION
          // ==================================================

          else {

            periodStart =
              dayjs(now.toDate())
                .startOf("month")
                .toDate();

            periodEnd =
              dayjs(now.toDate())
                .endOf("month")
                .toDate();

          }

          // ==================================================
          // FIND EXISTING USAGE
          // ==================================================

          const usage =
            await tx.subscriptionUsage.findUnique({
              where: {
                subscriptionId_resource_variant_periodStart:
                  {
                    subscriptionId:
                      activeSubscription.id,

                    resource:
                      "MENTORSHIP_SESSION",

                    variant:
                      "DEFAULT",

                    periodStart,
                  },
              },
            });

          // ==================================================
          // RELEASE 1 RESERVED SESSION
          // ==================================================

          if (
            usage &&
            usage.used > 0
          ) {

            await tx.subscriptionUsage.update({
              where: {
                id: usage.id,
              },

              data: {
                used: {
                  decrement: 1,
                },
              },
            });

          }
        }

        // ==================================================
        // CANCEL SESSION
        // ==================================================

        const updatedSession =
          await tx.mentorshipSession.update({
            where: {
              id: sessionId,
            },

            data: {
              status: "CANCELLED",
            },
          });

        // ==================================================
        // RETURN
        // ==================================================

        return updatedSession;
      }
    );

  // ==================================================
  // RETURN CANCELLED SESSION
  // ==================================================

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

    // ============================================================
    // FIND MENTOR
    // ============================================================

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

    // ============================================================
    // FIND SESSION
    // ============================================================

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

    // ============================================================
    // VERIFY MENTOR OWNERSHIP
    // ============================================================

    if (
      session.mentorId !==
      mentor.id
    ) {

      throw new Error(
        "You can only complete your own sessions"
      );

    }

    // ============================================================
    // CHECK CANCELLED
    // ============================================================

    if (
      session.status ===
      "CANCELLED"
    ) {

      throw new Error(
        "Cancelled sessions cannot be completed"
      );

    }

    // ============================================================
    // CHECK ALREADY COMPLETED
    // ============================================================

    if (
      session.status ===
      "COMPLETED"
    ) {

      throw new Error(
        "Session already completed"
      );

    }

    // ============================================================
    // CALCULATE SESSION END TIME
    // ============================================================
    //
    // Example:
    //
    // scheduledAt = 5:00 PM
    // duration    = 30 minutes
    //
    // sessionEndTime = 5:30 PM
    //
    // The mentor cannot mark the session completed
    // before 5:30 PM.
    //

    const sessionStartTime =
      new Date(
        session.scheduledAt
      ).getTime();

    const sessionDuration =
      session.duration *
      60 *
      1000;

    const sessionEndTime =
      sessionStartTime +
      sessionDuration;

    // ============================================================
    // CHECK WHETHER SESSION HAS ENDED
    // ============================================================

    if (
      Date.now() <
      sessionEndTime
    ) {

      throw new Error(
        "Session has not ended yet"
      );

    }

    // ============================================================
    // MARK SESSION AS COMPLETED
    // ============================================================

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


const JOIN_EARLY_MINUTES = 5;

export const getStudentSessionJoinInfo = async (
  sessionId: string,
  studentId: string
) => {
  const now = new Date();

  const session =
    await prisma.mentorshipSession.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        mentor: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

  if (!session) {
    throw new Error(
      "Mentorship session not found."
    );
  }

  // ==========================================
  // STUDENT OWNERSHIP
  // ==========================================

  if (session.studentId !== studentId) {
    throw new Error(
      "You are not authorized to join this session."
    );
  }

  // ==========================================
  // SESSION STATUS
  // ==========================================

  if (session.status === "CANCELLED") {
    throw new Error(
      "This mentorship session has been cancelled."
    );
  }

  if (session.status === "COMPLETED") {
    throw new Error(
      "This mentorship session has already been completed."
    );
  }

  // ==========================================
  // ACTIVE SUBSCRIPTION / TRIAL
  // ==========================================

  const activeSubscription =
    await prisma.userSubscription.findFirst({
      where: {
        userId: studentId,
        status: "ACTIVE",
        startsAt: {
          lte: now,
        },
        expiresAt: {
          gt: now,
        },
      },
      orderBy: [
        {
          isTrial: "asc",
        },
        {
          expiresAt: "desc",
        },
      ],
    });

  if (!activeSubscription) {
    throw new Error(
      "Your subscription or trial has expired."
    );
  }

  // ==========================================
  // JOIN WINDOW
  // ==========================================

  const joinStart = new Date(
    session.scheduledAt.getTime() -
      JOIN_EARLY_MINUTES * 60 * 1000
  );

  const sessionEnd = new Date(
    session.scheduledAt.getTime() +
      session.duration * 60 * 1000
  );

  // ==========================================
  // TOO EARLY
  // ==========================================

  if (now < joinStart) {
    return {
      sessionId: session.id,
      scheduledAt: session.scheduledAt,
      duration: session.duration,
      status: session.status,
      canJoin: false,
      joinStart,
      sessionEnd,
      mentor: {
        id: session.mentor.user.id,
        name: session.mentor.user.name,
        avatar: session.mentor.user.avatar,
      },
      message:
        "The mentorship session has not started yet.",
    };
  }

  // ==========================================
  // SESSION ENDED
  // ==========================================

  if (now >= sessionEnd) {
    return {
      sessionId: session.id,
      scheduledAt: session.scheduledAt,
      duration: session.duration,
      status: session.status,
      canJoin: false,
      joinStart,
      sessionEnd,
      mentor: {
        id: session.mentor.user.id,
        name: session.mentor.user.name,
        avatar: session.mentor.user.avatar,
      },
      message:
        "The mentorship session has ended.",
    };
  }

  // ==========================================
  // CAN JOIN
  // ==========================================

  return {
    sessionId: session.id,
    scheduledAt: session.scheduledAt,
    duration: session.duration,
    status: session.status,
    canJoin: true,
    joinStart,
    sessionEnd,
    mentor: {
      id: session.mentor.user.id,
      name: session.mentor.user.name,
      avatar: session.mentor.user.avatar,
    },
    message:
      "You can join the mentorship session.",
  };
};
