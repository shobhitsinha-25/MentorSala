import QuestionHeader from "./QuestionHeader";
import QuestionStem from "./QuestionStem";
import OptionList from "./OptionList";

import type { Question } from "../types/question";

interface Props {
  question: Question;
  totalQuestions: number;
  selectedAnswer: string | string[] | number | null;
  onSelect: (answer: string | string[] | number) => void;
}

const QuestionCard = ({
  question,
  totalQuestions,
  selectedAnswer,
  onSelect,
}: Props) => {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-8 shadow-sm">
      <QuestionHeader
        question={question}
        totalQuestions={totalQuestions}
      />

      <QuestionStem question={question} />

      <div className="mt-8">
        <OptionList
          question={question}
          selectedAnswer={selectedAnswer}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default QuestionCard;