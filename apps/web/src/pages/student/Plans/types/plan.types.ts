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

export type PlanLimitPeriod =
  | "MONTHLY";


// ======================================================
// PLAN TEST LIMIT
// ======================================================

export interface PlanTestLimit {
  id: string;

  planId: string;

  testType: TestType;

  limitType: PlanLimitType;

  /**
   * Number of allowed tests when
   * limitType is LIMITED.
   *
   * null when UNLIMITED or NOT_ALLOWED.
   */
  limit: number | null;

  /**
   * Billing/access period.
   *
   * Can be null for UNLIMITED / NOT_ALLOWED.
   */
  period: PlanLimitPeriod | null;

  createdAt: string;

  updatedAt: string;
}



// ======================================================
// STUDENT SUBSCRIPTION PLAN
// ======================================================

export interface StudentSubscriptionPlan {
  id: string;

  title: string;

  description: string | null;

  examType: ExamType;

  /**
   * Original price of the plan.
   *
   * Example:
   * Level 2 plan = ₹1999
   */
  price: number;

  /**
   * Actual amount the current student
   * needs to pay.
   *
   * Normal purchase:
   * payablePrice = price
   *
   * Upgrade:
   * payablePrice = targetPlan.price - currentPlan.price
   */
  payablePrice: number;

  durationInDays: number;

  sessionsPerMonth: number;

  level: number;

  practiceQuestionsLimit: number | null;

  unlimitedPractice: boolean;

  prioritySupport: boolean;

  mentorSelectionEnabled: boolean;

  isPopular: boolean;

  isActive: boolean;

  /**
   * Whether the current student
   * already has an active subscription
   * for this plan.
   */
  isSubscribed: boolean;

  /**
   * Whether this plan is being shown
   * as an upgrade from the student's
   * current active paid plan.
   */
  isUpgrade: boolean;

  createdAt: string;

  updatedAt: string;

  testLimits: PlanTestLimit[];
}


// ======================================================
// GET AVAILABLE PLANS RESPONSE
// ======================================================

export interface GetStudentPlansResponse {
  success: boolean;

  plans: StudentSubscriptionPlan[];
}


// ======================================================
// GET SINGLE PLAN RESPONSE
// ======================================================

export interface GetStudentPlanResponse {
  success: boolean;

  plan: StudentSubscriptionPlan;
}

// ======================================================
// GET UPGRADE PRICE RESPONSE
// ======================================================

export interface UpgradePlanInfo {
  id: string;

  title: string;

  level: number;

  price: number;
}

export interface GetUpgradePriceResponse {
  success: boolean;

  currentPlan: UpgradePlanInfo;

  targetPlan: UpgradePlanInfo;

  /**
   * Amount the student needs to pay
   * for upgrading from currentPlan to targetPlan.
   *
   * This amount is in INR.
   */
  upgradePrice: number;
}