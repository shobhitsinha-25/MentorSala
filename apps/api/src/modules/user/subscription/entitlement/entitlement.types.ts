import type {
  TestType,
} from "@prisma/client";

// ======================================================
// ENTITLEMENT RESOURCE
// ======================================================

export const ENTITLEMENT_RESOURCE = {
  MENTORSHIP_SESSION: "MENTORSHIP_SESSION",
  TEST_SERIES: "TEST_SERIES",
} as const;

export type EntitlementResource =
  (typeof ENTITLEMENT_RESOURCE)[keyof typeof ENTITLEMENT_RESOURCE];

// ======================================================
// TEST SERIES ENTITLEMENT INPUT
// ======================================================

export interface TestSeriesEntitlementInput {
  userId: string;
  testType: TestType;
}

// ======================================================
// MENTORSHIP ENTITLEMENT INPUT
// ======================================================

export interface MentorshipEntitlementInput {
  userId: string;
}

// ======================================================
// ENTITLEMENT RESULT
// ======================================================

export interface EntitlementResult {
  allowed: boolean;
  resource: EntitlementResource;
  limit: number | null;
  remaining: number | null;
  unlimited: boolean;
  reason?: string;
  periodStart?: Date;
  periodEnd?: Date;
}