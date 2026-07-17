import { Clock, BookOpen, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Test } from "../../../../types/studentTest.types";

interface TestCardProps {
  test: Test;
}

const TestCard = ({ test }: TestCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between">

      {/* Header */}
      <div>

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-gray-900">

              {test.title}

            </h2>

            {test.description && (

              <p className="text-sm text-gray-500 mt-1">

                {test.description}

              </p>

            )}

          </div>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">

            {test.examType}

          </span>

        </div>

        {/* Type */}

        <div className="mt-4">

          <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">

            {test.type}
          </span>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="flex flex-col items-center">

            <Clock className="w-5 h-5 text-indigo-600" />

            <span className="text-sm text-gray-600 mt-1">

              {test.duration} min

            </span>

          </div>

          <div className="flex flex-col items-center">

            <BookOpen className="w-5 h-5 text-green-600" />

            <span className="text-sm text-gray-600 mt-1">

              {test.totalQuestions} Qs

            </span>

          </div>

          <div className="flex flex-col items-center">

            <Award className="w-5 h-5 text-orange-500" />

            <span className="text-sm text-gray-600 mt-1">

              {test.totalMarks} Marks

            </span>

          </div>

        </div>

        {/* Subject */}

        {test.subject && (

          <div className="mt-6">

            <span className="text-sm text-gray-500">

              Subject

            </span>

            <p className="font-medium text-gray-800">

              {test.subject.name}

            </p>

          </div>

        )}

      </div>

      {/* Button */}

      <button
        onClick={() => navigate(`/student/tests/${test.id}`)}
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition"
      >
        View Details

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default TestCard;