import prisma from "../../config/prisma";

// ======================================================
// TYPES
// ======================================================

interface LeaderboardStudent {
  rank: number;
  id: string;
  name: string;
  avatar: string | null;
  xp: number;
  level: string;
}

interface LeaderboardResult {
  leaderboard: LeaderboardStudent[];
  currentUser: LeaderboardStudent;
}


// ======================================================
// GET STUDENT LEADERBOARD
// ======================================================
// Dashboard:
// - Top 5 students
// - Logged-in student's global rank
// ======================================================

export const getStudentLeaderboard = async (
  userId: string
): Promise<LeaderboardResult> => {

  // ====================================================
  // GET CURRENT USER
  // ====================================================

  const currentUser =
    await prisma.user.findFirst({

      where: {
        id: userId,
        role: "STUDENT",
        isDeleted: false,
      },

      select: {
        id: true,
        name: true,
        avatar: true,
        xp: true,
        level: true,
      },

    });


  // ====================================================
  // USER NOT FOUND
  // ====================================================

  if (!currentUser) {

    throw new Error(
      "Student account not found."
    );

  }


  // ====================================================
  // GET TOP 5 STUDENTS
  // ====================================================

  const topStudents =
    await prisma.user.findMany({

      where: {
        role: "STUDENT",
        isDeleted: false,
      },

      select: {
        id: true,
        name: true,
        avatar: true,
        xp: true,
        level: true,
      },

      orderBy: [
        {
          xp: "desc",
        },
        {
          createdAt: "asc",
        },
      ],

      take: 5,

    });


  // ====================================================
  // CALCULATE CURRENT USER GLOBAL RANK
  // ====================================================
  //
  // Only count students with strictly greater XP.
  //
  // We do NOT fetch all students.
  //
  // Example:
  // 46 students have more XP
  // Current student's rank = 47
  //
  // ====================================================

  const studentsAhead =
    await prisma.user.count({

      where: {

        role: "STUDENT",

        isDeleted: false,

        xp: {
          gt: currentUser.xp,
        },

      },

    });


  const currentUserRank =
    studentsAhead + 1;


  // ====================================================
  // FORMAT TOP STUDENTS
  // ====================================================

  const leaderboard =
    topStudents.map(
      (student, index) => {

        return {

          rank:
            index + 1,

          id:
            student.id,

          name:
            student.name,

          avatar:
            student.avatar,

          xp:
            student.xp,

          level:
            student.level,

        };

      }
    );


  // ====================================================
  // FORMAT CURRENT USER
  // ====================================================

  const formattedCurrentUser = {

    rank:
      currentUserRank,

    id:
      currentUser.id,

    name:
      currentUser.name,

    avatar:
      currentUser.avatar,

    xp:
      currentUser.xp,

    level:
      currentUser.level,

  };


  // ====================================================
  // RESPONSE
  // ====================================================

  return {

    leaderboard,

    currentUser:
      formattedCurrentUser,

  };

};


// ======================================================
// GET TOP 100 STUDENT LEADERBOARD
// ======================================================
// Dedicated leaderboard page:
// - Only fetches top 100 students
// - Does NOT fetch every student
// - Still returns logged-in student's global rank
// ======================================================

export const getTop100StudentLeaderboard = async (
  userId: string
): Promise<LeaderboardResult> => {

  // ====================================================
  // GET CURRENT USER
  // ====================================================

  const currentUser =
    await prisma.user.findFirst({

      where: {

        id: userId,

        role: "STUDENT",

        isDeleted: false,

      },

      select: {

        id: true,

        name: true,

        avatar: true,

        xp: true,

        level: true,

      },

    });


  // ====================================================
  // USER NOT FOUND
  // ====================================================

  if (!currentUser) {

    throw new Error(
      "Student account not found."
    );

  }


  // ====================================================
  // GET TOP 100 STUDENTS ONLY
  // ====================================================

  const topStudents =
    await prisma.user.findMany({

      where: {

        role: "STUDENT",

        isDeleted: false,

      },

      select: {

        id: true,

        name: true,

        avatar: true,

        xp: true,

        level: true,

      },

      orderBy: [

        {
          xp: "desc",
        },

        {
          createdAt: "asc",
        },

      ],

      take: 100,

    });


  // ====================================================
  // CALCULATE CURRENT USER GLOBAL RANK
  // ====================================================

  const studentsAhead =
    await prisma.user.count({

      where: {

        role: "STUDENT",

        isDeleted: false,

        xp: {
          gt: currentUser.xp,
        },

      },

    });


  const currentUserRank =
    studentsAhead + 1;


  // ====================================================
  // FORMAT TOP 100
  // ====================================================

  const leaderboard =
    topStudents.map(
      (student, index) => {

        return {

          rank:
            index + 1,

          id:
            student.id,

          name:
            student.name,

          avatar:
            student.avatar,

          xp:
            student.xp,

          level:
            student.level,

        };

      }
    );


  // ====================================================
  // FORMAT CURRENT USER
  // ====================================================

  const formattedCurrentUser = {

    rank:
      currentUserRank,

    id:
      currentUser.id,

    name:
      currentUser.name,

    avatar:
      currentUser.avatar,

    xp:
      currentUser.xp,

    level:
      currentUser.level,

  };


  // ====================================================
  // RESPONSE
  // ====================================================

  return {

    leaderboard,

    currentUser:
      formattedCurrentUser,

  };

};