import PaletteButton from "./PaletteButton";

import type { Question } from "../types/question";

interface PaletteProps {
  questions: Question[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
}

const Palette = ({
  questions,
  currentQuestion,
  onQuestionSelect,
}: PaletteProps) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Question Palette</h3>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {questions.map((question, index) => (
          <PaletteButton
            key={question.id}
            question={question}
            number={index + 1}
            active={currentQuestion === index}
            onClick={() => onQuestionSelect(index)}
          />
        ))}
      </div>

      {/* Legend Footer matching MentorSala UI */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="grid grid-cols-2 gap-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]"></span>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]"></span>
            <span>Marked for Review</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]"></span>
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]"></span>
            <span>Not Visited</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palette;