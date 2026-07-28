import {
  Clock3,
  BookOpen,
  Layers,
  Award,
} from "lucide-react";

import type { ReviewQuestion } from "../types/review";
import { formatTime } from "../utils/review";
import QuestionStatusBadge from "./QuestionStatusBadge";
import SolutionCard from "./SolutionCard";

interface Props {
  question: ReviewQuestion;
  showAnswers: boolean;
}

const ReviewQuestionCard = ({
  question,
  showAnswers,
}: Props) => {
  const options =
    Array.isArray(question.options)
      ? question.options
      : [];

  const optionImages =
    question.optionImages &&
    typeof question.optionImages === "object"
      ? question.optionImages
      : {};

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">

        <div>

          <h2 className="text-xl font-extrabold text-slate-900">
            Question {question.questionNumber}
          </h2>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">

            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-100">
              <BookOpen size={14} className="text-[#6366F1]" />
              {question.subject.name}
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-100">
              <Layers size={14} className="text-[#6366F1]" />
              {question.chapter.title}
            </div>

            <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-100">
              <Clock3 size={14} className="text-amber-500" />
              {formatTime(question.timeSpent)}
            </div>

          </div>

        </div>

        <QuestionStatusBadge
          status={question.status}
        />

      </div>

      {/* Question */}

      <div className="mt-6">

        <p className="whitespace-pre-line text-base font-semibold leading-relaxed text-slate-800">
          {question.question}
        </p>

        {question.questionImageUrl && (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
            <img
              src={question.questionImageUrl}
              alt="Question"
              className="max-h-96 rounded-lg object-contain"
            />
          </div>
        )}

      </div>

      {/* Options */}

      <div className="mt-6 space-y-3">

        {options.map(
          (
            option: any,
            index: number
          ) => {

            const key =
              option.key ??
              String.fromCharCode(
                65 + index
              );

            const value =
              option.text ??
              option.value ??
              option;

            const isStudent =
              String(
                question.studentAnswer
              ) === String(key);

            const isCorrect =
              showAnswers &&
              String(
                question.correctAnswer
              ) === String(key);

            return (

              <div
                key={key}
                className={`rounded-xl border p-4 transition-all

                ${
                  isCorrect
                    ? "border-[#22C55E] bg-[#F0FDF4] shadow-sm"
                    : isStudent
                    ? "border-[#EF4444] bg-[#FEF2F2] shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >

                <div className="flex items-start gap-3.5">

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-inner

                    ${
                      isCorrect
                        ? "bg-[#22C55E] text-white"
                        : isStudent
                        ? "bg-[#EF4444] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {key}
                  </div>

                  <div className="flex-1 pt-1">

                    <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-900 font-semibold' : isStudent ? 'text-red-900 font-semibold' : 'text-slate-700'}`}>
                      {value}
                    </p>

                    {optionImages[key] && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white p-1">
                        <img
                          src={optionImages[key]}
                          alt={`Option ${key}`}
                          className="max-h-52 rounded object-contain"
                        />
                      </div>
                    )}

                  </div>

                </div>

              </div>

            );

          }

        )}

      </div>

      {/* Student Summary */}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Your Answer
          </p>

          <p className="mt-1 text-lg font-bold text-slate-800">
            {question.studentAnswer ??
              "Not Answered"}
          </p>

        </div>

        {showAnswers && (

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">

            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Correct Answer
            </p>

            <p className="mt-1 text-lg font-bold text-[#22C55E]">
              {String(
                question.correctAnswer
              )}
            </p>

          </div>

        )}

        <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">

          <div className="flex items-center gap-1.5 text-[#6366F1]">

            <Award size={16} />

            <span className="text-xs font-semibold uppercase tracking-wider">
              Marks Awarded
            </span>

          </div>

          <p className="mt-1 text-xl font-extrabold text-indigo-900">
            {question.marksAwarded > 0
              ? `+${question.marksAwarded}`
              : question.marksAwarded}
          </p>

        </div>

      </div>

      {/* Solution */}

      <SolutionCard
        showAnswers={showAnswers}
        correctAnswer={
          question.correctAnswer
        }
        solution={
          question.solution
        }
        solutionImageUrl={
          question.solutionImageUrl
        }
      />

    </div>
  );
};

export default ReviewQuestionCard;