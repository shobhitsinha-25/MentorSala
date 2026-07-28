import type { Question } from "../types/question";

export type QuestionStatus =
  | "NOT_VISITED"
  | "NOT_ANSWERED"
  | "ANSWERED"
  | "MARKED_FOR_REVIEW";

export const getQuestionStatus = (
  question: Question
): QuestionStatus => {
  const state = question.answerState;

  if (!state.visited) {
    return "NOT_VISITED";
  }

  if (state.markedForReview) {
    return "MARKED_FOR_REVIEW";
  }

  if (state.selectedAnswer) {
    return "ANSWERED";
  }

  return "NOT_ANSWERED";
};