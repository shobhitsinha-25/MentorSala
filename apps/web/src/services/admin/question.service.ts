import api from "../../lib/axios";

export interface QuestionOption {

  key: string;

  text: string;

}

export interface Question {

  id: string;

  questionType:
    | "SINGLE_CORRECT"
    | "MULTIPLE_CORRECT"
    | "INTEGER"
    | "ASSERTION_REASON";

  question: string;

  questionImageUrl?: string;

  options: QuestionOption[];

  optionImages?: Record<string, string>;

  answer: string[];

  solution?: string;

  solutionImageUrl?: string;

  difficulty:
    | "EASY"
    | "MEDIUM"
    | "HARD";

  examType:
    | "JEE"
    | "WBJEE"
    | "BOARDS";

  year?: number;

  marks?: number;

  negativeMarks?: number;

  isPremium: boolean;

  published: boolean;

  createdAt: string;

  updatedAt: string;

  subject: {

    id: string;

    name: string;

  };

  chapter: {

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

export interface QuestionResponse {

  success: boolean;

  questions: Question[];

  pagination: Pagination;

}

export const getQuestions = async (

  page = 1,

  search = "",

  examType = "",

  subjectId = "",

  chapterId = "",

  difficulty = "",

  questionType = ""

) => {

  const { data } =
    await api.get<QuestionResponse>(
      "/admin/questions",
      {

        params: {

          page,

          search,

          examType,

          subjectId,

          chapterId,

          difficulty,

          questionType,

        },

      }
    );

  return data;

};

export const getQuestionById =
async (

  id: string

) => {

  const { data } =
    await api.get(

      `/admin/questions/${id}`

    );

  return data;

};

export const createQuestion =
async (

  payload: any

) => {

  const { data } =
    await api.post(

      "/admin/questions",

      payload

    );

  return data;

};

export const updateQuestion =
async (

  id: string,

  payload: any

) => {

  const { data } =
    await api.put(

      `/admin/questions/${id}`,

      payload

    );

  return data;

};

export const deleteQuestion =
async (

  id: string

) => {

  const { data } =
    await api.delete(

      `/admin/questions/${id}`

    );

  return data;

};