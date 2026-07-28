import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Clock3,
  BookOpen,
  Trophy,
  MinusCircle,
  Play,
  Loader2,
} from "lucide-react";

import {
  getTestDetails,
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

  const handleStartTest = () => {

    if (!testId) return;

    navigate(`/student/tests/${testId}/instructions`);

  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">

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

      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50">

        <h2 className="text-3xl font-bold text-slate-800">

          Test Not Found

        </h2>

        <button

          onClick={() => navigate(-1)}

          className="mt-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold shadow-md shadow-indigo-600/20 transition"

        >

          Go Back

        </button>

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* ============================= */}

      {/* Header */}

      {/* ============================= */}

      <button

        onClick={() => navigate(-1)}

        className="flex items-center gap-2 text-white hover:text-slate-100/50 font-medium transition mb-2"

      >

        <ArrowLeft size={18} />

        Back

      </button>

      <div className="bg-gradient-to-br bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">

              {test.title}

            </h1>

            <div className="flex gap-2.5 mt-4 flex-wrap">

              

              <span className="rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-700 px-4 py-1 text-sm font-semibold">

                {test.type}

              </span>

              <span className="rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-700 px-4 py-1 text-sm font-semibold">

                {test.examType}

              </span>

            </div>

          </div>

          <button

            onClick={handleStartTest}

            disabled={starting}

            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white rounded-xl px-8 py-4 font-semibold shadow-lg shadow-indigo-600/20 transition disabled:opacity-60"

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

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-gradient-to-br from-white to-[#ccccff] rounded-2xl border border-slate-200/80 p-6 shadow-sm">

          <Clock3 className="text-indigo-600 mb-3" size={24} />

          <p className="text-3xl font-bold text-slate-900">

            {test.duration}

          </p>

          <p className="text-slate-500 font-medium text-sm mt-1">

            Minutes

          </p>

        </div>

        <div className="bg-gradient-to-br from-white to-[#ccccff] rounded-2xl border border-slate-200/80 p-6 shadow-sm">

          <BookOpen className="text-emerald-600 mb-3" size={24} />

          <p className="text-3xl font-bold text-slate-900">

            {test.totalQuestions}

          </p>

          <p className="text-slate-500 font-medium text-sm mt-1">

            Questions

          </p>

        </div>

        <div className="bg-gradient-to-br from-white to-[#ccccff] rounded-2xl border border-slate-200/80 p-6 shadow-sm">

          <Trophy className="text-amber-500 mb-3" size={24} />

          <p className="text-3xl font-bold text-slate-900">

            {test.totalMarks}

          </p>

          <p className="text-slate-500 font-medium text-sm mt-1">

            Total Marks

          </p>

        </div>

        <div className="bg-gradient-to-br from-white to-[#ccccff] rounded-2xl border border-slate-200/80 p-6 shadow-sm">

          <MinusCircle className="text-rose-500 mb-3" size={24} />

          <p className="text-3xl font-bold text-slate-900">

            -{test.negativeMarks}

          </p>

          <p className="text-slate-500 font-medium text-sm mt-1">

            Negative Marking

          </p>

        </div>

      </div>

      {/* ============================= */}
      {/* Information */}
      {/* ============================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-gradient-to-br from-white to-[#ccccff] rounded-2xl border border-slate-200/80 p-6 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900 mb-6">

            Test Information

          </h2>

          <div className="space-y-5">

            <div className="border-b border-slate-100 pb-3">

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">

                Exam

              </p>

              <p className="font-semibold text-lg text-slate-800 mt-1">

                {test.examType}

              </p>

            </div>

            <div className="border-b border-slate-100 pb-3">

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">

                Subject

              </p>

              <p className="font-semibold text-lg text-slate-800 mt-1">

                {test.subject?.name ?? "-"}

              </p>

            </div>

            <div>

              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">

                Chapter

              </p>

              <p className="font-semibold text-lg text-slate-800 mt-1">

                {test.chapter?.title ?? "Full Syllabus"}

              </p>

            </div>

          </div>

        </div>

        <div className="bg-gradient-to-br from-white to-[#ccccff] rounded-2xl border border-slate-200/80 p-6 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900 mb-6">

            Description

          </h2>

          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">

            {test.description ||

              "No description has been provided for this test."}

          </p>

        </div>

      </div>


    </div>

  );

};

export default TestDetail;