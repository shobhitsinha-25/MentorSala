import prisma from "../../config/prisma";

export const createLecture = async (
  courseId: string,
  data: {
    title: string;
    description?: string;
    videoUrl: string;
    order: number;
    duration?: number;
  }
) => {
  const course =
    await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

  if (!course) {
    throw new Error("Course not found");
  }

  const lecture =
    await prisma.lecture.create({
      data: {
        ...data,
        courseId,
      },
    });

  return lecture;
};

export const getCourseLectures =
  async (
    courseId: string,
    userId: string
  ) => {
    const lectures =
      await prisma.lecture.findMany({
        where: {
          courseId,
        },

        orderBy: {
          order: "asc",
        },

        include: {
          progresses: {
            where: {
              userId,
            },

            select: {
              completed: true,
              watchedSeconds: true,
            },
          },
        },
      });

    return lectures;
  };

  export const markLectureComplete =
  async (
    lectureId: string,
    userId: string
  ) => {
    const lecture =
      await prisma.lecture.findUnique({
        where: {
          id: lectureId,
        },
      });

    if (!lecture) {
      throw new Error(
        "Lecture not found"
      );
    }

    await prisma.lectureProgress.upsert({
      where: {
        userId_lectureId: {
          userId,
          lectureId,
        },
      },

      update: {
        completed: true,
        completedAt: new Date(),
      },

      create: {
        userId,
        lectureId,
        completed: true,
        completedAt: new Date(),
      },
    });

    // total lectures
    const totalLectures =
      await prisma.lecture.count({
        where: {
          courseId: lecture.courseId,
        },
      });

    // completed lectures
    const completedLectures =
      await prisma.lectureProgress.count({
        where: {
          userId,
          completed: true,

          lecture: {
            courseId:
              lecture.courseId,
          },
        },
      });

    const progressPercentage =
      Math.floor(
        (completedLectures /
          totalLectures) *
          100
      );

    await prisma.enrollment.updateMany({
      where: {
        userId,
        courseId: lecture.courseId,
      },

      data: {
        completedLessons:
          completedLectures,

        progressPercentage,
      },
    });

    return {
      success: true,
    };
  };

export const getContinueLearning =
  async (userId: string) => {
    const latestProgress =
      await prisma.lectureProgress.findFirst({
        where: {
          userId,
        },

        orderBy: {
          updatedAt: "desc",
        },

        include: {
          lecture: {
            include: {
              course: true,
            },
          },
        },
      });

    return latestProgress;
  };
