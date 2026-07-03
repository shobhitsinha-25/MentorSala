import { useEffect, useMemo, useState } from "react";

import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  ArrowLeft,
  Search,
  Plus,
  CheckCircle,
} from "lucide-react";

import {
  getQuestions,
} from "../../../services/admin/question.service";

import {
  getTestById,
  getTestQuestions,
  attachQuestions,
  publishTest,
  removeQuestion,
  reorderQuestions,
} from "../../../services/admin/test.service";

import type {
Question,
} from "../../../services/admin/question.service";

const TestBuilder = () => {

  const { testId } =
    useParams();

  const [loading, setLoading] =
    useState(false);

  const [publishing, setPublishing] =
    useState(false);

  const [test, setTest] =
    useState<any>(null);

  const [availableQuestions, setAvailableQuestions] =
    useState<Question[]>([]);

  const [testQuestions, setTestQuestions] =
    useState<any[]>([]);

  const [selectedQuestions, setSelectedQuestions] =
    useState<string[]>([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [questionType, setQuestionType] =
    useState("");

  // ==========================================
  // LOAD TEST
  // ==========================================

  const loadTest =
    async () => {

      try {

        const res =
          await getTestById(
            testId as string
          );

        setTest(
          res.test
        );

      }

      catch (err) {

        console.log(err);

      }

    };

  // ==========================================
  // LOAD QUESTIONS OF TEST
  // ==========================================

  const loadTestQuestions =
    async () => {

      try {

        const res =
          await getTestQuestions(
            testId as string
          );

        setTestQuestions(
          res.questions
        );

      }

      catch (err) {

        console.log(err);

      }

    };

  // ==========================================
  // LOAD AVAILABLE QUESTIONS
  // ==========================================

  const loadAvailableQuestions =
    async () => {

      if (!test) {

        return;

      }

      try {

        setLoading(true);

        const res =
          await getQuestions(

            page,

            search,

            test.examType,

            test.subjectId ?? "",

            test.chapterId ?? "",

            difficulty,

            questionType

          );

        setAvailableQuestions(

          res.questions

        );

        setTotalPages(

          res.pagination.pages

        );

      }

      catch (err) {

        console.log(err);

      }

      finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadTest();

  }, []);

  useEffect(() => {

    if (testId) {

      loadTestQuestions();

    }

  }, [testId]);

  useEffect(() => {

    if (test) {

      loadAvailableQuestions();

    }

  }, [

    test,

    page,

    search,

    difficulty,

    questionType,

  ]);

  // ==========================================
  // TOTALS
  // ==========================================

  const totalMarks =
    useMemo(() => {

      return testQuestions.reduce(

        (sum, item) =>

          sum +

          (item.marks ?? 0),

        0

      );

    }, [testQuestions]);
      // ==========================================
  // CHECKBOX
  // ==========================================

  const toggleQuestion =
    (questionId: string) => {

      setSelectedQuestions((prev) => {

        if (
          prev.includes(questionId)
        ) {

          return prev.filter(
            (id) =>
              id !== questionId
          );

        }

        return [

          ...prev,

          questionId,

        ];

      });

    };

  // ==========================================
  // ADD QUESTIONS
  // ==========================================

  const handleAttachQuestions =
    async () => {

      if (
        selectedQuestions.length === 0
      ) {

        toast.error(
          "Select at least one question."
        );

        return;

      }

      try {

        const payload =
          selectedQuestions.map(

            (
              questionId,
              index
            ) => ({

              questionId,

              displayOrder:
                testQuestions.length +
                index +
                1,

            })

          );

        await attachQuestions(

          testId as string,

          payload

        );

        toast.success(
          "Questions added successfully."
        );

        setSelectedQuestions([]);

        await loadTest();

        await loadTestQuestions();

      }

      catch (err: any) {

        toast.error(

          err.response?.data?.message ||

          "Failed to attach questions."

        );

      }

    };

  // ==========================================
  // PUBLISH TEST
  // ==========================================

  const handlePublish =
    async () => {

      try {

        setPublishing(true);

        await publishTest(
          testId as string
        );

        toast.success(
          "Test published successfully."
        );

        await loadTest();

      }

      catch (err: any) {

        toast.error(

          err.response?.data?.message ||

          "Failed to publish."

        );

      }

      finally {

        setPublishing(false);

      }

    };

  // ==========================================
  // FILTER OUT ALREADY ATTACHED QUESTIONS
  // ==========================================

  const filteredQuestions =
    availableQuestions.filter(

      (question) =>

        !testQuestions.some(

          (item) =>

            item.question.id ===
            question.id

        )

    );

    // ==========================================
// REMOVE QUESTION
// ==========================================

const handleRemoveQuestion =
  async (
    questionId: string
  ) => {

    try {

      await removeQuestion(

        testId as string,

        questionId

      );

      toast.success(
        "Question removed successfully."
      );

      await loadTest();

      await loadTestQuestions();

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to remove question."

      );

    }

  };

  // ==========================================
// MOVE UP
// ==========================================

const handleMoveUp =
  async (
    index: number
  ) => {

    if (index === 0) {

      return;

    }

    const reordered =
      [...testQuestions];

    [

      reordered[index - 1],

      reordered[index]

    ] = [

      reordered[index],

      reordered[index - 1]

    ];

    const payload =
      reordered.map(

        (
          item,
          i
        ) => ({

          questionId:
            item.question.id,

          displayOrder:
            i + 1,

        })

      );

    try {

      await reorderQuestions(

        testId as string,

        payload

      );

      setTestQuestions(
        reordered
      );

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to reorder."

      );

    }

  };

  // ==========================================
// MOVE DOWN
// ==========================================

const handleMoveDown =
  async (
    index: number
  ) => {

    if (

      index ===

      testQuestions.length - 1

    ) {

      return;

    }

    const reordered =
      [...testQuestions];

    [

      reordered[index],

      reordered[index + 1]

    ] = [

      reordered[index + 1],

      reordered[index]

    ];

    const payload =
      reordered.map(

        (
          item,
          i
        ) => ({

          questionId:
            item.question.id,

          displayOrder:
            i + 1,

        })

      );

    try {

      await reorderQuestions(

        testId as string,

        payload

      );

      setTestQuestions(
        reordered
      );

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to reorder."

      );

    }

  };
      // ==========================================
  // UI
  // ==========================================

  return (

    <div>

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <Link

            to={`/admin/tests/${testId}/edit`}

            className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-white"

          >

            <ArrowLeft size={18} />

            Back to Edit Test

          </Link>

          <h1 className="text-4xl font-black text-white">

            Test Builder

          </h1>

          <p className="mt-2 text-slate-400">

            {test?.title}

          </p>

        </div>

        <div className="flex flex-wrap gap-4">

          <button

            onClick={handleAttachQuestions}

            disabled={selectedQuestions.length === 0}

            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"

          >

            <Plus size={18} />

            Add Selected

          </button>

          <button

            onClick={handlePublish}

            disabled={publishing}

            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-500"

          >

            <CheckCircle size={18} />

            {

              publishing

                ? "Publishing..."

                : "Publish Test"

            }

          </button>

        </div>

      </div>

      {/* ========================================== */}
      {/* TEST INFO */}
      {/* ========================================== */}

      <div className="mt-8 grid gap-5 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6">

          <p className="text-sm text-slate-400">

            Exam

          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">

            {test?.examType}

          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <p className="text-sm text-slate-400">

            Type

          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">

            {test?.type}

          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <p className="text-sm text-slate-400">

            Questions

          </p>

          <h3 className="mt-3 text-2xl font-bold text-indigo-400">

            {testQuestions.length}

          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <p className="text-sm text-slate-400">

            Total Marks

          </p>

          <h3 className="mt-3 text-2xl font-bold text-emerald-400">

            {totalMarks}

          </h3>

        </div>

      </div>

      {/* ========================================== */}
      {/* FILTERS */}
      {/* ========================================== */}

      <div className="mt-8 grid gap-4 lg:grid-cols-3">

        <div className="relative">

          <Search

            size={18}

            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"

          />

          <input

            value={search}

            onChange={(e)=>

              setSearch(

                e.target.value

              )

            }

            placeholder="Search Questions"

            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white"

          />

        </div>

        <select

          value={difficulty}

          onChange={(e)=>

            setDifficulty(

              e.target.value

            )

          }

          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"

        >

          <option value="">

            All Difficulty

          </option>

          <option value="EASY">

            Easy

          </option>

          <option value="MEDIUM">

            Medium

          </option>

          <option value="HARD">

            Hard

          </option>

        </select>

        <select

          value={questionType}

          onChange={(e)=>

            setQuestionType(

              e.target.value

            )

          }

          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"

        >

          <option value="">

            All Question Types

          </option>

          <option value="SINGLE_CORRECT">

            Single Correct

          </option>

          <option value="MULTIPLE_CORRECT">

            Multiple Correct

          </option>

          <option value="INTEGER">

            Integer

          </option>

          <option value="ASSERTION_REASON">

            Assertion & Reason

          </option>

        </select>

      </div>

      {/* ========================================== */}
      {/* TWO COLUMN LAYOUT */}
      {/* ========================================== */}

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
              {/* ========================================== */}
      {/* AVAILABLE QUESTIONS */}
      {/* ========================================== */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900">

        <div className="border-b border-slate-800 p-5">

          <h2 className="text-xl font-bold text-white">

            Available Questions

          </h2>

        </div>

        <div className="max-h-[700px] overflow-y-auto">

          {

            loading ? (

              <div className="py-10 text-center text-slate-400">

                Loading...

              </div>

            )

            :

            filteredQuestions.length === 0 ? (

              <div className="py-10 text-center text-slate-500">

                No Questions Found

              </div>

            )

            :

            filteredQuestions.map((question) => (

              <div

                key={question.id}

                className="border-b border-slate-800 p-5 transition hover:bg-slate-800/40"

              >

                <div className="flex items-start gap-4">

                  <input

                    type="checkbox"

                    checked={selectedQuestions.includes(

                      question.id

                    )}

                    onChange={() =>

                      toggleQuestion(

                        question.id

                      )

                    }

                    className="mt-1 h-5 w-5"

                  />

                  <div className="flex-1">

                    <p className="font-medium leading-7 text-white">

                      {question.question}

                    </p>

                    {

                      question.questionImageUrl && (

                        <img

                          src={

                            question.questionImageUrl

                          }

                          alt="Question"

                          className="mt-4 max-h-56 rounded-xl border border-slate-700"

                        />

                      )

                    }

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">

                        {

                          question.questionType

                        }

                      </span>

                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">

                        {

                          question.difficulty

                        }

                      </span>

                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">

                        {

                          question.marks

                        } Marks

                      </span>

                      <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs text-sky-300">

                        {

                          question.subject.name

                        }

                      </span>

                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">

                        {

                          question.chapter.title

                        }

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

        {/* Pagination */}

        <div className="flex items-center justify-end gap-3 border-t border-slate-800 p-5">

          <button

            disabled={page===1}

            onClick={()=>

              setPage(page-1)

            }

            className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-50"

          >

            Previous

          </button>

          <span className="text-slate-300">

            {page} / {totalPages}

          </span>

          <button

            disabled={page===totalPages}

            onClick={()=>

              setPage(page+1)

            }

            className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-50"

          >

            Next

          </button>

        </div>

      </div>
      
      </div>
            {/* ========================================== */}
      {/* TEST QUESTIONS */}
      {/* ========================================== */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900">

        <div className="border-b border-slate-800 p-5">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-white">

              Questions in Test

            </h2>

            <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-bold text-white">

              {testQuestions.length}

            </span>

          </div>

        </div>

        <div className="max-h-[700px] overflow-y-auto">

          {

            testQuestions.length === 0 ? (

              <div className="py-16 text-center text-slate-500">

                No Questions Added Yet

              </div>

            )

            :

            testQuestions.map((item: any,index:number)=>(

              <div

                key={item.id}

                className="border-b border-slate-800 p-5"

              >

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">

                    {index+1}

                  </div>

                  <div className="flex-1">

                    <p className="font-medium leading-7 text-white">

                      {item.question.question}

                    </p>

                    {

                      item.question.questionImageUrl && (

                        <img

                          src={item.question.questionImageUrl}

                          alt="Question"

                          className="mt-4 max-h-56 rounded-xl border border-slate-700"

                        />

                      )

                    }

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">

                        {item.question.questionType}

                      </span>

                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">

                        {item.question.difficulty}

                      </span>

                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">

                        {item.marks} Marks

                      </span>

                    </div>

                  </div>

                  <div className="flex flex-col gap-2">

                    <button

                      onClick={()=>

                        handleMoveUp(index)

                      }

                      disabled={index===0}

                      className="rounded-lg bg-slate-800 px-3 py-2 text-white disabled:opacity-30"

                    >

                      ↑

                    </button>

                    <button

                      onClick={()=>

                        handleMoveDown(index)

                      }

                      disabled={

                        index===

                        testQuestions.length-1

                      }

                      className="rounded-lg bg-slate-800 px-3 py-2 text-white disabled:opacity-30"

                    >

                      ↓

                    </button>

                    <button

                      onClick={()=>

                        handleRemoveQuestion(

                          item.question.id

                        )

                      }

                      className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"

                    >

                      Remove

                    </button>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

        {/* ========================================== */}
        {/* SUMMARY */}
        {/* ========================================== */}

        <div className="border-t border-slate-800 p-6">

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">

                Total Questions

              </p>

              <h3 className="mt-2 text-3xl font-black text-white">

                {testQuestions.length}

              </h3>

            </div>

            <div className="rounded-xl bg-slate-800 p-5">

              <p className="text-sm text-slate-400">

                Total Marks

              </p>

              <h3 className="mt-2 text-3xl font-black text-emerald-400">

                {totalMarks}

              </h3>

            </div>

          </div>

          <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-lg font-bold text-white">

                  {test?.title}

                </p>

                <p className="mt-1 text-sm text-slate-300">

                  {test?.examType} • {test?.type}

                </p>

              </div>

              <button

                onClick={handlePublish}

                disabled={publishing}

                className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-500"

              >

                {

                  publishing

                    ? "Publishing..."

                    : "Publish Test"

                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default TestBuilder;