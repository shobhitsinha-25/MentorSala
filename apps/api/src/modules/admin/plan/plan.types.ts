import {
  ExamType,
  PlanLimitPeriod,
  PlanLimitType,
  TestType,
} from "@prisma/client";


// ======================================================
// PLAN TEST LIMIT
// ======================================================

export interface PlanTestLimitInput {

  testType: TestType;

  limitType: PlanLimitType;

  limit?: number;

  period?: PlanLimitPeriod;

}


// ======================================================
// CREATE PLAN
// ======================================================

export interface CreatePlanInput {

  title: string;

  description?: string;

  examType: ExamType;

  price: number;

  durationInDays: number;

  sessionsPerMonth: number;

  isPopular?: boolean;

  isActive?: boolean;

  testLimits: PlanTestLimitInput[];

}

export interface GetPlansInput {
  page?: number;
  limit?: number;
  search?: string;
  examType?: ExamType;
  isActive?: boolean;
}

export interface UpdatePlanInput {
  planId: string;

  title?: string;
  description?: string;
  examType?: ExamType;
  price?: number;
  durationInDays?: number;
  sessionsPerMonth?: number;
  isPopular?: boolean;
  isActive?: boolean;

  testLimits?: {
    testType: TestType;
    limitType: PlanLimitType;
    limit?: number | null;
    period?: PlanLimitPeriod;
  }[];
}