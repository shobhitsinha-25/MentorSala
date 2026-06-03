import prisma from "../../config/prisma";

import { levelBenefits }
from "../../utils/levelBenefits";
import {
  ExamType,
} from "@prisma/client";

// ======================================================
// GET USER PROFILE
// ======================================================

  export const getUserProfile = async (

    userId: string

  ) => {

    const user =
      await prisma.user.findUnique({

        where: {

          id: userId,

        },

        select: {

          id: true,

          name: true,

          email: true,

          role: true,

          avatar: true,

          targetExam: true,

          xp: true,

          streak: true,

          level: true,

          onboardingCompleted: true,

          createdAt: true,

          mentorProfile: true,

        },

      });

    // ====================================================
    // USER NOT FOUND
    // ====================================================

    if (!user) {

      throw new Error(
        "User not found"
      );

    }

    return user;

  };

// ======================================================
// UPDATE USER PROFILE
// ======================================================

export const updateUserProfile = async (

  userId: string,

  data: {

    name?: string;

    avatar?: string;

    targetExam?: ExamType;

    onboardingCompleted?: boolean;

  }

) => {

  const updatedUser =
    await prisma.user.update({

      where: {

        id: userId,

      },

      data,

      select: {

        id: true,

        name: true,

        email: true,

        role: true,

        avatar: true,

        targetExam: true,

        xp: true,

        streak: true,

        level: true,

        onboardingCompleted: true,

        mentorProfile: true,

      },

    });

  return updatedUser;

};

// ======================================================
// GET DASHBOARD STATS
// ======================================================

export const getDashboardStats = async (

  userId: string

) => {

  // ====================================================
  // TOTAL SESSIONS
  // ====================================================

  const totalSessions =
    await prisma.mentorshipSession.count({

      where: {

        studentId:
          userId,

      },

    });

  // ====================================================
  // COMPLETED SESSIONS
  // ====================================================

  const completedSessions =
    await prisma.mentorshipSession.count({

      where: {

        studentId:
          userId,

        status:
          "COMPLETED",

      },

    });

  // ====================================================
  // UPCOMING SESSIONS
  // ====================================================

  const upcomingSessions =
    await prisma.mentorshipSession.count({

      where: {

        studentId:
          userId,

        status:
          "SCHEDULED",

      },

    });

  // ====================================================
  // USER GAMIFICATION
  // ====================================================

  const user =
    await prisma.user.findUnique({

      where: {

        id: userId,

      },

      select: {

        xp: true,

        streak: true,

        level: true,

      },

    });

  // ====================================================
  // RETURN
  // ====================================================

  return {

    totalSessions,

    completedSessions,

    upcomingSessions,

    xp:
      user?.xp || 0,

    streak:
      user?.streak || 0,

    level:
      user?.level || "Rookie",

    levelBenefit:

      levelBenefits[

        (
          user?.level ||

          "Rookie"

        ) as keyof typeof levelBenefits

      ],

  };

};

// ======================================================
// GET LEADERBOARD
// ======================================================

export const getLeaderboard = async () => {

  const users =
    await prisma.user.findMany({

      where: {

        role:
          "STUDENT",

      },

      select: {

        id: true,

        name: true,

        avatar: true,

        xp: true,

        streak: true,

        level: true,

        targetExam: true,

      },

      orderBy: {

        xp: "desc",

      },

      take: 10,

    });

  return users;

};

// ======================================================
// GET USER ACTIVITY
// ======================================================

export const getUserActivity = async (

  userId: string

) => {

  const activities =
    await prisma.mentorshipSession.findMany({

      where: {

        studentId:
          userId,

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

      orderBy: {

        scheduledAt:
          "desc",

      },

      take: 10,

    });

  return activities;

};

export const getStudents = async () => {
  return prisma.user.findMany({
    where: {
      role: "STUDENT",
      isDeleted: false,
    },

    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,

      targetExam: true,
      currentClass: true,
      targetYear: true,

      xp: true,
      streak: true,
      level: true,

      onboardingCompleted: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};