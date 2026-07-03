import {
  DifficultyLevel,
  ExamType,
  QuestionType,
} from "@prisma/client";

export interface QuestionOption {

  key: string;

  text: string;

}

export interface CreateQuestionInput {

  questionType: QuestionType;

  question: string;

  // Cloudinary URL
  questionImageUrl?: string;

  options: QuestionOption[];

  // Option image URLs
  optionImages?: Record<string, string | null>;

  // JSON answer
  answer: string[];

  solution?: string;

  // Cloudinary URL
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

}

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