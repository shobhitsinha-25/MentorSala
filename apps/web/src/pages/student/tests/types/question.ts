import type { AnswerState } from "./answer";

export interface QuestionOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface Question {
  id: string;

  questionNumber: number;

  questionType: string;

  question: string;

  questionImageUrl?: string | null;

  options: QuestionOption[];

  optionImages?: string[] | null;

  difficulty: string;

  marks: number;

  negativeMarks: number;

  subjectId: string;

  subject: string;

  chapterId: string;

  answerState: AnswerState;
}