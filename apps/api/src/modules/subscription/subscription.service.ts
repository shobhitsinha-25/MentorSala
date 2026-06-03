import prisma from "../../config/prisma";
import { ExamType } from "@prisma/client";

export const createPlan = async (
  data: {
    title: string;
    description?: string;
    examType: ExamType;
    price: number;
    durationInDays: number;
    sessionsPerMonth: number;
    practiceQuestionsLimit?: number;
    unlimitedPractice?: boolean;
    prioritySupport?: boolean;
    mentorSelectionEnabled?: boolean;
  }
) => {

  return prisma.subscriptionPlan.create({
    data,
  });

};

export const getAllPlans = async () => {

  return prisma.subscriptionPlan.findMany({

    orderBy: {
      createdAt: "desc",
    },

  });

};

export const getPlansForStudent =
async (
  examType: ExamType
) => {

  return prisma.subscriptionPlan.findMany({

    where: {
      examType,
      isActive: true,
    },

    orderBy: {
      price: "asc",
    },

  });

};



export const getMySubscription =
async (
  userId: string
) => {

  return prisma.userSubscription.findFirst({

    where: {
      userId,
      status: "ACTIVE",
    },

    include: {

      plan: true,

    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

