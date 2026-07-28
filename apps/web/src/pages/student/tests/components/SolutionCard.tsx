import { Lightbulb } from "lucide-react";

interface SolutionCardProps {
  showAnswers: boolean;
  correctAnswer: any;
  solution: string | null;
  solutionImageUrl: string | null;
}

const SolutionCard = ({
  showAnswers,
  correctAnswer,
  solution,
  solutionImageUrl,
}: SolutionCardProps) => {
  if (!showAnswers) return null;

  return (
    <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]/50 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6366F1]/10 text-[#6366F1]">
          <Lightbulb size={20} className="text-[#6366F1]" />
        </div>
        <h3 className="text-base font-bold text-[#2A0080]">
          Solution & Insights
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Correct Answer
          </p>

          <p className="mt-1 text-lg font-bold text-[#22C55E]">
            {String(correctAnswer)}
          </p>
        </div>

        {solution && (
          <div className="rounded-xl border border-purple-100/60 bg-white/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Explanation
            </p>

            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">
              {solution}
            </p>
          </div>
        )}

        {solutionImageUrl && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
            <img
              src={solutionImageUrl}
              alt="Solution"
              className="max-h-96 w-full rounded-lg object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionCard;