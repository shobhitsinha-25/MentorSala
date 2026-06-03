import prisma from "../../config/prisma";

import {
  CourseCategory,
} from "@prisma/client";

interface CreateCourseInput {

  title: string;

  description: string;

  category: CourseCategory;

  batchName: string;

  duration: string;

  examType: string;


  level: string;

}

export const createCourseService =
  async (
    data: CreateCourseInput
  ) => {

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!data.title) {

      throw new Error(
        "Course title is required"
      );

    }

    // ==========================================
    // SLUG
    // ==========================================

    const slug =
      data.title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    // ==========================================
    // CREATE COURSE
    // ==========================================

    const course =
      await prisma.course.create({

        data: {

          title:
            data.title,

          slug,

          description:
            data.description,

          category:
            data.category,

          batchName:
            data.batchName,

          duration:
            data.duration,

          examType:
            data.examType,

          level:
            data.level,

          published:
            true,

        },

      });

    return course;

  };

interface CreateSubjectInput {

  name: string;

  courseId: string;

}

export const createSubjectService =
  async (
    data: CreateSubjectInput
  ) => {

    const slug =
      data.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    const subject =
      await prisma.subject.create({

        data: {

          name:
            data.name,

          slug,

          courseId:
            data.courseId,

          published:
            true,

        },

      });

    return subject;

  };

interface AssignMentorInput {

  subjectId: string;

  mentorId: string;

}

export const assignMentorService =
  async (
    data: AssignMentorInput
  ) => {

    // Verify subject exists
    const subject =
      await prisma.subject.findUnique({

        where: {
          id: data.subjectId,
        },

      });

    if (!subject) {

      throw new Error(
        "Subject not found"
      );

    }

    // Verify mentor exists
    const mentor =
      await prisma.mentor.findUnique({

        where: {
          id: data.mentorId,
        },

      });

    if (!mentor) {

      throw new Error(
        "Mentor not found"
      );

    }

    // Create assignment
    const assignment =
      await prisma.subjectMentor.create({

        data: {

          subjectId:
            data.subjectId,

          mentorId:
            data.mentorId,

        },

        include: {

          subject: true,

          mentor: {

            include: {

              user: true,

            },

          },

        },

      });

    return assignment;

  };