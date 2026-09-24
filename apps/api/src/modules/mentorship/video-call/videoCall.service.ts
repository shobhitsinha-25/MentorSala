import prisma from "../../../config/prisma";

import type {
  VideoCallJoinResult,
} from "./videoCall.types";

// ======================================================
// VIDEO CALL CONFIGURATION
// ======================================================

// Student and mentor can join 5 minutes before
// the scheduled session time.
const JOIN_EARLY_MINUTES = 5;

// ======================================================
// AUTHORIZE VIDEO CALL JOIN
// ======================================================

export const authorizeVideoCallJoin =
  async (
    sessionId: string,
    userId: string
  ): Promise<VideoCallJoinResult> => {

    // ==================================================
    // CURRENT TIME
    // ==================================================

    const now = new Date();

    // ==================================================
    // FIND SESSION
    // ==================================================

    const session =
      await prisma.mentorshipSession.findUnique({

        where: {
          id: sessionId,
        },

        include: {

          mentor: {

            select: {
              id: true,
              userId: true,
            },

          },

          student: {

            select: {
              id: true,
            },

          },

        },

      });

    // ==================================================
    // SESSION NOT FOUND
    // ==================================================

    if (!session) {

      throw new Error(
        "Session not found."
      );

    }

    // ==================================================
    // SESSION STATUS
    // ==================================================

    if (
      session.status ===
      "CANCELLED"
    ) {

      throw new Error(
        "This mentorship session has been cancelled."
      );

    }

    if (
      session.status ===
      "COMPLETED"
    ) {

      throw new Error(
        "This mentorship session has already been completed."
      );

    }

    // ==================================================
    // IDENTIFY PARTICIPANT
    // ==================================================

    const isStudent =
      session.studentId === userId;

    const isMentor =
      session.mentor.userId === userId;

    // ==================================================
    // USER NOT PART OF SESSION
    // ==================================================

    if (
      !isStudent &&
      !isMentor
    ) {

      throw new Error(
        "You are not authorized to join this mentorship session."
      );

    }

    // ==================================================
    // STUDENT SUBSCRIPTION CHECK
    // ==================================================

    // Only the student needs an active subscription/trial.
    // The mentor is completely free and does not need
    // a UserSubscription.

    if (isStudent) {

      const activeSubscription =
        await prisma.userSubscription.findFirst({

          where: {

            userId,

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

    }

    // ==================================================
    // SESSION TIME
    // ==================================================

    const scheduledAt =
      session.scheduledAt;

    // ==================================================
    // JOIN START TIME
    // ==================================================

    const joinStart =
      new Date(
        scheduledAt.getTime() -
        JOIN_EARLY_MINUTES *
        60 *
        1000
      );

    // ==================================================
    // SESSION END TIME
    // ==================================================

    const sessionEnd =
      new Date(
        scheduledAt.getTime() +
        session.duration *
        60 *
        1000
      );

    // ==================================================
    // TOO EARLY
    // ==================================================

    if (
      now < joinStart
    ) {

      throw new Error(
        "The mentorship session has not started yet."
      );

    }

    // ==================================================
    // SESSION ENDED
    // ==================================================

    if (
      now >= sessionEnd
    ) {

      throw new Error(
        "This mentorship session has ended."
      );

    }

    // ==================================================
    // REMAINING TIME
    // ==================================================

    const remainingSeconds =
      Math.max(
        0,
        Math.floor(
          (
            sessionEnd.getTime() -
            now.getTime()
          ) / 1000
        )
      );

    // ==================================================
    // PARTICIPANT ROLE
    // ==================================================

    const role =
      isStudent
        ? "STUDENT"
        : "MENTOR";

    // ==================================================
    // RETURN AUTHORIZATION RESULT
    // ==================================================

    return {

      sessionId:
        session.id,

      userId,

      role,

      scheduledAt:
        session.scheduledAt,

      duration:
        session.duration,

      remainingSeconds,

    };

  };