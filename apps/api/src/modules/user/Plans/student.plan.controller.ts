import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  getAvailablePlans,
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