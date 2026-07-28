import type { Question } from "./question";

export interface Exam {
  id: string;

  status: "IN_PROGRESS";

  startedAt: string;

  expiresAt: string;

  remainingTime: number;

  test: TestInfo;

  subjects: Subject[];

  questions: Question[];
}

export interface TestInfo {
  id: string;

  title: string;

  type: string;

  examType: string;

  duration: number;

  totalMarks: number;

  totalQuestions: number;

  negativeMarks: number;
}

export interface Subject {
  id: string;

  name: string;
}