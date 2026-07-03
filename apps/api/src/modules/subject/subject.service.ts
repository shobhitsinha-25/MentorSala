import prisma from "../../config/prisma";

import { CreateSubjectInput,GetSubjectsInput,UpdateSubjectInput }
from "./subject.types";

const generateSlug = (
  value: string
) => {

  return value

    .trim()

    .toLowerCase()

    .replace(/[^a-z0-9\s]/g, "")

    .replace(/\s+/g, "-");

};

// ======================================================
// CREATE SUBJECT
// ======================================================

export const createSubject =
async (

  data: CreateSubjectInput

) => {

  const slug =
    generateSlug(data.name);

    const deletedSubject = await prisma.subject.findFirst({
  where: {
    examType: data.examType,
    slug,
    isDeleted: true,
  },
});

if (deletedSubject) {
  return prisma.subject.update({
    where: {
      id: deletedSubject.id,
    },
    data: {
      isDeleted: false,
      deletedAt: null,
      name: data.name.trim(),
    },
  });
}

  const existingSubject =
    await prisma.subject.findFirst({

      where: {

        examType:
          data.examType,

        slug,


      },

    });

  if (existingSubject) {

    throw new Error(
      "Subject already exists."
    );

  }

  const subject =
    await prisma.subject.create({

      data: {

        name:
          data.name.trim(),

        slug,

        examType:
          data.examType,

      },

    });

  return subject;

};

// ======================================================
// GET SUBJECTS
// ======================================================

export const getSubjects = async ({
  examType,
  search,
  page = 1,
  limit = 10,
}: GetSubjectsInput) => {

  const skip = (page - 1) * limit;

  const where: any = {

    isDeleted: false,

  };

  if (examType) {

    where.examType = examType;

  }

  if (search) {

    where.name = {

      contains: search,

      mode: "insensitive",

    };

  }

  const [subjects, total] =
    await prisma.$transaction([

      prisma.subject.findMany({

        where,

        orderBy: {

          name: "asc",

        },

        skip,

        take: limit,

      }),

      prisma.subject.count({

        where,

      }),

    ]);

  return {

    subjects,

    pagination: {

      page,

      limit,

      total,

      pages: Math.ceil(total / limit),

    },

  };

};


// ======================================================
// UPDATE SUBJECT
// ======================================================

export const updateSubject = async ({
  subjectId,
  name,
  examType,
}: UpdateSubjectInput) => {

  const subject =
    await prisma.subject.findUnique({

      where: {

        id: subjectId,

      },

    });

  if (!subject) {

    throw new Error(
      "Subject not found."
    );

  }

  const slug =
    generateSlug(name);

  const duplicate =
    await prisma.subject.findFirst({

      where: {

        id: {

          not: subjectId,

        },

        examType,

        slug,

      },

    });

  if (duplicate) {

    throw new Error(
      "Subject already exists."
    );

  }

  const updatedSubject =
    await prisma.subject.update({

      where: {

        id: subjectId,

      },

      data: {

        name:
          name.trim(),

        slug,

        examType,

      },

    });

  return updatedSubject;

};

// ======================================================
// DELETE SUBJECT
// ======================================================

export const deleteSubject = async (
  subjectId: string
) => {

  const subject =
    await prisma.subject.findUnique({

      where: {

        id: subjectId,

      },

      include: {

        chapters: {

          where: {

            isDeleted: false,

          },

        },

        tests: true,

      },

    });

  if (!subject) {

    throw new Error(
      "Subject not found."
    );

  }

  if (subject.chapters.length > 0) {

    throw new Error(
      "Cannot delete subject. Chapters exist under this subject."
    );

  }

  if (subject.tests.length > 0) {

    throw new Error(
      "Cannot delete subject. Tests are linked with this subject."
    );

  }

  await prisma.subject.update({

    where: {

      id: subjectId,

    },

    data: {

      isDeleted: true,

      deletedAt: new Date(),

    },

  });

};