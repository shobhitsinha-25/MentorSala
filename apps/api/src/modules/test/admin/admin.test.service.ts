import prisma from "../../../config/prisma";

import {
  CreateTestInput,GetTestsInput,UpdateTestInput
} from "../test.types";

// ======================================================
// CREATE TEST
// ======================================================

export const createTest = async (
  data: CreateTestInput
) => {

  // ==========================================
  // SUBJECT VALIDATION
  // ==========================================

  if (data.subjectId) {

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

  }

  // ==========================================
  // CHAPTER VALIDATION
  // ==========================================

  if (data.chapterId) {

    const chapter =
      await prisma.chapter.findFirst({

        where: {

          id: data.chapterId,

          subjectId:
            data.subjectId,

          isDeleted: false,

        },

      });

    if (!chapter) {

      throw new Error(
        "Chapter not found."
      );

    }

  }

  // ==========================================
  // SUBSCRIPTION VALIDATION
  // ==========================================

  if (data.subscriptionPlanId) {

    const plan =
      await prisma.subscriptionPlan.findUnique({

        where: {

          id: data.subscriptionPlanId,

        },

      });

    if (!plan) {

      throw new Error(
        "Subscription plan not found."
      );

    }

  }

  // ==========================================
  // CREATE TEST
  // ==========================================

  return prisma.test.create({

    data: {

      title:
        data.title,

      description:
        data.description,

      examType:
        data.examType,

      type:
        data.type,

      subjectId:
        data.subjectId,

      chapterId:
        data.chapterId,

      duration:
        data.duration,

      negativeMarks:
        data.negativeMarks ?? 0,

      instructions:
        data.instructions,

      maxAttempts:
        data.maxAttempts ?? 1,

      startsAt:
        data.startsAt,

      endsAt:
        data.endsAt,

      subscriptionPlanId:
  data.subscriptionPlanId || undefined,

      createdBy:
        data.createdBy,

      totalMarks: 0,

      totalQuestions: 0,

      status: "DRAFT",

    },

    include: {

      subject: true,

      chapter: true,

      subscriptionPlan: true,

    },

  });

};

// ======================================================
// GET TESTS
// ======================================================

export const getTests = async ({
  page = 1,
  limit = 20,
  search,
  examType,
  type,
  status,
  subjectId,
  chapterId,
}: GetTestsInput) => {

  const skip =
    (page - 1) * limit;

  const where: any = {

    isDeleted: false,

  };

  if (search) {

    where.title = {

      contains: search,

      mode: "insensitive",

    };

  }

  if (examType) {

    where.examType = examType;

  }

  if (type) {

    where.type = type;

  }

  if (status) {

    where.status = status;

  }

  if (subjectId) {

    where.subjectId = subjectId;

  }

  if (chapterId) {

    where.chapterId = chapterId;

  }

  const [tests, total] =
    await prisma.$transaction([

      prisma.test.findMany({

        where,

        include: {

          subject: {

            select: {

              id: true,

              name: true,

            },

          },

          chapter: {

            select: {

              id: true,

              title: true,

            },

          },

          subscriptionPlan: {

            select: {

              id: true,

              title: true,
            },

          },

        },

        orderBy: {

          createdAt: "desc",

        },

        skip,

        take: limit,

      }),

      prisma.test.count({

        where,

      }),

    ]);

  return {

    tests,

    pagination: {

      page,

      limit,

      total,

      pages:
        Math.ceil(
          total / limit
        ),

    },

  };

};

// ======================================================
// GET TEST BY ID
// ======================================================

export const getTestById = async (
  testId: string
) => {

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

      include: {

        subject: {

          select: {

            id: true,

            name: true,

            examType: true,

          },

        },

        chapter: {

          select: {

            id: true,

            title: true,

            order: true,

          },

        },

        subscriptionPlan: {

          select: {

            id: true,

            title: true,

            price: true,

          },

        },

      },

    });

  if (!test) {

    throw new Error(
      "Test not found."
    );

  }

  return test;

};

// ======================================================
// UPDATE TEST
// ======================================================

export const updateTest = async ({
  testId,
  ...data
}: UpdateTestInput) => {

  const existingTest =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

    });

  if (!existingTest) {

    throw new Error(
      "Test not found."
    );

  }

  // ==========================
  // SUBJECT VALIDATION
  // ==========================

  if (data.subjectId) {

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

  }

  // ==========================
  // CHAPTER VALIDATION
  // ==========================

  if (data.chapterId) {

    const chapter =
      await prisma.chapter.findFirst({

        where: {

          id: data.chapterId,

          subjectId: data.subjectId,

          isDeleted: false,

        },

      });

    if (!chapter) {

      throw new Error(
        "Chapter not found."
      );

    }

  }

  // ==========================
  // SUBSCRIPTION PLAN
  // ==========================

  if (data.subscriptionPlanId) {

    const plan =
      await prisma.subscriptionPlan.findUnique({

        where: {

          id: data.subscriptionPlanId,

        },

      });

    if (!plan) {

      throw new Error(
        "Subscription plan not found."
      );

    }

  }

  return prisma.test.update({

    where: {

      id: testId,

    },

    data: {

      title: data.title,

      description: data.description,

      examType: data.examType,

      type: data.type,

      subjectId: data.subjectId,

      chapterId: data.chapterId,

      duration: data.duration,

      negativeMarks:
        data.negativeMarks,

      instructions:
        data.instructions,

      maxAttempts:
        data.maxAttempts,

      startsAt:
        data.startsAt,

      endsAt:
        data.endsAt,

      subscriptionPlanId:
        data.subscriptionPlanId,

      status:
        data.status,

    },

    include: {

      subject: true,

      chapter: true,

      subscriptionPlan: true,

    },

  });

};

// ======================================================
// DELETE TEST
// ======================================================

export const deleteTest = async (
  testId: string
) => {

  const test =
    await prisma.test.findFirst({

      where: {

        id: testId,

        isDeleted: false,

      },

      include: {

        attempts: true,

      },

    });

  if (!test) {

    throw new Error(
      "Test not found."
    );

  }

  // ==========================================
  // STUDENT ATTEMPTS EXIST
  // ==========================================

  if (test.attempts.length > 0) {

    throw new Error(
      "Cannot delete a test that has student attempts."
    );

  }

  // ==========================================
  // SOFT DELETE
  // ==========================================

  await prisma.test.update({

    where: {

      id: testId,

    },

    data: {

      isDeleted: true,

      deletedAt: new Date(),

      status: "ARCHIVED",

    },

  });

};