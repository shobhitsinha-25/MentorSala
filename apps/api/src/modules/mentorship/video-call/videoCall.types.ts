import type {
  Role,
} from "@prisma/client";

// ======================================================
// VIDEO CALL USER
// ======================================================

export interface VideoCallUser {
  userId: string;
  role: Role;
}

// ======================================================
// VIDEO CALL JOIN RESULT
// ======================================================

export interface VideoCallJoinResult {

  sessionId: string;

  userId: string;

  role:
    | "STUDENT"
    | "MENTOR";

  scheduledAt: Date;

  duration: number;

  remainingSeconds: number;

}