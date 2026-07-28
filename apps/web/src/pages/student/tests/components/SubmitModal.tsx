import React from "react";

interface SubmitModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answered: number;
  notAnswered: number;
  markedForReview: number;
  notVisited: number;
  onClose: () => void;
  onSubmit: () => void;
}

const SubmitModal = ({
  isOpen,
  totalQuestions,
  answered,
  notAnswered,
  markedForReview,
  notVisited,
  onClose,
  onSubmit,
}: SubmitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="rounded-t-xl border-b bg-slate-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Submit Test
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          <p className="text-gray-700">
            Are you sure you want to submit your test?
            Once submitted, you cannot change your answers.
          </p>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">
                    Total Questions
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {totalQuestions}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 text-green-700">
                    Answered
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">
                    {answered}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 text-red-600">
                    Not Answered
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-red-600">
                    {notAnswered}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 text-purple-700">
                    Marked for Review
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-purple-700">
                    {markedForReview}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 text-gray-600">
                    Not Visited
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-600">
                    {notVisited}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              Please review your answers before submitting. This action
              cannot be undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;