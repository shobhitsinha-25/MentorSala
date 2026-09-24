// ======================================================
// TEST ATTEMPT SUMMARY
// ======================================================

export interface TestAttemptSummary {
  id: string;

  attemptNumber: number;

  status:
    | "IN_PROGRESS"
    | "SUBMITTED"
    | "AUTO_SUBMITTED"
    | "EXPIRED";

  startedAt: string;

  submittedAt: string | null;

  expiresAt: string;

  score: number | null;

  percentage: number | null;

  correctAnswers: number;

  wrongAnswers: number;

  unanswered: number;

  timeTaken: number | null;
}

// ======================================================
// TEST
// ======================================================

export interface Test {
  id: string;

  title: string;

  description?: string;

  examType: string;

  type: string;

  duration: number;

  totalMarks: number;

  totalQuestions: number;

  negativeMarks: number;

  instructions?: string;

  startsAt: string | null;

  endsAt: string | null;

  status: string;

  subject?: {
    id: string;

    name: string;
  };

  chapter?: {
    id: string;

    title: string;
  };

  // ====================================================
  // STUDENT ATTEMPT
  // ====================================================

  // null  → student has never attempted this test
  // object → student has attempted this test
  attempt: TestAttemptSummary | null;
}

// ======================================================
// PAGINATION
// ======================================================

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

// ======================================================
// GET TESTS RESPONSE
// ======================================================

export interface GetTestsResponse {
  success: boolean;

  tests: Test[];

  pagination: Pagination;
}

// ======================================================
// STUDENT SUBJECT
// ======================================================

export interface StudentSubject {
  id: string;

  name: string;

  slug: string;
}

// ======================================================
// STUDENT CHAPTER
// ======================================================

export interface StudentChapter {
  id: string;

  title: string;
}