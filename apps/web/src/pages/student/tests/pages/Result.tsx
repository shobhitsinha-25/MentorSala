import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Circle,
  Trophy,
  Clock3,
  Eye,
  ArrowLeft,
  Target,
} from "lucide-react";

import { getResult } from "../../../../api/studentTestApi";

interface ResultData {
  attemptId: string;
  score: number;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;

  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;

  totalQuestions: number;

  timeTaken: number;
  submittedAt: string;

  test: {
    id: string;
    title: string;
    duration: number;
    examType: string;
    type: string;
  };
}

const Result = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      if (!attemptId) return;

      try {
        setLoading(true);

        const res = await getResult(attemptId);

        setResult(res.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#6366F1] border-t-transparent"></div>
          <p className="text-lg font-semibold text-[#2A0080]">
            Loading Result...
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-red-100 text-center">
          <p className="font-semibold text-red-600">
            Unable to load result.
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

  const attempted =
    result.correctAnswers + result.wrongAnswers;

  const accuracy =
    attempted === 0
      ? 0
      : (
          (result.correctAnswers / attempted) *
          100
        ).toFixed(2);

  const hours = Math.floor(result.timeTaken / 3600);
  const minutes = Math.floor((result.timeTaken % 3600) / 60);
  const seconds = result.timeTaken % 60;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 font-sans text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6 px-4">

        {/* Header */}
        <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-[#2A0080] via-[#3B0764] to-[#1E005A] p-8 text-white">
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 shadow-inner">
                <Trophy size={36} />
              </div>

              <div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Test Completed
                </span>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
                  Test Submitted Successfully
                </h1>
                <p className="mt-1 text-purple-200/80 text-sm">
                  Your performance report and analytics have been generated.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">
              {result.test.title}
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-[#6366F1] border border-indigo-100">
                {result.test.examType}
              </span>

              <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                {result.test.type}
              </span>
            </div>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Score
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#6366F1]">
              {result.obtainedMarks}{" "}
              <span className="text-base font-medium text-slate-400">
                / {result.totalMarks}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Percentage
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#22C55E]">
              {result.percentage.toFixed(2)}%
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Attempted
            </p>
            <p className="mt-3 text-3xl font-extrabold text-purple-600">
              {attempted}{" "}
              <span className="text-base font-medium text-slate-400">
                / {result.totalQuestions}
              </span>
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Accuracy
            </p>
            <p className="mt-3 text-3xl font-extrabold text-[#F97316]">
              {accuracy}%
            </p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 flex items-center gap-2.5 text-lg font-bold text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#6366F1]">
              <Target size={20} />
            </div>
            Performance Summary
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5 text-center transition hover:bg-emerald-50">
              <CheckCircle2
                className="mx-auto mb-2 text-[#22C55E]"
                size={26}
              />
              <p className="text-3xl font-extrabold text-emerald-700">
                {result.correctAnswers}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Correct
              </p>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50/50 p-5 text-center transition hover:bg-red-50">
              <XCircle
                className="mx-auto mb-2 text-[#EF4444]"
                size={26}
              />
              <p className="text-3xl font-extrabold text-red-700">
                {result.wrongAnswers}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                Incorrect
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-center transition hover:bg-slate-100/70">
              <Circle
                className="mx-auto mb-2 text-slate-400"
                size={26}
              />
              <p className="text-3xl font-extrabold text-slate-700">
                {result.unanswered}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Unanswered
              </p>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-5 text-center transition hover:bg-indigo-50">
              <Clock3
                className="mx-auto mb-2 text-[#6366F1]"
                size={26}
              />
              <p className="text-xl font-extrabold text-indigo-900 leading-8">
                {hours > 0 ? `${hours}h ` : ""}{minutes}m {seconds}s
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Time Taken
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={() =>
              navigate("/student/tests")
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to Tests
          </button>

          <button
            onClick={() =>
              navigate(
                `/student/tests/attempts/${attemptId}/review`
              )
            }
            className="flex items-center gap-2 rounded-xl bg-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5B21B6]"
          >
            <Eye size={16} />
            Review Answers
          </button>
        </div>

      </div>
    </div>
  );
};

export default Result;