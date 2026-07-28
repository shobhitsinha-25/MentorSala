import type { Question } from "../types/question";

interface Props {
  question: Question;
}

const QuestionStem = ({ question }: Props) => {
  return (
    <div className="mt-8 space-y-6">
      {question.questionImageUrl && (
        <img
          src={question.questionImageUrl}
          alt="Question"
          className="max-h-72 rounded-lg border"
        />
      )}

      <div className="whitespace-pre-wrap text-lg leading-8 text-slate-800">
        {question.question}
      </div>
    </div>
  );
};

export default QuestionStem;