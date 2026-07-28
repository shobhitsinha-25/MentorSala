import PaletteButton from "../components/PaletteButton";

import type { Question } from "../types/question";

interface RightSidebarProps {
  questions: Question[];
  currentQuestion: number;
  onQuestionSelect: (index: number) => void;
}

const RightSidebar = ({
  questions,
  currentQuestion,
  onQuestionSelect,
}: RightSidebarProps) => {
  return (
    <aside className="flex h-full w-80 flex-col border-l bg-white">
      {/* Header */}
      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Question Palette
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {questions.length} Questions
        </p>
      </div>

      {/* Palette */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
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
      </div>

      {/* Legend */}
     <div className="border-t border-slate-100 bg-white px-5 py-4">
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
    Legend
  </h3>

  <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-medium text-slate-600">
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
      <span>Not Answered</span>
    </div>

    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#CBD5E1]"></span>
      <span>Not Visited</span>
    </div>

    <div className="col-span-2 flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full border-2 border-[#6366F1] bg-white"></span>
      <span>Current Question</span>
    </div>
  </div>
</div>
    </aside>
  );
};

export default RightSidebar;