import prisma from "../../config/prisma";

import { CourseCategory } from "@prisma/client";

import { calculateLevel } from "../../utils/level";
import { calculateStreak } from "../../utils/streak";



export const createCourse = async (
  title: string,
  description: string,
  thumbnail: string | undefined,
  price: number,
  category: CourseCategory,
  level: string,
  duration: string,
  mentorId: string
) => {
  const course =
    await prisma.course.create({
      data: {
        title,
        description,
        thumbnail,
        price,
        category,
        level,
        duration,
        mentorId,
      },
    });

  return course;
};

export const getAllCourses =
  async (
    page = 1,
    limit = 10
  ) => {
    const skip =
      (page - 1) * limit;

    const courses =
      await prisma.course.findMany({
        skip,
        take: limit,

        include: {
          mentor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          _count: {
            select: {
              enrollments: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const totalCourses =
      await prisma.course.count();

    return {
      courses,

      pagination: {
        totalCourses,

        currentPage: page,

        totalPages:
          Math.ceil(
            totalCourses / limit
          ),

        limit,
      },
    };
  };

export const getSingleCourse =
  async (courseId: string) => {
    const course =
      await prisma.course.findUnique({
        where: {
          id: courseId,
        },

        include: {
          mentor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

    if (!course) {
      throw new Error(
        "Course not found"
      );
    }

    return course;
  };

  export const enrollInCourse =
  async (
    userId: string,
    courseId: string
  ) => {
    // check course exists
    const course =
      await prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });

    if (!course) {
      throw new Error(
        "Course not found"
      );
    }

    // check existing enrollment
    const existingEnrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

    if (existingEnrollment) {
      throw new Error(
        "Already enrolled"
      );
    }

    // create enrollment
    const enrollment =
      await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
      });

    return enrollment;
  };

  export const getMyCourses =
  async (userId: string) => {
    const enrollments =
      await prisma.enrollment.findMany({
        where: {
          userId,
        },

        include: {
          course: {
            include: {
              mentor: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },

        orderBy: {
          enrolledAt: "desc",
        },
      });

    return enrollments;
  };

 export const updateCourseProgress =
  async (
    userId: string,
    courseId: string,
    progressPercentage: number,
    completedLessons: number
  ) => {
    const enrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

    if (!enrollment) {
      throw new Error(
        "Enrollment not found"
      );
    }

    const updatedEnrollment =
      await prisma.enrollment.update({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },

        data: {
          progressPercentage,
          completedLessons,
        },
      });

    // calculate only NEW lessons XP
    const newLessonsCompleted =
      completedLessons -
      enrollment.completedLessons;

    const earnedXP =
      newLessonsCompleted > 0
        ? newLessonsCompleted * 10
        : 0;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (existingUser) {
  const updatedXP =
    existingUser.xp + earnedXP;

  const updatedLevel =
    calculateLevel(updatedXP);

  const updatedStreak =
    calculateStreak(
      existingUser.lastActiveAt,
      existingUser.streak
    );

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      xp: updatedXP,

      level: updatedLevel,

      streak: updatedStreak,

      lastActiveAt: new Date(),
    },
  });
}

    return updatedEnrollment;
  };

  export const searchCourses =
  async (
    keyword?: string,
    category?: string,
    level?: string
  ) => {
    const courses =
      await prisma.course.findMany({
        where: {
          AND: [
            keyword
              ? {
                  OR: [
                    {
                      title: {
                        contains:
                          keyword,
                        mode:
                          "insensitive",
                      },
                    },

                    {
                      description:
                        {
                          contains:
                            keyword,
                          mode:
                            "insensitive",
                        },
                    },
                  ],
                }
              : {},

            category
              ? {
                  category:
                    category as CourseCategory,
                }
              : {},

            level
              ? {
                  level,
                }
              : {},
          ],
        },

        include: {
          mentor: {
            select: {
              id: true,
              name: true,
            },
          },

          _count: {
            select: {
              enrollments: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return courses;
  };