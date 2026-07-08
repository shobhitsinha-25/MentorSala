import prisma from "../../config/prisma";
import { buildWordSearch } from "../../utils/buildSearchFilter";

import {
  CreateChapterInput,GetChaptersInput,UpdateChapterInput
} from "./chapter.types";



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
// CREATE CHAPTER
// ======================================================

export const createChapter = async (
  data: CreateChapterInput
) => {

  // ==========================================
  // SUBJECT VALIDATION
  // ==========================================

  const subject =
    await prisma.subject.findFirst({

      where: {

        id: data.subjectId,

        isDeleted: false,

      },

    });

  if (!subject) {

    throw new Error(
      "Subject not found."
    );

  }

  const slug =
    generateSlug(data.title);

  // ==========================================
  // DUPLICATE CHAPTER
  // ==========================================

  const existingChapter =
    await prisma.chapter.findFirst({

      where: {

        subjectId:
          data.subjectId,

        slug,

        isDeleted: false,

      },

    });

  if (existingChapter) {

    throw new Error(
      "Chapter already exists."
    );

  }

  // ==========================================
  // ORDER VALIDATION
  // ==========================================

  const orderExists =
    await prisma.chapter.findFirst({

      where: {

        subjectId:
          data.subjectId,

        order:
          data.order,

        isDeleted: false,

      },

    });

  if (orderExists) {

    throw new Error(
      "Chapter order already exists."
    );

  }

  // ==========================================
  // CREATE CHAPTER
  // ==========================================

  const chapter =
    await prisma.chapter.create({

      data: {

        title:
          data.title.trim(),

        slug,

        order:
          data.order,

        subjectId:
          data.subjectId,

      },

      include: {

        subject: {

          select: {

            id: true,

            name: true,

            examType: true,

          },

        },

      },

    });

  return chapter;

};


// ======================================================
// GET CHAPTERS
// ======================================================

export const getChapters = async ({
  subjectId,
  search,
  page = 1,
  limit = 10,
}: GetChaptersInput) => {

  if (subjectId) {

    const subject =
      await prisma.subject.findFirst({

        where: {

          id: subjectId,

          isDeleted: false,

        },

      });

    if (!subject) {

      throw new Error(
        "Subject not found."
      );

    }

  }

  const skip =
    (page - 1) * limit;

  const where: any = {

    isDeleted: false,

  };

  if (subjectId) {

    where.subjectId = subjectId;

  }

 const searchFilter = buildWordSearch(search, [

  (word) => ({
    title: {
      contains: word,
      mode: "insensitive",
    },
  }),

  (word) => ({
    slug: {
      contains: word,
      mode: "insensitive",
    },
  }),

  (word) => ({
    subject: {
      name: {
        contains: word,
        mode: "insensitive",
      },
    },
  }),

]);

if (searchFilter) {

  where.AND = [

    ...(where.AND || []),

    ...searchFilter,

  ];

}

  const [chapters, total] =
    await prisma.$transaction([

      prisma.chapter.findMany({

        where,

        include: {

          subject: {

            select: {

              id: true,

              name: true,

              examType: true,

            },

          },

        },

        orderBy: {

          order: "asc",

        },

        skip,

        take: limit,

      }),

      prisma.chapter.count({

        where,

      }),

    ]);

  return {

    chapters,

    pagination: {

      page,

      limit,

      total,

      pages: Math.ceil(total / limit),

    },

  };

};


// ======================================================
// UPDATE CHAPTER
// ======================================================

export const updateChapter = async ({
  chapterId,
  title,
  order,
  subjectId,
}: UpdateChapterInput) => {

  const chapter =
    await prisma.chapter.findFirst({

      where: {

        id: chapterId,

        isDeleted: false,

      },

    });

  if (!chapter) {

    throw new Error(
      "Chapter not found."
    );

  }

  const subject =
    await prisma.subject.findFirst({

      where: {

        id: subjectId,

        isDeleted: false,

      },

    });

  if (!subject) {

    throw new Error(
      "Subject not found."
    );

  }

  const slug =
    generateSlug(title);

  const duplicate =
    await prisma.chapter.findFirst({

      where: {

        id: {

          not: chapterId,

        },

        subjectId,

        slug,

        isDeleted: false,

      },

    });

  if (duplicate) {

    throw new Error(
      "Chapter already exists."
    );

  }

  const orderExists =
    await prisma.chapter.findFirst({

      where: {

        id: {

          not: chapterId,

        },

        subjectId,

        order,

        isDeleted: false,

      },

    });

  if (orderExists) {

    throw new Error(
      "Chapter order already exists."
    );

  }

  const updatedChapter =
    await prisma.chapter.update({

      where: {

        id: chapterId,

      },

      data: {

        title:
          title.trim(),

        slug,

        order,

        subjectId,

      },

      include: {

        subject: {

          select: {

            id: true,

            name: true,

            examType: true,

          },

        },

      },

    });

  return updatedChapter;

};

// ======================================================
// DELETE CHAPTER
// ======================================================

export const deleteChapter = async (
  chapterId: string
) => {

  const chapter =
    await prisma.chapter.findFirst({

      where: {

        id: chapterId,

        isDeleted: false,

      },

      include: {

        tests: {

          where: {

            isDeleted: false,

          },

        },

      },

    });

  if (!chapter) {

    throw new Error(
      "Chapter not found."
    );

  }

  if (chapter.tests.length > 0) {

    throw new Error(
      "Cannot delete chapter. Tests are linked with this chapter."
    );

  }

  await prisma.chapter.update({

    where: {

      id: chapterId,

    },

    data: {

      isDeleted: true,

    },

  });

};