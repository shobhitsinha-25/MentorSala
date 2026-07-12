import prisma from "../../config/prisma";



interface CreateChapterInput {

  title: string;

  description?: string;

  subjectId: string;

  order: number;

  userId: string;

}



  

// ======================================================
// GET ALL APPROVED MENTORS
// ======================================================

export const getMentors = async (
  userId: string
) => {

  const student =
  await prisma.user.findUnique({

    where: {
      id: userId,
    },

    select: {
      targetExam: true,
    },

  });

if (!student?.targetExam) {

  throw new Error(
    "Student has not selected a target exam."
  );

}

  const mentors =
  await prisma.mentor.findMany({

    where: {

      isVerified: true,

      status: "APPROVED",

      isDeleted: false,

      examType: student.targetExam,

    },

    include: {

      user: {

        select: {

          id: true,

          name: true,

          avatar: true,

          email: true,

        },

      },

    },

    orderBy: {

      rating: "desc",

    },

  });

  return mentors;

};


// ======================================================
// GET ALL MENTORS (ADMIN)
// ======================================================

export const getAllMentorsForAdmin = async () => {
  const mentors = await prisma.mentor.findMany({
    where: {
      isDeleted: false,
    },

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

    orderBy: {
      createdAt: "desc",
    },
  });

  return mentors;
};

// ======================================================
// GET SINGLE MENTOR
// ======================================================

export const getMentorById = async (
  mentorId: string
) => {

  const mentor =
    await prisma.mentor.findUnique({

      where: {

        id: mentorId,

      },

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

    });

  if (!mentor) {

    throw new Error(
      "Mentor not found"
    );

  }

  return mentor;

};