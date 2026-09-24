import type {
  SubscriptionStatus,
  ExamType,
} from "@prisma/client";

export type StudentSubscriptionState =
  | "TRIAL_NOT_STARTED"
  | "TRIAL_ACTIVE"
  | "TRIAL_EXPIRED"
  | "PAID_ACTIVE"
  | "NO_ACCESS";

export interface StudentSubscriptionStateResponse {
  status: StudentSubscriptionState;

  trial: {
    startedAt: Date | null;
    expiresAt: Date | null;
  };

  subscription: {
    id: string;
    planId: string;
    paymentId: string | null;
    status: SubscriptionStatus;
    startsAt: Date;
    expiresAt: Date;
  } | null;

  plan: {
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
  } | null;
}