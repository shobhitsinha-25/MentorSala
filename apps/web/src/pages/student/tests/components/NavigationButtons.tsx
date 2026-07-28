import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Flag,
} from "lucide-react";

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  isMarkedForReview: boolean;

  onPrevious: () => void;
  onNext: () => void;
  onClear: () => void;
  onMarkForReview: () => void;
}

const NavigationButtons = ({
  currentQuestion,
  totalQuestions,
  isMarkedForReview,

  onPrevious,
  onNext,
  onClear,
  onMarkForReview,
}: NavigationButtonsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4">
      <div className="flex gap-3">
        <button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-5 py-2 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-5 py-2 font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <RotateCcw size={18} />
          Clear Response
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onMarkForReview}
          className={`flex items-center gap-2 rounded-lg px-5 py-2 font-medium text-white shadow-sm transition-colors ${
            isMarkedForReview
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          <Flag size={18} />
          {isMarkedForReview
            ? "Remove Review"
            : "Mark for Review"}
        </button>

        <button
          onClick={onNext}
          disabled={currentQuestion === totalQuestions - 1}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:shadow-none"
        >
          Save & Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default NavigationButtons;