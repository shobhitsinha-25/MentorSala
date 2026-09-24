import api from "../../../../lib/axios";


// ======================================================
// TYPES
// ======================================================

export interface TestProgressPoint {

  attemptId: string;

  testId: string;

  testTitle: string;

  testType: string;

  percentage: number;

  score: number;

  submittedAt: string;

}


export interface TestProgressResponse {

  success: boolean;

  progress: TestProgressPoint[];

}


// ======================================================
// GET TEST PROGRESS
// ======================================================

export const getStudentTestProgress =
  async (): Promise<TestProgressResponse> => {

    const response =
      await api.get(
        "/student/test-progress"
      );

    return response.data;

  };