import {
  DifficultyLevel,
  ExamType,
  QuestionType,
} from "@prisma/client";

export interface QuestionOption {

  key: string;

  text: string;

}

type BaseCreateQuestionInput = {
  question: string;
  questionImageUrl?: string;
  options: QuestionOption[];
  optionImages?: Record<string, string | null>;
  solution?: string;
  solutionImageUrl?: string;
  difficulty: DifficultyLevel;
  examType: ExamType;
  subjectId: string;
  chapterId: string;
  year?: number;
  marks?: number;
  negativeMarks?: number;
  isPremium?: boolean;
  published?: boolean;
  createdBy: string;
};

export type CreateQuestionInput =
  | (BaseCreateQuestionInput & {
      questionType: "SINGLE_CORRECT";
      answer: string;
    })
  | (BaseCreateQuestionInput & {
      questionType: "MULTIPLE_CORRECT";
      answer: string[];
    })
  | (BaseCreateQuestionInput & {
      questionType: "INTEGER";
      answer: number;
    })
  | (BaseCreateQuestionInput & {
      questionType: "ASSERTION_REASON";
      answer: string;
    });

export interface GetQuestionsInput {

  examType?: string;

  subjectId?: string;

  chapterId?: string;

  difficulty?: string;

  questionType?: string;

  search?: string;

  page?: number;

  limit?: number;

}

export interface UpdateQuestionInput {

  questionId: string;

  questionType: QuestionType;

  question: string;

  questionImageUrl?: string;

  options: QuestionOption[];

  optionImages?: Record<string, string | null>;

  answer: string[];

  solution?: string;

  solutionImageUrl?: string;

  difficulty: DifficultyLevel;

  examType: ExamType;

  subjectId: string;

  chapterId: string;

  year?: number;

  marks?: number;

  negativeMarks?: number;

  isPremium?: boolean;

  published?: boolean;

}