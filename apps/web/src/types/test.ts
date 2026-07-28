export type QuestionType =
  | "SINGLE_CORRECT"
  | "MULTIPLE_CORRECT"
  | "INTEGER"
  | "NUMERICAL";

export type QuestionStatus =
  | "NOT_VISITED"
  | "VISITED"
  | "ANSWERED"
  | "MARKED"
  | "ANSWERED_MARKED";

export interface QuestionOption {
  text: string;
  imageUrl?: string | null;
}

export interface Question {
  id: string;

  questionType: QuestionType;

  question: string;

  questionImageUrl?: string | null;

  options: QuestionOption[];

  marks?: number;

  negativeMarks?: number;

  solution?: string | null;

  solutionImageUrl?: string | null;
}

export interface PaletteQuestion {
  id: string;

  questionNumber: number;

  status: QuestionStatus;
}