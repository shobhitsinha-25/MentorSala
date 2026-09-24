import api from "../../../api/axios";

// ======================================================
// TYPES
// ======================================================

export interface DailyProblemQuestion {
  id: string;
  questionType: string;
  question: string;
  questionImageUrl?: string | null;
  options: unknown;
  optionImages?: unknown;
  answer: unknown;
  solution?: string | null;
  solutionImageUrl?: string | null;
  difficulty: string;
  year?: number | null;
  examType: string;
  marks?: number | null;
  negativeMarks?: number | null;
  isPremium: boolean;
  published: boolean;

  subject: {
    id: string;
    name: string;
    examType: string;
  };

  chapter: {
    id: string;
    title: string;
    order: number;
  };
}

export interface QuestionBankResponse {
  success: boolean;
  questions: DailyProblemQuestion[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ======================================================
// DAILY PROBLEM RESPONSE
// ======================================================

export interface DailyProblemResponse {
  success: boolean;
  message?: string;
  dailyProblem?: {
    id: string;
    questionId: string;
    date: string;
    question: DailyProblemQuestion;
  };
}

// ======================================================
// GET EXISTING QUESTION BANK
// ======================================================

export const getQuestionBank = async ({
  search,
  examType,
  subjectId,
  chapterId,
  difficulty,
  questionType,
  page = 1,
  limit = 10,
}: {
  search?: string;
  examType?: string;
  subjectId?: string;
  chapterId?: string;
  difficulty?: string;
  questionType?: string;
  page?: number;
  limit?: number;
}) => {
  const response =
    await api.get<QuestionBankResponse>(
      "/admin/questions",
      {
        params: {
          search,
          examType,
          subjectId,
          chapterId,
          difficulty,
          questionType,
          page,
          limit,
        },
      }
    );

  return response.data;
};

// ======================================================
// SET DAILY PROBLEM
// ======================================================

export const setDailyProblem = async ({
  questionId,
  date,
}: {
  questionId: string;
  date: string;
}) => {
  const response =
    await api.post<DailyProblemResponse>(
      "/admin/daily-problems",
      {
        questionId,
        date,
      }
    );

  return response.data;
};