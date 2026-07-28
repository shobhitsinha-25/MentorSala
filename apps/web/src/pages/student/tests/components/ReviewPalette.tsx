import type { ReviewQuestion } from "../types/review";

interface Props {
  questions: ReviewQuestion[];
  currentQuestion: number;
  onSelect: (index: number) => void;
}

const getColor = (status: string) => {
  switch (status) {
    case "CORRECT":
      return "bg-[#22C55E] text-white hover:bg-[#16A34A]";

    case "WRONG":
      return "bg-[#EF4444] text-white hover:bg-[#DC2626]";

    default:
      return "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]";
  }
};

const ReviewPalette = ({
  questions,
  currentQuestion,
  onSelect,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-base font-bold text-slate-800">
        Question Palette
      </h3>

      <div className="grid grid-cols-5 gap-3">

        {questions.map((question, index) => (

          <button
            key={question.questionId}
            onClick={() => onSelect(index)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150
              ${getColor(question.status)}
              ${
                currentQuestion === index
                  ? "ring-2 ring-[#6366F1] ring-offset-2 scale-105 shadow-sm"
                  : ""
              }`}
          >
            {question.questionNumber}
          </button>

        ))}

      </div>

      {/* Review Status Legend */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="grid grid-cols-2 gap-y-2.5 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]"></span>
            <span>Correct</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]"></span>
            <span>Wrong</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]"></span>
            <span>Unanswered</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#6366F1] bg-white"></span>
            <span>Current</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReviewPalette;