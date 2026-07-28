import {
  CheckCircle2,
  XCircle,
  Circle,
} from "lucide-react";

import {
  getStatusColor,
} from "../utils/review";

interface Props {
  status:
    | "CORRECT"
    | "WRONG"
    | "UNANSWERED";
}

const QuestionStatusBadge = ({
  status,
}: Props) => {
  const colors =
    getStatusColor(status);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {status === "CORRECT" && (
        <CheckCircle2 size={18} />
      )}

      {status === "WRONG" && (
        <XCircle size={18} />
      )}

      {status === "UNANSWERED" && (
        <Circle size={18} />
      )}

      {status}
    </div>
  );
};

export default QuestionStatusBadge;