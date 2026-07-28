import { createContext } from "react";

import type { Exam } from "../types/exam";

export interface ExamContextType {
  // State
  exam: Exam | null;

  currentQuestion: number;

  currentSubject: string;

  // State setters
  setExam: React.Dispatch<
    React.SetStateAction<Exam | null>
  >;

  setCurrentQuestion: React.Dispatch<
    React.SetStateAction<number>
  >;

  setCurrentSubject: React.Dispatch<
    React.SetStateAction<string>
  >;

  // Navigation
  goToQuestion: (index: number) => void;

  // Question actions
  selectAnswer: (answer: string) => void;

  clearResponse: () => void;

  markForReview: () => void;

  nextQuestion: () => void;

  previousQuestion: () => void;
}

export const ExamContext =
  createContext({} as ExamContextType);