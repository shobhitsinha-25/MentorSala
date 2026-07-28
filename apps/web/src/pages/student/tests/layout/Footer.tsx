import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Flag,
} from "lucide-react";

interface FooterProps {
  currentQuestion: number;
  totalQuestions: number;
  isMarkedForReview: boolean;

  onPrevious: () => void;
  onNext: () => void;
  onClear: () => void;
  onMarkForReview: () => void;
  onSubmit: () => void;
}

const Footer = ({
  currentQuestion,
  totalQuestions,
  isMarkedForReview,
  onPrevious,
  onNext,
  onClear,
  onMarkForReview,
  onSubmit,
}: FooterProps) => {
  return (
    <footer className="w-full border-t border-slate-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        {/* Left Action Group */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onPrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            onClick={onClear}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            Clear Response
          </button>
        </div>

        {/* Right Action Group */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onMarkForReview}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              isMarkedForReview
                ? "border-[#F97316] bg-[#FFF7ED] text-[#EA580C]"
                : "border-[#F97316] bg-white text-[#F97316] hover:bg-[#FFF7ED]"
            }`}
          >
            <Flag size={16} />
            {isMarkedForReview ? "Remove Review" : "Mark for Review"}
          </button>

          <button
            onClick={onNext}
            disabled={currentQuestion === totalQuestions - 1}
            className="flex items-center gap-2 rounded-xl bg-[#6366F1] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#5B21B6] disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            Save & Next
            <ChevronRight size={16} />
          </button>

          <button
            onClick={onSubmit}
            className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-600"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Strip */}
      <div className="bg-[#F8FAFC] py-1.5 px-6 text-center text-xs text-slate-400 border-t border-slate-100">
        <span>Use keyboard shortcuts: </span>
        <span className="font-semibold text-slate-500">A / B / C / D</span> to select options · 
        <span className="font-semibold text-slate-500"> ← →</span> to navigate · 
        <span className="font-semibold text-slate-500"> Enter</span> to save & next
      </div>
    </footer>
  );
};

export default Footer;