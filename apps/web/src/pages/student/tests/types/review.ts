export type ReviewStatus =
  | "CORRECT"
  | "WRONG"
  | "UNANSWERED";

export interface Subject {
  id: string;
  name: string;
}

export interface Chapter {
  id: string;
  title: string;
}

export interface ReviewQuestion {
  questionNumber: number;
  questionId: string;

  questionType: string;

  question: string;
  questionImageUrl: string | null;

  options: any;
  optionImages: any;

  studentAnswer: any;
  correctAnswer: any;

  status: ReviewStatus;

  marksAwarded: number;
  marks: number;
  negativeMarks: number;

  difficulty: string;

  solution: string | null;
  solutionImageUrl: string | null;

  timeSpent: number;

  markedForReview: boolean;

  subject: Subject;
  chapter: Chapter;
}

export interface Review {
  attemptId: string;

  totalQuestions: number;

  showAnswers: boolean;

  questions: ReviewQuestion[];
}