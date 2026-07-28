import { getQuestionStatus } from "../utils/questionStatus";
import type { Question } from "../types/question";

interface Props {
  question: Question;
  number: number;
  active: boolean;
  onClick: () => void;
}

const PaletteButton = ({
  question,
  number,
  active,
  onClick,
}: Props) => {
  const status = getQuestionStatus(question);

  const colours = {
    NOT_VISITED: "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]",
    NOT_ANSWERED: "bg-[#EF4444] text-white hover:bg-[#DC2626]",
    ANSWERED: "bg-[#22C55E] text-white hover:bg-[#16A34A]",
    MARKED_FOR_REVIEW: "bg-[#F97316] text-white hover:bg-[#EA580C]",
  };

  return (
    <button
      onClick={onClick}
      className={`
        h-10
        w-10
        rounded-lg
        text-sm
        font-medium
        transition-all
        duration-150
        flex
        items-center
        justify-center
        ${colours[status]}
        ${active ? "ring-2 ring-[#6366F1] ring-offset-2 shadow-sm scale-105" : ""}
      `}
    >
      {number}
    </button>
  );
};

export default PaletteButton;