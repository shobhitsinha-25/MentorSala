import type { Question } from "../types/question";

interface Props {
  question: Question;
  selectedAnswer: string | string[] | number | null;
  onSelect: (answer: string | string[] | number) => void;
}

const OptionList = ({
  question,
  selectedAnswer,
  onSelect,
}: Props) => {
  switch (question.questionType) {
    // ======================================
    // SINGLE CORRECT
    // ======================================

    case "SINGLE_CORRECT":
      return (
        <div className="mt-8 space-y-4">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.key;

            return (
              <label
                key={option.key}
                className={`flex cursor-pointer items-start rounded-xl border p-4 transition-all duration-200 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={isSelected}
                  onChange={() => onSelect(option.key)}
                  className="mt-1"
                />

                <div className="ml-4 flex flex-1">
                  <span className="mr-4 min-w-8 font-semibold">
                    ({option.key})
                  </span>

                  <span>{option.text}</span>
                </div>
              </label>
            );
          })}
        </div>
      );

    // ======================================
    // MULTIPLE CORRECT
    // ======================================

    case "MULTIPLE_CORRECT":
      return (
        <div className="mt-8 space-y-4">
          {question.options.map((option) => {
            const selected =
              Array.isArray(selectedAnswer) &&
              selectedAnswer.includes(option.key);

            return (
              <label
                key={option.key}
                className={`flex cursor-pointer items-start rounded-xl border p-4 transition-all duration-200 ${
                  selected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => {
                    const current = Array.isArray(selectedAnswer)
                      ? selectedAnswer
                      : [];

                    if (selected) {
                      onSelect(
                        current.filter(
                          (x) => x !== option.key
                        )
                      );
                    } else {
                      onSelect([
                        ...current,
                        option.key,
                      ]);
                    }
                  }}
                  className="mt-1"
                />

                <div className="ml-4 flex flex-1">
                  <span className="mr-4 min-w-8 font-semibold">
                    ({option.key})
                  </span>

                  <span>{option.text}</span>
                </div>
              </label>
            );
          })}
        </div>
      );

    // ======================================
    // INTEGER
    // ======================================

    case "INTEGER":
      return (
        <div className="mt-8">
          <input
            type="number"
            value={selectedAnswer ?? ""}
            onChange={(e) =>
              onSelect(Number(e.target.value))
            }
            placeholder="Enter your answer"
            className="w-full rounded-lg border p-3"
          />
        </div>
      );

    // ======================================
    // ASSERTION REASON
    // ======================================

    case "ASSERTION_REASON":
      return (
        <div className="mt-8 space-y-4">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.key;

            return (
              <label
                key={option.key}
                className={`flex cursor-pointer items-start rounded-xl border p-4 transition-all duration-200 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-300 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={() => onSelect(option.key)}
                  className="mt-1"
                />

                <div className="ml-4 flex flex-1">
                  <span className="mr-4 min-w-8 font-semibold">
                    ({option.key})
                  </span>

                  <span>{option.text}</span>
                </div>
              </label>
            );
          })}
        </div>
      );

    default:
      return null;
  }
};

export default OptionList;