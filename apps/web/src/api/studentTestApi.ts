import api from "./axios";

import type {

  GetTestsResponse,

} from "../types/studentTest.types";

// ======================================================
// GET TESTS
// ======================================================

export const getTests = async (

  params?: {

    page?: number;

    limit?: number;

    search?: string;

    examType?: string;

    type?: string;

    subjectId?: string;

    chapterId?: string;

  }

): Promise<GetTestsResponse> => {
  const queryParams: Record<string, string | number> = {};

if (params?.page)
  queryParams.page = params.page;

if (params?.limit)
  queryParams.limit = params.limit;

if (params?.search?.trim())
  queryParams.search = params.search;

if (params?.examType)
  queryParams.examType = params.examType;

if (params?.type)
  queryParams.type = params.type;

if (params?.subjectId)
  queryParams.subjectId = params.subjectId;

if (params?.chapterId)
  queryParams.chapterId = params.chapterId;

const { data } = await api.get("/student/tests", {
  params: queryParams,
});

return data;

};

// ======================================================
// GET TEST DETAILS
// ======================================================

export const getTestDetails = async (

  testId: string

) => {

  const { data } =
    await api.get(

      `/student/tests/${testId}`

    );

  return data;

};

// ======================================================
// START TEST
// ======================================================

export const startTest = async (

  testId: string

) => {

  const { data } =
    await api.post(

      `/student/tests/${testId}/start`

    );

  return data;

};

// ======================================================
// LOAD ATTEMPT
// ======================================================

export const getAttempt = async (

  attemptId: string

) => {

  const { data } =
    await api.get(

      `/student/tests/attempt/${attemptId}`

    );

  return data;

};

export interface StudentSubject {
  id: string;
  name: string;
  slug: string;
}

export interface StudentChapter {
  id: string;
  title: string;
}

export const getStudentSubjects = async () => {
  const { data } = await api.get("/student/tests/subjects");
  return data;
};

export const getStudentChapters = async (subjectId: string) => {
  const { data } = await api.get(
    `/student/tests/subjects/${subjectId}/chapters`
  );
  return data;
};