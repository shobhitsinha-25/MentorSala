import prisma from "../../../config/prisma";


// ======================================================
// GET AVAILABLE PLANS
// ======================================================

export const getAvailablePlans = async (
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


  if (!student) {

    throw new Error(
      "Student not found."
    );

  }


  if (!student.targetExam) {

    throw new Error(
      "Target exam is not set."
    );

  }


  return prisma.subscriptionPlan.findMany({

    where: {

      isActive: true,

      examType:
        student.targetExam,

    },

    include: {

      testLimits: {

        orderBy: {

          testType:
            "asc",

        },

      },

    },

    orderBy: [

      {
        isPopular:
          "desc",
      },

      {
        price:
          "asc",
      },

    ],

  });

};