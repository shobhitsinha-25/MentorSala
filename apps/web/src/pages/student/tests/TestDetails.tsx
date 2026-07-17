import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Clock3,
  BookOpen,
  Trophy,
  MinusCircle,
  CheckCircle2,
  Play,
  Loader2,
} from "lucide-react";

import {
  getTestDetails,
  startTest,
} from "../../../api/studentTestApi";

import type {
  Test,
} from "../../../types/studentTest.types";

const TestDetail = () => {

  const navigate = useNavigate();

  const { testId } = useParams();

  const [loading, setLoading] = useState(true);

  const [starting, setStarting] = useState(false);

  const [test, setTest] = useState<Test | null>(null);

  // ==========================================
  // LOAD TEST DETAILS
  // ==========================================

  const loadTest = async () => {

    if (!testId) return;

    try {

      setLoading(true);

      const res = await getTestDetails(testId);

      setTest(res.test);

    } catch (err) {

      console.error(err);

      setTest(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadTest();

  }, [testId]);

  // ==========================================
  // START TEST
  // ==========================================

  const handleStartTest = async () => {

    if (!testId) return;

    try {

      setStarting(true);

      const res = await startTest(testId);

      navigate(
        `/student/tests/attempts/${res.attempt.id}/instructions`
      );

    } catch (err) {

      console.error(err);

    } finally {

      setStarting(false);

    }

  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <Loader2
          className="animate-spin text-indigo-600"
          size={42}
        />

      </div>

    );

  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!test) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center">

        <h2 className="text-3xl font-bold">

          Test Not Found

        </h2>

        <button

          onClick={() => navigate(-1)}

          className="mt-6 rounded-xl bg-indigo-600 text-white px-6 py-3"

        >

          Go Back

        </button>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto p-6">

      {/* ============================= */}

      {/* Header */}

      {/* ============================= */}

      <button

        onClick={() => navigate(-1)}

        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"

      >

        <ArrowLeft size={18} />

        Back

      </button>

      <div className="bg-white rounded-2xl shadow border p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-3xl font-bold text-gray-900">

              {test.title}

            </h1>

            <div className="flex gap-3 mt-4 flex-wrap">

              <span className="rounded-full bg-green-100 text-green-700 px-4 py-1 text-sm font-medium">

                {test.status}

              </span>

              <span className="rounded-full bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-medium">

                {test.type}

              </span>

              <span className="rounded-full bg-orange-100 text-orange-700 px-4 py-1 text-sm font-medium">

                {test.examType}

              </span>

            </div>

          </div>

          <button

            onClick={handleStartTest}

            disabled={starting}

            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-4 font-semibold disabled:opacity-60"

          >

            {

              starting

              ?

              <Loader2

                className="animate-spin"

                size={18}

              />

              :

              <Play size={18} />

            }

            {

              starting

                ? "Starting..."

                : "Start Test"

            }

          </button>

        </div>

      </div>

      {/* ============================= */}

      {/* Statistics */}

      {/* ============================= */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

        <div className="bg-white rounded-2xl shadow border p-6">

          <Clock3 className="text-indigo-600 mb-3" />

          <p className="text-3xl font-bold">

            {test.duration}

          </p>

          <p className="text-gray-500">

            Minutes

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow border p-6">

          <BookOpen className="text-blue-600 mb-3" />

          <p className="text-3xl font-bold">

            {test.totalQuestions}

          </p>

          <p className="text-gray-500">

            Questions

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow border p-6">

          <Trophy className="text-yellow-500 mb-3" />

          <p className="text-3xl font-bold">

            {test.totalMarks}

          </p>

          <p className="text-gray-500">

            Total Marks

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow border p-6">

          <MinusCircle className="text-red-500 mb-3" />

          <p className="text-3xl font-bold">

            -{test.negativeMarks}

          </p>

          <p className="text-gray-500">

            Negative Marking

          </p>

        </div>

      </div>
            {/* ============================= */}
      {/* Information */}
      {/* ============================= */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">

            Test Information

          </h2>

          <div className="space-y-5">

            <div>

              <p className="text-sm text-gray-500">

                Exam

              </p>

              <p className="font-semibold text-lg">

                {test.examType}

              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">

                Subject

              </p>

              <p className="font-semibold text-lg">

                {test.subject?.name ?? "-"}

              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">

                Chapter

              </p>

              <p className="font-semibold text-lg">

                {test.chapter?.title ?? "Full Syllabus"}

              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow border p-6">

          <h2 className="text-xl font-semibold mb-6">

            Description

          </h2>

          <p className="text-gray-600 leading-7 whitespace-pre-wrap">

            {test.description ||

              "No description has been provided for this test."}

          </p>

        </div>

      </div>

      {/* ============================= */}
      {/* Instructions */}
      {/* ============================= */}

      <div className="bg-white rounded-2xl shadow border p-8 mt-8">

        <h2 className="text-2xl font-semibold mb-6">

          Instructions

        </h2>

        {

          test.instructions ? (

            <div className="text-gray-700 leading-8 whitespace-pre-wrap">

              {test.instructions}

            </div>

          ) : (

            <div className="space-y-4">

              {

                [

                  "Read every question carefully before answering.",

                  "All questions are compulsory.",

                  "Negative marking is applicable wherever mentioned.",

                  "The timer starts immediately after beginning the test.",

                  "Your answers are saved automatically.",

                  "You may change answers before submitting.",

                  "Do not refresh or close the browser during the test.",

                  "The test will be automatically submitted when time expires.",

                ].map((instruction) => (

                  <div

                    key={instruction}

                    className="flex items-start gap-3"

                  >

                    <CheckCircle2

                      size={20}

                      className="text-green-600 mt-1 flex-shrink-0"

                    />

                    <span className="text-gray-700">

                      {instruction}

                    </span>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

      {/* ============================= */}
      {/* Footer */}
      {/* ============================= */}

      <div className="flex justify-between items-center mt-10">

        <button

          onClick={() => navigate(-1)}

          className="border border-gray-300 rounded-xl px-6 py-3 font-medium hover:bg-gray-100"

        >

          Back

        </button>

        <button

          onClick={handleStartTest}

          disabled={starting}

          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 font-semibold disabled:opacity-60"

        >

          {

            starting

            ?

            <Loader2

              className="animate-spin"

              size={18}

            />

            :

            <Play size={18} />

          }

          {

            starting

              ? "Starting..."

              : "Start Test"

          }

        </button>

      </div>

    </div>

  );

};

export default TestDetail;