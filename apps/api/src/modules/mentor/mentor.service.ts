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

export const getMentors = async () => {

  const mentors =
    await prisma.mentor.findMany({

      where: {

        isVerified: true,

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