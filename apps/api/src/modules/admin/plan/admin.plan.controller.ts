import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  createPlanSchema,updatePlanSchema
} from "./plan.validation";

import {
  createPlan,
  getPlans,getPlanById,updatePlan,deactivatePlan
} from "./admin.plan.service";


// ======================================================
// CREATE PLAN
// ======================================================

export const createPlanController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // VALIDATE REQUEST BODY
      // ================================================

      const data =
        createPlanSchema.parse(
          req.body
        );


      // ================================================
      // CREATE PLAN
      // ================================================

      const plan =
        await createPlan(
          data
        );


      // ================================================
      // RESPONSE
      // ================================================

      return res.status(201).json({

        success: true,

        message:
          "Subscription plan created successfully.",

        plan,

      });

    }

  );


// ======================================================
// GET ALL PLANS
// ======================================================

export const getPlansController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // QUERY PARAMETERS
      // ================================================

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 20;

      const search =
        req.query.search as
          | string
          | undefined;

      const examType =
        req.query.examType as
          | string
          | undefined;

      const isActive =
        req.query.isActive === undefined
          ? undefined
          : req.query.isActive === "true";


      // ================================================
      // GET PLANS
      // ================================================

      const result =
        await getPlans({

          page,

          limit,

          search,

          examType: examType as any,

          isActive,

        });


      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        ...result,

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
          req.params.planId as string
        );


      return res.status(200).json({

        success: true,

        plan,

      });

    }

  );

  // ======================================================
// UPDATE PLAN
// ======================================================

export const updatePlanController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const data =
        updatePlanSchema.parse(
          req.body
        );

      const plan =
        await updatePlan({

          planId:
            req.params.planId as string,

          ...data,

        });

      return res.status(200).json({

        success: true,

        message:
          "Subscription plan updated successfully.",

        plan,

      });

    }

  );

  // ======================================================
// DEACTIVATE PLAN
// ======================================================

export const deactivatePlanController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const plan =
        await deactivatePlan(
          req.params.planId as string
        );

      return res.status(200).json({

        success: true,

        message:
          "Subscription plan deactivated successfully.",

        plan,

      });

    }

  );