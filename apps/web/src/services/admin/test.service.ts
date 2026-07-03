import api from "../../lib/axios";

// ======================================================
// TYPES
// ======================================================

export interface Test {

  id: string;

  title: string;

  description?: string;

  examType: "JEE" | "WBJEE" | "BOARDS";

  type: "CHAPTER" | "SUBJECT" | "MOCK" | "PYQ" | "PRACTICE";

  duration: number;

  totalMarks: number;

  totalQuestions: number;

  negativeMarks: number;

  instructions?: string;

  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";

  subjectId?: string;

  chapterId?: string;

  subject?: {

    id: string;

    name: string;

  };

  chapter?: {

    id: string;

    title: string;

  };

}

export interface Pagination {

  page: number;

  limit: number;

  total: number;

  pages: number;

}

export interface TestResponse {

  success: boolean;

  tests: Test[];

  pagination: Pagination;

}

export interface AttachQuestion {

  questionId: string;

  displayOrder: number;

}

// ======================================================
// GET TESTS
// ======================================================

export const getTests = async (

  page = 1,

  search = "",

  examType = "",

  type = "",

  status = "",

  subjectId = "",

  chapterId = ""

) => {

  const { data } =
    await api.get<TestResponse>(

      "/admin/tests",

      {

        params: {

          page,

          search,

          examType,

          type,

          status,

          subjectId,

          chapterId,

        },

      }

    );

  return data;

};

// ======================================================
// GET TEST BY ID
// ======================================================

export const getTestById = async (

  testId: string

) => {

  const { data } =
    await api.get(

      `/admin/tests/${testId}`

    );

  return data;

};

// ======================================================
// CREATE TEST
// ======================================================

export const createTest = async (

  payload: any

) => {

  const { data } =
    await api.post(

      "/admin/tests",

      payload

    );

  return data;

};

// ======================================================
// UPDATE TEST
// ======================================================

export const updateTest = async (

  testId: string,

  payload: any

) => {

  const { data } =
    await api.put(

      `/admin/tests/${testId}`,

      payload

    );

  return data;

};

// ======================================================
// DELETE TEST
// ======================================================

export const deleteTest = async (

  testId: string

) => {

  const { data } =
    await api.delete(

      `/admin/tests/${testId}`

    );

  return data;

};

// ======================================================
// GET QUESTIONS OF TEST
// ======================================================

export const getTestQuestions = async (

  testId: string

) => {

  const { data } =
    await api.get(

      `/admin/tests/${testId}/questions`

    );

  return data;

};

// ======================================================
// ATTACH QUESTIONS
// ======================================================

export const attachQuestions = async (

  testId: string,

  questions: AttachQuestion[]

) => {

  const { data } =
    await api.post(

      `/admin/tests/${testId}/questions`,

      {

        questions,

      }

    );

  return data;

};

// ======================================================
// REMOVE QUESTION
// ======================================================

export const removeQuestion = async (

  testId: string,

  questionId: string

) => {

  const { data } =
    await api.delete(

      `/admin/tests/${testId}/questions/${questionId}`

    );

  return data;

};

// ======================================================
// REORDER QUESTIONS
// ======================================================

export const reorderQuestions = async (

  testId: string,

  questions: AttachQuestion[]

) => {

  const { data } =
    await api.put(

      `/admin/tests/${testId}/questions/reorder`,

      {

        questions,

      }

    );

  return data;

};

// ======================================================
// PUBLISH TEST
// ======================================================

export const publishTest = async (

  testId: string

) => {

  const { data } =
    await api.put(

      `/admin/tests/${testId}/publish`

    );

  return data;

};