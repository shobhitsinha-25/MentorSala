import type { Question } from "./test";

export interface AnswerState {
  selectedAnswer: any;

  markedForReview: boolean;

  visited: boolean;

  timeSpent: number;
}

export interface AttemptQuestion extends Question {
  answerState: AnswerState;
}

export interface TestInfo {
  id: string;

  title: string;

  duration: number;

  totalMarks: number;

  totalQuestions: number;

  negativeMarks: number;
}

export interface TestAttempt {
  id: string;

  status: string;

  startedAt: string;

  expiresAt: string;

  remainingTime: number;

  test: TestInfo;

  questions: AttemptQuestion[];
}