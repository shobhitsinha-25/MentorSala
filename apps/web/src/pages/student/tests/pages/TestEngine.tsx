import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ExamLayout from "../layout/ExamLayout";
import QuestionCard from "../components/QuestionCard";
import SubmitModal from "../components/SubmitModal";
import {
  saveAnswer,
  markForReview,
} from "../../../../api/studentTestApi";
import {
  getAttempt,
  submitTest,
} from "../../../../api/studentTestApi";

import type { Exam } from "../types/exam";
import type { Question } from "../types/question";

import SecurityGuard from "../components/SecurityGuard";

const TestEngine = () => {
  const navigate = useNavigate();
  const { attemptId } = useParams();

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // ==========================================
  // AUTO SUBMIT
  // ==========================================

  const handleSubmitTest = async () => {
    if (!attemptId) return;

    try {
      await submitTest(attemptId);

      navigate(
        `/student/tests/attempts/${attemptId}/result`
      );
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleTimeUp = () => {
    handleSubmitTest();
  };

  // ==========================================
  // LOAD ATTEMPT
  // ==========================================

  useEffect(() => {
    const loadAttempt = async () => {
      if (!attemptId) return;

      try {
        setLoading(true);

        const res = await getAttempt(attemptId);

        const attempt: Exam = {
          ...res.attempt,
          questions: res.attempt.questions.map(
            (question: Question, index: number) =>
              index === 0
                ? {
                    ...question,
                    answerState: {
                      ...question.answerState,
                      visited: true,
                    },
                  }
                : question
          ),
        };

        setExam(attempt);
      } catch (error) {
        console.error(
          "Failed to load attempt:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [attemptId]);

  // ==========================================
  // LOADING UI
  // ==========================================

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6366F1] border-t-transparent"></div>
          <p className="text-lg font-semibold text-[#2A0080]">
            Loading Exam...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR UI
  // ==========================================

  if (!exam) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-red-100 text-center">
          <p className="font-semibold text-red-600">
            Unable to load exam.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#5B21B6] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion =
    exam.questions[currentQuestionIndex];

  const answered = exam.questions.filter(
    (q) => q.answerState.selectedAnswer
  ).length;

  const markedForReview = exam.questions.filter(
    (q) => q.answerState.markedForReview
  ).length;

  const notVisited = exam.questions.filter(
    (q) => !q.answerState.visited
  ).length;

  const notAnswered = exam.questions.filter(
    (q) =>
      q.answerState.visited &&
      !q.answerState.selectedAnswer &&
      !q.answerState.markedForReview
  ).length;

  // ==========================================
  // UPDATE ANSWER
  // ==========================================

  const handleAnswerSelect = async (
    answer: string | string[] | number
  ) => {
    // Update UI immediately
    setExam((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        questions: prev.questions.map((question) =>
          question.id === currentQuestion.id
            ? {
                ...question,
                answerState: {
                  ...question.answerState,
                  selectedAnswer: answer,
                },
              }
            : question
        ),
      };
    });

    try {
      await saveAnswer(
        exam.id,
        currentQuestion.id,
        answer,
        0 // Replace with actual time spent later
      );
    } catch (error) {
      console.error("Failed to save answer:", error);
    }
  };

  // ==========================================
  // GO TO QUESTION
  // ==========================================

  const goToQuestion = (index: number) => {
    setExam((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        questions: prev.questions.map(
          (question, questionIndex) =>
            questionIndex === index
              ? {
                  ...question,
                  answerState: {
                    ...question.answerState,
                    visited: true,
                  },
                }
              : question
        ),
      };
    });

    setCurrentQuestionIndex(index);
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handlePrevious = () => {
    goToQuestion(
      Math.max(currentQuestionIndex - 1, 0)
    );
  };

  const handleNext = () => {
    goToQuestion(
      Math.min(
        currentQuestionIndex + 1,
        exam.questions.length - 1
      )
    );
  };

  // ==========================================
  // CLEAR RESPONSE
  // ==========================================

  const handleClearResponse = async () => {
    // Update UI immediately
    setExam((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        questions: prev.questions.map((question) =>
          question.id === currentQuestion.id
            ? {
                ...question,
                answerState: {
                  ...question.answerState,
                  selectedAnswer: null,
                },
              }
            : question
        ),
      };
    });

    try {
      await saveAnswer(
        exam.id,
        currentQuestion.id,
        null,
        0
      );
    } catch (error) {
      console.error("Failed to clear response:", error);
    }
  };

  // ==========================================
  // MARK FOR REVIEW
  // ==========================================

  const handleMarkForReview = async () => {
    const newReviewState =
      !currentQuestion.answerState.markedForReview;

    // Update UI immediately
    setExam((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        questions: prev.questions.map((question) =>
          question.id === currentQuestion.id
            ? {
                ...question,
                answerState: {
                  ...question.answerState,
                  markedForReview: newReviewState,
                },
              }
            : question
        ),
      };
    });

    try {
      await markForReview(
        exam.id,
        currentQuestion.id,
        newReviewState
      );

      // Only go to the next question when marking for review
      if (newReviewState) {
        handleNext();
      }
    } catch (error) {
      console.error(
        "Failed to update review status:",
        error
      );
    }
  };

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <SecurityGuard
        enabled
        maxViolations={3}
        onAutoSubmit={handleSubmitTest}
      />

      <ExamLayout
        exam={exam}
        onTimeUp={handleTimeUp}
        currentQuestion={currentQuestionIndex}
        onSubjectChange={goToQuestion}
        totalQuestions={exam.questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onClear={handleClearResponse}
        onMarkForReview={handleMarkForReview}
        onQuestionSelect={goToQuestion}
        onSubmit={() => setShowSubmitModal(true)}
        isMarkedForReview={
          currentQuestion.answerState.markedForReview
        }
      >
        <QuestionCard
          question={currentQuestion}
          totalQuestions={exam.questions.length}
          selectedAnswer={
            currentQuestion.answerState.selectedAnswer
          }
          onSelect={handleAnswerSelect}
        />
      </ExamLayout>

      <SubmitModal
        isOpen={showSubmitModal}
        totalQuestions={exam.questions.length}
        answered={answered}
        notAnswered={notAnswered}
        markedForReview={markedForReview}
        notVisited={notVisited}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={handleSubmitTest}
      />
    </div>
  );
};

export default TestEngine;