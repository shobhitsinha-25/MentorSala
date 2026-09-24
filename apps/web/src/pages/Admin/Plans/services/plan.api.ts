import api from "../../../../api/axios"

import type {
  CreatePlanInput,
  CreatePlanResponse,
  DeletePlanResponse,
  GetPlanResponse,
  GetPlansParams,
  GetPlansResponse,
  UpdatePlanInput,
  UpdatePlanResponse,
} from "../types/plan.types";


// ======================================================
// GET ALL PLANS
// ======================================================

export const getPlans = async (
  params?: GetPlansParams
): Promise<GetPlansResponse> => {

  const response =
    await api.get<GetPlansResponse>(
      "/admin/plans",
      {
        params,
      }
    );

  return response.data;
};


// ======================================================
// GET PLAN BY ID
// ======================================================

export const getPlanById = async (
  planId: string
): Promise<GetPlanResponse> => {

  const response =
    await api.get<GetPlanResponse>(
      `/admin/plans/${planId}`
    );

  return response.data;
};


// ======================================================
// CREATE PLAN
// ======================================================

export const createPlan = async (
  data: CreatePlanInput
): Promise<CreatePlanResponse> => {

  const response =
    await api.post<CreatePlanResponse>(
      "/admin/plans",
      data
    );

  return response.data;
};


// ======================================================
// UPDATE PLAN
// ======================================================

export const updatePlan = async (
  planId: string,
  data: UpdatePlanInput
): Promise<UpdatePlanResponse> => {

  const response =
    await api.put<UpdatePlanResponse>(
      `/admin/plans/${planId}`,
      data
    );

  return response.data;
};


// ======================================================
// DELETE PLAN
// ======================================================

export const deactivatePlan = async (
  planId: string
): Promise<DeletePlanResponse> => {

  const response =
    await api.patch<DeletePlanResponse>(
      `/admin/plans/${planId}/deactivate`
    );

  return response.data;
};