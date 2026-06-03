import prisma from "../../config/prisma";

export const getAssignedSubjectsService =
  async (
    userId: string
  ) => {

    // Find mentor profile
    const mentor =
      await prisma.mentor.findUnique({

        where: {
          userId,
        },

      });

    if (!mentor) {

      throw new Error(
        "Mentor profile not found"
      );

    }

    // Get assigned subjects
    const subjects =
      await prisma.subjectMentor.findMany({

        where: {

          mentorId:
            mentor.id,

        },

        include: {

          subject: {

            include: {

              course: true,

            },

          },

        },

      });

    return subjects;

  };

interface CreateChapterInput {

  title: string;

  description?: string;

  subjectId: string;

  order: number;

  userId: string;

}

export const createChapterService =
  async (
    data: CreateChapterInput
  ) => {

    // ==========================================
    // FIND MENTOR
    // ==========================================

    const mentor =
      await prisma.mentor.findUnique({

        where: {
          userId:
            data.userId,
        },

      });

    if (!mentor) {

      throw new Error(
        "Mentor not found"
      );

    }

    // ==========================================
    // VERIFY SUBJECT ASSIGNMENT
    // ==========================================

    const assignment =
      await prisma.subjectMentor.findFirst({

        where: {

          mentorId:
            mentor.id,

          subjectId:
            data.subjectId,

        },

      });

    if (!assignment) {

      throw new Error(
        "You are not assigned to this subject"
      );

    }

    // ==========================================
    // CREATE CHAPTER
    // ==========================================

    const chapter =
      await prisma.chapter.create({

        data: {

          title:
            data.title,

          description:
            data.description,

          subjectId:
            data.subjectId,

          order:
            data.order,

          published:
            true,

        },

      });

    return chapter;

  };

  

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