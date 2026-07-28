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
      return "bg-blue-100/80 text-blue-700 border-blue-200/80";

    case "SUBJECT":
      return "bg-emerald-100/80 text-emerald-700 border-emerald-200/80";

    case "MOCK":
      return "bg-purple-100/80 text-purple-700 border-purple-200/80";

    case "PYQ":
      return "bg-amber-100/80 text-amber-700 border-amber-200/80";

    case "PRACTICE":
      return "bg-cyan-100/80 text-cyan-700 border-cyan-200/80";

    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const TestCard = ({ test }: TestCardProps) => {
  const navigate = useNavigate();

  const [starting, setStarting] = useState(false);

  const handleViewDetails = () => {
    navigate(`/student/tests/${test.id}`);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white  to-[#b3b3ff] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10">

      {/* Header */}

      <div className="border-b border-slate-100 p-6">

        <div className="mb-4 flex items-start justify-between gap-3">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              {test.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm text-slate-500">
              {test.description || "No description available."}
            </p>

          </div>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTypeColor(
              test.type
            )}`}
          >
            {test.type}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-4 p-6">

        <div className="grid grid-cols-2 gap-4">

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-indigo-600"
            />

            <div>

              <p className="text-xs text-slate-500">
                Duration
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {test.duration} min
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <FileQuestion
              size={18}
              className="text-emerald-600"
            />

            <div>

              <p className="text-xs text-slate-500">
                Questions
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {test.totalQuestions}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Trophy
              size={18}
              className="text-amber-500"
            />

            <div>

              <p className="text-xs text-slate-500">
                Marks
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {test.totalMarks}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <BookOpen
              size={18}
              className="text-pink-600"
            />

            <div>

              <p className="text-xs text-slate-500">
                Subject
              </p>

              <p className="text-sm font-semibold text-slate-900">
                {test.subject?.name ?? "General"}
              </p>

            </div>

          </div>

        </div>

        {test.startsAt && (
          <div className="flex items-center gap-3 rounded-xl border border-indigo-100/80 bg-indigo-50/40 px-4 py-3">

            <CalendarDays
              size={18}
              className="text-indigo-600"
            />

            <div>

              <p className="text-xs text-slate-500">
                Available From
              </p>

              <p className="text-sm font-medium text-slate-800">
                {new Date(
                  test.startsAt
                ).toLocaleString()}
              </p>

            </div>

          </div>
        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 p-6">

        <button
          onClick={handleViewDetails}
          disabled={starting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play size={18} />

          {starting
            ? "Starting..."
            : "Start Test"}
        </button>

      </div>

    </div>
  );
};

export default TestCard;