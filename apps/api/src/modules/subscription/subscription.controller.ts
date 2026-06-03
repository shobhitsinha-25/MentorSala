import { Request, Response } from "express";
import {
  createPlan,
  getAllPlans,
} from "./subscription.service";

import prisma from "../../config/prisma";
import {
  getPlansForStudent,
} from "./subscription.service";

export const createPlanController =
async (
  req: Request,
  res: Response
) => {

  const plan =
    await createPlan(req.body);

  return res.status(201).json({
    success: true,
    data: plan,
  });

};

export const getPlansController =
async (
  req: Request,
  res: Response
) => {

  const plans =
    await getAllPlans();

  return res.json({
    success: true,
    data: plans,
  });

};



export const getStudentPlansController =
async (
  req: Request,
  res: Response
) => {

  if (!req.user) {

    return res.status(401).json({
      message: "Unauthorized",
    });

  }

  const user =
    await prisma.user.findUnique({

      where: {
        id: req.user.userId,
      },

    });

  if (!user) {

    return res.status(404).json({
      message: "User not found",
    });

  }

  if (!user.targetExam) {

    return res.status(400).json({
      message:
        "Target Exam not selected",
    });

  }

  const plans =
    await getPlansForStudent(
      user.targetExam
    );

  return res.json({

    success: true,

    data: plans,

  });

};
import {
  getMySubscription,
} from "./subscription.service";

export const getMySubscriptionController =
async (
  req: Request,
  res: Response
) => {

  if (!req.user) {

    return res.status(401).json({
      message: "Unauthorized",
    });

  }

  const subscription =
    await getMySubscription(
      req.user.userId
    );

  return res.json({

    success: true,

    data: subscription,

  });

};

export const purchasePlanController =
async (
  req: Request,
  res: Response
) => {

  if (!req.user) {

    return res.status(401).json({
      message: "Unauthorized",
    });

  }

  const { planId } = req.body;

  const userId =
    req.user.userId;

  const plan =
    await prisma.subscriptionPlan.findUnique({

      where: {
        id: planId,
      },

    });

  if (!plan) {

    return res.status(404).json({
      success: false,
      message: "Plan not found",
    });

  }

  const existingSubscription =
    await prisma.userSubscription.findFirst({

      where: {
        userId,
        status: "ACTIVE",
      },

      include: {
        plan: true,
      },

    });

  // Same plan check
  if (
    existingSubscription?.planId ===
    planId
  ) {

    return res.status(400).json({

      success: false,

      message:
        "You already have this plan",

    });

  }

  let credit = 0;

  let payableAmount =
    plan.price;

  if (existingSubscription) {

    // Prevent downgrade
    if (
      plan.price <=
      existingSubscription.plan.price
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Downgrading plans is not allowed",

      });

    }

    const totalDays =
      existingSubscription.plan.durationInDays;

    const daysUsed =
      Math.floor(

        (
          Date.now() -

          existingSubscription.startsAt.getTime()

        ) /

        (1000 * 60 * 60 * 24)

      );

    const remainingDays =
      Math.max(
        totalDays - daysUsed,
        0
      );

    credit =

      existingSubscription.plan.price *

      (
        remainingDays /
        totalDays
      );

    payableAmount =
      Math.max(
        plan.price - credit,
        0
      );

    // Expire old plan
    await prisma.userSubscription.update({

      where: {
        id:
          existingSubscription.id,
      },

      data: {
        status: "EXPIRED",
      },

    });

  }

  const startsAt =
    new Date();

  const expiresAt =
    new Date();

  expiresAt.setDate(
    expiresAt.getDate() +
      plan.durationInDays
  );

  const subscription =
    await prisma.userSubscription.create({

      data: {

        userId,

        planId,

        remainingSessions:
          plan.sessionsPerMonth,

        startsAt,

        expiresAt,

        status: "ACTIVE",

      },

    });

  return res.status(201).json({

    success: true,

    credit,

    payableAmount,

    data: subscription,

  });

};