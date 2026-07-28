import {
  CheckCircle2,
  XCircle,
  Circle,
} from "lucide-react";

import type { Review } from "../types/review";

interface Props {
  review: Review;
}

const ReviewHeader = ({
  review,
}: Props) => {

  const correct =
    review.questions.filter(
      q => q.status === "CORRECT"
    ).length;

  const wrong =
    review.questions.filter(
      q => q.status === "WRONG"
    ).length;

  const unanswered =
    review.questions.filter(
      q => q.status === "UNANSWERED"
    ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-[#2A0080] via-[#3B0764] to-[#1E005A] p-6 text-white">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Test Review
        </h1>

        <p className="mt-1 text-sm text-purple-200/80">
          Review every question and understand your performance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 bg-white p-5">

        <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-2 text-[#22C55E]">
          <CheckCircle2 size={18} />
          <span className="text-sm font-bold text-emerald-700">
            {correct} Correct
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50/60 px-4 py-2 text-[#EF4444]">
          <XCircle size={18} />
          <span className="text-sm font-bold text-red-700">
            {wrong} Wrong
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2 text-slate-500">
          <Circle size={18} />
          <span className="text-sm font-bold text-slate-700">
            {unanswered} Unanswered
          </span>
        </div>

      </div>
    </div>
  );
};

export default ReviewHeader;