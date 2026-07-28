import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getReview } from "../../../../api/studentTestApi";

import ReviewHeader from "../components/ReviewHeader";
import ReviewPalette from "../components/ReviewPalette";
import ReviewQuestionCard from "../components/ReviewQuestionCard";

import type { Review as ReviewData } from "../types/review";

const Review = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [review, setReview] =
    useState<ReviewData | null>(null);

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  useEffect(() => {
    const loadReview = async () => {
      if (!attemptId) return;

      try {
        setLoading(true);

        const res =
          await getReview(attemptId);

        setReview(res.review);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadReview();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6366F1] border-t-transparent"></div>
          <p className="text-lg font-semibold text-[#2A0080]">
            Loading Review...
          </p>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-red-100 text-center">
          <p className="font-semibold text-red-600">
            Review not found.
          </p>
          <button
            onClick={() => navigate("/student/tests")}
            className="mt-4 px-4 py-2 bg-[#6366F1] text-white rounded-xl text-sm font-medium hover:bg-[#5B21B6] transition"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  const question =
    review.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">

      <div className="mx-auto max-w-7xl p-6">

        {/* Header */}

        <ReviewHeader review={review} />

        {/* Body */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* Left */}

          <div className="space-y-6">

            <ReviewQuestionCard
              question={question}
              showAnswers={
                review.showAnswers
              }
            />

            {/* Navigation */}

            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">

              <button
                disabled={
                  currentQuestion === 0
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="rounded-full bg-purple-50 px-4 py-1 text-xs font-bold text-[#6366F1] border border-purple-100/60">

                Question{" "}

                {currentQuestion + 1}

                {" / "}

                {review.totalQuestions}

              </span>

              <button
                disabled={
                  currentQuestion ===
                  review.totalQuestions -
                    1
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion + 1
                  )
                }
                className="flex items-center gap-2 rounded-xl bg-[#6366F1] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:bg-indigo-300"
              >
                Next

                <ChevronRight size={16} />
              </button>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <ReviewPalette
              questions={review.questions}
              currentQuestion={
                currentQuestion
              }
              onSelect={
                setCurrentQuestion
              }
            />

            <button
              onClick={() =>
                navigate(
                  `/student/tests/attempts/${attemptId}/result`
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Back to Result
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Review;