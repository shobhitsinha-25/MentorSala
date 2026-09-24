import {
  Prisma,
  type XPTransactionType,
} from "@prisma/client";

import prisma from "../../config/prisma";

import {
  XP_REWARDS,
  getCategoryFromXP,
} from "./gamification.constants";

// ======================================================
// AWARD XP
// ======================================================

export const awardXP = async ({
  userId,
  type,
  referenceId,
  description,
}: {
  userId: string;
  type: XPTransactionType;
  referenceId: string;
  description?: string;
}) => {
  const amount = XP_REWARDS[type];

  if (!amount) {
    throw new Error(
      `XP reward is not configured for ${type}.`
    );
  }

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // ==============================================
        // CHECK WHETHER THIS ACTIVITY ALREADY
        // AWARDED XP
        // ==============================================

        const existingTransaction =
          await tx.xPTransaction.findUnique({
            where: {
              userId_type_referenceId: {
                userId,
                type,
                referenceId,
              },
            },
          });

        if (existingTransaction) {
          const user =
            await tx.user.findUnique({
              where: {
                id: userId,
              },
            });

          if (!user) {
            throw new Error(
              "User not found."
            );
          }

          return {
            awarded: false,
            amount: 0,
            xp: user.xp,
            level: user.level,
            transaction:
              existingTransaction,
          };
        }

        // ==============================================
        // GET USER
        // ==============================================

        const user =
          await tx.user.findUnique({
            where: {
              id: userId,
            },
          });

        if (!user) {
          throw new Error(
            "User not found."
          );
        }

        // ==============================================
        // CALCULATE NEW XP
        // ==============================================

        const newXP =
          user.xp + amount;

        const newLevel =
          getCategoryFromXP(newXP);

        // ==============================================
        // CREATE XP TRANSACTION
        // ==============================================

        const transaction =
          await tx.xPTransaction.create({
            data: {
              userId,
              amount,
              type,
              referenceId,
              description,
            },
          });

        // ==============================================
        // UPDATE USER XP + CATEGORY
        // ==============================================

        const updatedUser =
          await tx.user.update({
            where: {
              id: userId,
            },

            data: {
              xp: newXP,
              level: newLevel,
            },
          });

        return {
          awarded: true,
          amount,
          xp: updatedUser.xp,
          level: updatedUser.level,
          transaction,
        };
      }
    );

    return result;
  } catch (error) {
    // ==============================================
    // RACE CONDITION PROTECTION
    // ==============================================
    //
    // Two requests can arrive simultaneously.
    // The unique constraint prevents duplicate XP.
    //

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const existingTransaction =
        await prisma.xPTransaction.findUnique({
          where: {
            userId_type_referenceId: {
              userId,
              type,
              referenceId,
            },
          },
        });

      const user =
        await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

      if (!user) {
        throw new Error(
          "User not found."
        );
      }

      return {
        awarded: false,
        amount: 0,
        xp: user.xp,
        level: user.level,
        transaction:
          existingTransaction,
      };
    }

    throw error;
  }
};


// ======================================================
// DAILY LOGIN XP
// ======================================================

export const awardDailyLoginXP = async (
  userId: string
) => {
  const todayReferenceId =
    new Date().toISOString().slice(0, 10);

  return awardXP({
    userId,

    type: "DAILY_LOGIN",

    referenceId:
      todayReferenceId,

    description:
      "Daily login reward",
  });
};