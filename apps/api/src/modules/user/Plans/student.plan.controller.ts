import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  getAvailablePlans,getPlanById,getUpgradePrice
} from "./student.plan.service";

// ======================================================
// GET AVAILABLE PLANS
// ======================================================

export const getAvailablePlansController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const plans =
        await getAvailablePlans(
          req.user!.userId
        );

      return res.status(200).json({

        success: true,

        plans,

      });

    }

  );

  // ======================================================
// GET PLAN BY ID
// ======================================================

export const getPlanByIdController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const plan =
        await getPlanById(

          req.user!.userId,

          req.params.planId as string

        );

      return res.status(200).json({

        success: true,

        plan,

      });

    }

  );

  // ======================================================
// GET UPGRADE PRICE
// ======================================================

export const getUpgradePriceController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const targetPlanId =
        req.params.planId as string;

      if (
        !targetPlanId ||
        !targetPlanId.trim()
      ) {

        throw new Error(
          "Invalid target plan ID."
        );

      }

      const result =
        await getUpgradePrice(

          req.user!.userId,

          targetPlanId

        );

      return res.status(200).json({

        success: true,

        ...result,

      });

    }

  );