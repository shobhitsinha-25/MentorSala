// ======================================================
// EXAM TYPE
// ======================================================

export type ExamType =
  | "JEE"
  | "WBJEE"
  | "BOARDS";


// ======================================================
// TEST TYPE
// ======================================================

export type TestType =
  | "CHAPTER"
  | "SUBJECT"
  | "MOCK"
  | "PYQ"
  | "PRACTICE";


// ======================================================
// PLAN LIMIT TYPE
// ======================================================

export type PlanLimitType =
  | "LIMITED"
  | "UNLIMITED"
  | "NOT_ALLOWED";


// ======================================================
// PLAN LIMIT PERIOD
// ======================================================

/**
 * MONTHLY
 * - Used by paid subscription plans.
 * - Quota resets at the beginning of each calendar month.
 *
 * SUBSCRIPTION
 * - Used by free-trial plans.
 * - Quota is available for the lifetime of that subscription/trial.
 */
export type PlanLimitPeriod =
  | "MONTHLY"
  | "SUBSCRIPTION";


// ======================================================
// PLAN TEST LIMIT
// ======================================================

export interface PlanTestLimit {
  id: string;

  planId: string;

  testType: TestType;

  limitType: PlanLimitType;

  /**
   * Required when limitType === "LIMITED".
   * Null for UNLIMITED / NOT_ALLOWED.
   */
  limit: number | null;

  /**
   * Required when limitType === "LIMITED".
   * Null for UNLIMITED / NOT_ALLOWED.
   *
   * MONTHLY:
   * Used by paid plans.
   *
   * SUBSCRIPTION:
   * Used by trial plans.
   */
  period: PlanLimitPeriod | null;

  createdAt: string;

  updatedAt: string;
}


// ======================================================
// SUBSCRIPTION PLAN
// ======================================================

export interface SubscriptionPlan {
  id: string;

  title: string;

  description: string | null;

  examType: ExamType;

  price: number;

  durationInDays: number;

  sessionsPerMonth: number;

  practiceQuestionsLimit: number | null;

  unlimitedPractice: boolean;

  prioritySupport: boolean;

  mentorSelectionEnabled: boolean;

  isPopular: boolean;

  isActive: boolean;

  /**
   * Plan level used for ordering/identifying plan tiers.
   */
  level: number;

  /**
   * true  -> Free Trial Plan
   * false -> Paid Subscription Plan
   */
  isTrial: boolean;

  createdAt: string;

  updatedAt: string;

  testLimits: PlanTestLimit[];
}


// ======================================================
// CREATE PLAN - TEST LIMIT
// ======================================================

export interface CreatePlanTestLimitInput {
  testType: TestType;

  limitType: PlanLimitType;

  /**
   * Required for LIMITED.
   * Null for UNLIMITED / NOT_ALLOWED.
   */
  limit?: number | null;

  /**
   * Required for LIMITED.
   * Null for UNLIMITED / NOT_ALLOWED.
   *
   * Trial plan  -> SUBSCRIPTION
   * Paid plan   -> MONTHLY
   */
  period?: PlanLimitPeriod | null;
}


// ======================================================
// CREATE PLAN INPUT
// ======================================================

export interface CreatePlanInput {
  title: string;

  description?: string;

  examType: ExamType;

  /**
   * Free trial plans use price = 0.
   * Paid plans use a positive price.
   */
  price: number;

  /**
   * For trial plans this represents the trial duration.
   */
  durationInDays: number;

  /**
   * For paid plans this represents monthly mentorship
   * session entitlement.
   *
   * For trial plans this applies for the trial subscription
   * period.
   */
  sessionsPerMonth: number;

  /**
   * true  -> Free Trial Plan
   * false -> Paid Plan
   */
  isTrial?: boolean;

  isPopular?: boolean;

  isActive?: boolean;

  level: number;

  testLimits: CreatePlanTestLimitInput[];
}


// ======================================================
// UPDATE PLAN INPUT
// ======================================================

export interface UpdatePlanInput {
  title?: string;

  description?: string;

  examType?: ExamType;

  price?: number;

  durationInDays?: number;

  sessionsPerMonth?: number;

  /**
   * true  -> Free Trial Plan
   * false -> Paid Plan
   */
  isTrial?: boolean;

  isPopular?: boolean;

  isActive?: boolean;

  level?: number;

  testLimits?: CreatePlanTestLimitInput[];
}


// ======================================================
// PLAN LIST QUERY
// ======================================================

export interface GetPlansParams {
  page?: number;

  limit?: number;

  search?: string;

  examType?: ExamType;

  isActive?: boolean;

  /**
   * Filter plans by type.
   *
   * true  -> Trial plans
   * false -> Paid plans
   */
  isTrial?: boolean;
}


// ======================================================
// PAGINATION
// ======================================================

export interface PlansPagination {
  page: number;

  limit: number;

  total: number;

  pages: number;
}


// ======================================================
// GET PLANS RESPONSE
// ======================================================

export interface GetPlansResponse {
  success: boolean;

  plans: SubscriptionPlan[];

  pagination: PlansPagination;
}


// ======================================================
// GET SINGLE PLAN RESPONSE
// ======================================================

export interface GetPlanResponse {
  success: boolean;

  plan: SubscriptionPlan;
}


// ======================================================
// CREATE PLAN RESPONSE
// ======================================================

export interface CreatePlanResponse {
  success: boolean;

  message: string;

  plan: SubscriptionPlan;
}


// ======================================================
// UPDATE PLAN RESPONSE
// ======================================================

export interface UpdatePlanResponse {
  success: boolean;

  message: string;

  plan: SubscriptionPlan;
}


// ======================================================
// DELETE PLAN RESPONSE
// ======================================================

export interface DeletePlanResponse {
  success: boolean;

  message: string;
}


// ======================================================
// FORM STATE
// ======================================================

export interface PlanFormData {
  title: string;

  description: string;

  examType: ExamType;

  price: number;

  durationInDays: number;

  sessionsPerMonth: number;

  /**
   * true  -> Free Trial Plan
   * false -> Paid Plan
   */
  isTrial: boolean;

  isPopular: boolean;

  isActive: boolean;

  level: number;

  testLimits: PlanTestLimitFormData[];
}


// ======================================================
// TEST LIMIT FORM STATE
// ======================================================

export interface PlanTestLimitFormData {
  testType: TestType;

  limitType: PlanLimitType;

  /**
   * Required when limitType === "LIMITED".
   * Null for UNLIMITED / NOT_ALLOWED.
   */
  limit: number | null;

  /**
   * Required when limitType === "LIMITED".
   *
   * Paid plan  -> MONTHLY
   * Trial plan -> SUBSCRIPTION
   */
  period: PlanLimitPeriod | null;
}