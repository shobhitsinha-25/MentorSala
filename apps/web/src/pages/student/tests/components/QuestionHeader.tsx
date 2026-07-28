import type { Question } from "../types/question";

interface QuestionHeaderProps {
  question: Question;
  totalQuestions: number;
}

const QuestionHeader = ({
  question,
  totalQuestions,
}: QuestionHeaderProps) => {
  return (
    <div className="border-b border-slate-200 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Question {question.questionNumber}
        </h2>

        <div className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {question.questionNumber} / {totalQuestions}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded bg-indigo-100 px-3 py-1 font-medium text-indigo-700">
          {question.questionType.replace("_", " ")}
        </span>

        <span className="rounded bg-green-100 px-3 py-1 font-medium text-green-700">
          +{question.marks}
        </span>

        <span className="rounded bg-red-100 px-3 py-1 font-medium text-red-700">
          -{question.negativeMarks}
        </span>

        <span className="rounded bg-slate-100 px-3 py-1 text-slate-600">
          {question.difficulty}
        </span>
      </div>
    </div>
  );
};

export default QuestionHeader;