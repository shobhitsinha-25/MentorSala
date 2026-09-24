import api from "../../../../api/axios";

import type {
  GetStudentPlanResponse,
  GetStudentPlansResponse,
  GetUpgradePriceResponse,
} from "../types/plan.types";


// ======================================================
// GET AVAILABLE PLANS
// ======================================================

/**
 * Fetches all active subscription plans available
 * for the logged-in student's target exam.
 *
 * Backend:
 * GET /api/student/plans
 *
 * Axios baseURL already contains /api, so we use:
 * /student/plans
 */
export const getStudentPlans =
  async (): Promise<GetStudentPlansResponse> => {

    const response =
      await api.get<GetStudentPlansResponse>(
        "/student/plans"
      );

    return response.data;
  };


// ======================================================
// GET PLAN BY ID
// ======================================================

/**
 * Fetches a single plan for the logged-in student.
 *
 * Backend:
 * GET /api/student/plans/:planId
 *
 * The backend is responsible for verifying that:
 *
 * 1. Student exists
 * 2. Student has a targetExam
 * 3. Plan is active
 * 4. Plan belongs to the student's targetExam
 */
export const getStudentPlanById =
  async (
    planId: string
  ): Promise<GetStudentPlanResponse> => {

    const response =
      await api.get<GetStudentPlanResponse>(
        `/student/plans/${planId}`
      );

    return response.data;
  };

  // ======================================================
// GET UPGRADE PRICE
// ======================================================

/**
 * Fetches the price required to upgrade from the
 * student's current paid plan to the target plan.
 *
 * Backend:
 * GET /api/student/plans/upgrade-price/:planId
 *
 * Axios baseURL already contains /api, so we use:
 * /student/plans/upgrade-price/:planId
 *
 * The backend is responsible for:
 *
 * 1. Verifying the student
 * 2. Verifying the target plan
 * 3. Finding the student's active paid plan
 * 4. Checking that target level is higher
 * 5. Calculating:
 *
 *    targetPlan.price - currentPlan.price
 *
 * The frontend must NOT calculate the upgrade price itself.
 */
export const getUpgradePrice =
  async (
    planId: string
  ): Promise<GetUpgradePriceResponse> => {

    const response =
      await api.get<GetUpgradePriceResponse>(
        `/student/plans/upgrade-price/${planId}`
      );

    return response.data;
  };