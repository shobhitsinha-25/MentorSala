import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock3,
  BookOpen,
  FileQuestion,
  Trophy,
  Play,
  CalendarDays,
} from "lucide-react";

import { startTest } from "../../../../api/studentTestApi";
import type { Test } from "../../../../types/studentTest.types";

interface TestCardProps {
  test: Test;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "CHAPTER":
      return "bg-purple-100 text-purple-700 border-purple-200";

    case "SUBJECT":
      return "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200";

    case "MOCK":
      return "bg-purple-600 text-white border-purple-600";

    case "PYQ":
      return "bg-violet-100 text-violet-700 border-violet-200";

    case "PRACTICE":
      return "bg-purple-50 text-purple-600 border-purple-200";

    default:
      return "bg-purple-50 text-purple-700 border-purple-200";
  }
};

const TestCard = ({ test }: TestCardProps) => {
  const navigate = useNavigate();

  const [starting, setStarting] = useState(false);

  const handleViewDetails = () => {
    navigate(`/student/tests/${test.id}`);
  };

  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10">

      {/* Header */}

      <div className="border-b border-purple-50 bg-gradient-to-br from-purple-50/60 to-transparent p-4 sm:p-5 md:p-6">

        <div className="flex items-start justify-between gap-2.5 sm:gap-3">

          <div className="min-w-0 flex-1">

            <h2 className="line-clamp-1 text-base sm:text-lg md:text-xl font-bold text-slate-900 transition-colors group-hover:text-purple-950">
              {test.title}
            </h2>

            <p className="mt-1 sm:mt-2 line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem] text-xs sm:text-sm text-slate-600">
              {test.description || "No description available."}
            </p>

          </div>

          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold ${getTypeColor(
              test.type
            )}`}
          >
            {test.type}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-5 md:p-6">

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4">

          <div className="flex items-center gap-2 sm:gap-3">

            <Clock3
              size={18}
              className="shrink-0 text-purple-600"
            />

            <div className="min-w-0">

              <p className="text-[11px] sm:text-xs text-slate-500">
                Duration
              </p>

              <p className="truncate text-xs sm:text-sm font-semibold text-slate-900">
                {test.duration} min
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <FileQuestion
              size={18}
              className="shrink-0 text-purple-600"
            />

            <div className="min-w-0">

              <p className="text-[11px] sm:text-xs text-slate-500">
                Questions
              </p>

              <p className="truncate text-xs sm:text-sm font-semibold text-slate-900">
                {test.totalQuestions}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <Trophy
              size={18}
              className="shrink-0 text-purple-600"
            />

            <div className="min-w-0">

              <p className="text-[11px] sm:text-xs text-slate-500">
                Marks
              </p>

              <p className="truncate text-xs sm:text-sm font-semibold text-slate-900">
                {test.totalMarks}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <BookOpen
              size={18}
              className="shrink-0 text-purple-600"
            />

            <div className="min-w-0">

              <p className="text-[11px] sm:text-xs text-slate-500">
                Subject
              </p>

              <p className="truncate text-xs sm:text-sm font-semibold text-slate-900">
                {test.subject?.name ?? "General"}
              </p>

            </div>

          </div>

        </div>

        {/* Date Container: Auto height on mobile to prevent clipping long timestamps; fixed height on tablets & laptops to keep grid cards aligned */}
        <div className="min-h-[3rem] md:h-14 flex items-center">
          {test.startsAt ? (
            <div className="flex w-full items-center gap-2.5 sm:gap-3 rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 sm:px-4 sm:py-2.5">

              <CalendarDays
                size={18}
                className="shrink-0 text-purple-600"
              />

              <div className="min-w-0 flex-1">

                <p className="text-[10px] sm:text-xs text-purple-700/80">
                  Available From
                </p>

                <p className="truncate text-xs sm:text-sm font-medium text-slate-900">
                  {new Date(
                    test.startsAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>
          ) : (
            <div className="hidden md:block h-full w-full" />
          )}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-auto border-t border-purple-50 bg-purple-50/20 p-4 sm:p-5 md:p-6">

        <button
          type="button"
          onClick={handleViewDetails}
          disabled={starting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-base font-semibold text-white shadow-md shadow-purple-600/25 transition hover:bg-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play size={16} className="sm:w-[18px] sm:h-[18px]" />

          {starting
            ? "Starting..."
            : "Start Test"}
        </button>

      </div>

    </div>
  );
};

export default TestCard;