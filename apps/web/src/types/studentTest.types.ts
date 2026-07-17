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

export interface StudentSubject {
  id: string;
  name: string;
  slug: string;
}

export interface StudentChapter {
  id: string;
  title: string;
}