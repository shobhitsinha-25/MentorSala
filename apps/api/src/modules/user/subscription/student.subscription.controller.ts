import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";


import {
  getStudentSubscriptionState,
  getStudentSubscriptionUsage
} from "./student.subscription.service";

export const getStudentSubscriptionStateController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const state =
        await getStudentSubscriptionState(
          req.user.userId
        );

      return res.status(200).json({
        success: true,
        state,
      });
    }
  );

  export const getStudentSubscriptionUsageController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const usage =
        await getStudentSubscriptionUsage(
          req.user.userId
        );

      return res.status(200).json({
        success: true,
        usage,
      });
    }
  );