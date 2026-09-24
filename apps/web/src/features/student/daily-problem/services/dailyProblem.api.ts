import api from "../../../../lib/axios";

export interface DailyProblemOption {
  key: string;
  text: string;
}

export interface StudentDailyProblemQuestion {
  id: string;
  questionType: string;
  question: string;
  questionImageUrl?: string | null;
  options: DailyProblemOption[];
  optionImages?: Record<string, string> | null;
  solution?: string | null;
  solutionImageUrl?: string | null;
  difficulty: string;
  year?: number | null;
  examType: string;
  marks?: number | null;
  negativeMarks?: number | null;
  isPremium: boolean;
  published: boolean;

  subjectId: string;
  chapterId: string;

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

export interface StudentDailyProblem {
  id: string;
  date: string;
  question: StudentDailyProblemQuestion;
}

interface DailyProblemResponse {
  success: boolean;
  dailyProblem: StudentDailyProblem | null;
}

interface VerifyDailyProblemResponse {
  success: boolean;
  correct: boolean;
  alreadySolved: boolean;
  message: string;

  // XP reward information
  xpAwarded: number;

  user?: {
    xp: number;
    streak: number;
    level: string;
  };
}

export const getTodayDailyProblem = async () => {
  const response = await api.get<DailyProblemResponse>(
    "/student/daily-problem"
  );

  return response.data;
};

export const verifyDailyProblem = async ({
  dailyProblemId,
  answer,
}: {
  dailyProblemId: string;
  answer: string | string[];
}) => {
  const response = await api.post<VerifyDailyProblemResponse>(
    "/student/daily-problem/verify",
    {
      dailyProblemId,
      answer,
    }
  );

  return response.data;
};