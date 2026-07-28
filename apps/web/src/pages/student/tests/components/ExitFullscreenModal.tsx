interface ExitFullScreenModalProps {
  open: boolean;
  warningCount: number;
  maxWarnings: number;
  onContinue: () => void;
}

export default function ExitFullScreenModal({
  open,
  warningCount,
  maxWarnings,
  onContinue,
}: ExitFullScreenModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
      <div className="w-[420px] rounded-xl bg-white p-8 shadow-xl">

        <h2 className="text-xl font-bold text-red-600">
          Security Warning
        </h2>

        <p className="mt-4 text-gray-700">
          You have exited fullscreen mode.
        </p>

        <p className="mt-2 text-gray-700">
          Violations:
          <span className="font-semibold text-red-600">
            {" "}
            {warningCount} / {maxWarnings}
          </span>
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Please return to fullscreen to continue your exam.
          Repeated violations will automatically submit your
          test.
        </p>

        <button
          onClick={onContinue}
          className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Return to Exam
        </button>

      </div>
    </div>
  );
}