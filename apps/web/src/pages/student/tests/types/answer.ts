export interface AnswerState {
  selectedAnswer: string | string[] | number | null;

  markedForReview: boolean;

  visited: boolean;

  timeSpent: number;
}