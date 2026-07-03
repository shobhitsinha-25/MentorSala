import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

import type {
  Question,
} from "../../../services/admin/question.service";

import {
  getQuestions,
  deleteQuestion,
} from "../../../services/admin/question.service";

import type {
  Subject,
} from "../../../services/admin/subject.service";

import {
  getSubjects,
} from "../../../services/admin/subject.service";

import type {
  Chapter,
} from "../../../services/admin/chapter.service";

import {
  getChapters,
} from "../../../services/admin/chapter.service";

const Questions = () => {

  // ======================================================
  // STATES
  // ======================================================

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [chapters, setChapters] =
    useState<Chapter[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [examType, setExamType] =
    useState("");

  const [subjectId, setSubjectId] =
    useState("");

  const [chapterId, setChapterId] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [questionType, setQuestionType] =
    useState("");

  const [showDelete, setShowDelete] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState("");

  // ======================================================
  // LOAD SUBJECTS
  // ======================================================

  const loadSubjects = async () => {

    try {

      const res =
        await getSubjects(

          1,

          "",

          examType as any

        );

      setSubjects(
        res.subjects
      );

    }

    catch (err) {

      console.error(err);

    }

  };

  // ======================================================
  // LOAD CHAPTERS
  // ======================================================

  const loadChapters = async () => {

    if (!subjectId) {

      setChapters([]);

      return;

    }

    try {

      const res =
        await getChapters(

          1,

          "",

          subjectId

        );

      setChapters(
        res.chapters
      );

    }

    catch (err) {

      console.error(err);

    }

  };

  // ======================================================
  // LOAD QUESTIONS
  // ======================================================

  const loadQuestions = async () => {

    try {

      setLoading(true);

      const res =
        await getQuestions(

          page,

          search,

          examType,

          subjectId,

          chapterId,

          difficulty,

          questionType

        );

      setQuestions(
        res.questions
      );

      setTotalPages(
        res.pagination.pages
      );

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadSubjects();

    setSubjectId("");

    setChapterId("");

  }, [examType]);

  useEffect(() => {

    loadChapters();

    setChapterId("");

  }, [subjectId]);

  useEffect(() => {

    loadQuestions();

  }, [

    page,

    search,

    examType,

    subjectId,

    chapterId,

    difficulty,

    questionType,

  ]);

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async () => {

    try {

      await deleteQuestion(
        deleteId
      );

      toast.success(
        "Question deleted successfully."
      );

      setShowDelete(false);

      loadQuestions();

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to delete question."

      );

    }

  };

  // Helper function to dynamically color-code difficulty tags
  const getDifficultyStyles = (diff: string) => {
    switch (diff?.toUpperCase()) {
      case "EASY":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "HARD":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-100">

      {/* ============================================== */}
      {/* HEADER */}
      {/* ============================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6">

        <div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white bg-clip-text bg-gradient-to-r from-white to-slate-400">

            Question Bank

          </h1>

          <p className="text-slate-400 mt-1 text-sm">

            Create, manage, and filter practice questions across subjects and chapters.

          </p>

        </div>

        <Link

          to="/admin/questions/create"

          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all duration-200 hover:-translate-y-0.5"

        >

          <Plus size={16} strokeWidth={2.5} />

          Add Question

        </Link>

      </div>

      {/* ============================================== */}
      {/* FILTERS */}
      {/* ============================================== */}

      <div className="mt-8 bg-slate-900/50 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
        
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          <SlidersHorizontal size={14} className="text-indigo-400" />
          Filter & Search Configuration
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

          <div className="relative lg:col-span-2">

            <Search

              size={18}

              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"

            />

            <input

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              placeholder="Search by keywords..."

              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"

            />

          </div>

          <select

            value={examType}

            onChange={(e) =>
              setExamType(e.target.value)
            }

            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"

          >

            <option value="" className="bg-slate-900">

              All Exams

            </option>

            <option value="JEE" className="bg-slate-900">

              JEE

            </option>

            <option value="WBJEE" className="bg-slate-900">

              WBJEE

            </option>

            <option value="BOARDS" className="bg-slate-900">

              BOARDS

            </option>

          </select>

          <select

            value={subjectId}

            onChange={(e) =>
              setSubjectId(e.target.value)
            }

            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"

          >

            <option value="" className="bg-slate-900">

              All Subjects

            </option>

            {subjects.map((subject) => (

              <option

                key={subject.id}

                value={subject.id}

                className="bg-slate-900"

              >

                {subject.name}

              </option>

            ))}

          </select>

          <select

            value={chapterId}

            onChange={(e) =>
              setChapterId(e.target.value)
            }

            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"

          >

            <option value="" className="bg-slate-900">

              All Chapters

            </option>

            {chapters.map((chapter) => (

              <option

                key={chapter.id}

                value={chapter.id}

                className="bg-slate-900"

              >

                {chapter.title}

              </option>

            ))}

          </select>

          <select

            value={difficulty}

            onChange={(e) =>
              setDifficulty(e.target.value)
            }

            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500"

          >

            <option value="" className="bg-slate-900">

              Difficulty

            </option>

            <option value="EASY" className="bg-slate-900">

              Easy

            </option>

            <option value="MEDIUM" className="bg-slate-900">

              Medium

            </option>

            <option value="HARD" className="bg-slate-900">

              Hard

            </option>

          </select>

        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

          <select

            value={questionType}

            onChange={(e) =>
              setQuestionType(
                e.target.value
              )
            }

            className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-300 outline-none transition-all duration-200 focus:border-indigo-500 lg:col-span-2"

          >

            <option value="" className="bg-slate-900">

              Question Type

            </option>

            <option value="SINGLE_CORRECT" className="bg-slate-900">

              Single Correct

            </option>

            <option value="MULTIPLE_CORRECT" className="bg-slate-900">

              Multiple Correct

            </option>

            <option value="INTEGER" className="bg-slate-900">

              Integer

            </option>

            <option value="ASSERTION_REASON" className="bg-slate-900">

              Assertion Reason

            </option>

          </select>

        </div>

      </div>

      {/* ============================================== */}
      {/* TABLE */}
      {/* ============================================== */}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">

        <div className="overflow-x-auto">

          <table className="w-full border-collapse text-left">

            <thead className="bg-slate-900/80 border-b border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-400">

              <tr>

                <th className="px-6 py-4">

                  Question

                </th>

                <th className="px-6 py-4">

                  Subject

                </th>

                <th className="px-6 py-4">

                  Chapter

                </th>

                <th className="px-6 py-4">

                  Difficulty

                </th>

                <th className="px-6 py-4">

                  Type

                </th>

                <th className="px-6 py-4 text-center">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800/60 text-sm">

              {loading ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-16 text-center text-slate-400 font-medium"

                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                      <span>Loading standard questions asset repository...</span>
                    </div>

                  </td>

                </tr>

              ) : questions.length === 0 ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-16 text-center text-slate-500"

                  >

                    No active metrics matching search query were found.

                  </td>

                </tr>

              ) : (

                questions.map((question) => (

                  <tr

                    key={question.id}

                    className="hover:bg-slate-900/40 transition-colors duration-150"

                  >

                    <td className="max-w-md truncate px-6 py-4.5 text-white font-medium">

                      {question.question}

                    </td>

                    <td className="px-6 py-4.5 text-slate-300">

                      {question.subject.name}

                    </td>

                    <td className="px-6 py-4.5 text-slate-300">

                      {question.chapter.title}

                    </td>

                    <td className="px-6 py-4.5">

                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide capitalize ${getDifficultyStyles(question.difficulty)}`}>

                        {question.difficulty?.toLowerCase()}

                      </span>

                    </td>

                    <td className="px-6 py-4.5 text-slate-400 text-xs font-mono bg-slate-900/20">

                      {question.questionType.replaceAll("_", " ")}

                    </td>

                    <td className="px-6 py-4.5">

                      <div className="flex justify-center items-center gap-2">

                        <Link

                          to={`/admin/questions/${question.id}/edit`}

                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 transition-all duration-150 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/30"

                        >

                          <Pencil

                            size={14}

                          />

                        </Link>

                        <button

                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 transition-all duration-150 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"

                        >

                          <Eye

                            size={14}

                          />

                        </button>

                        <button

                          onClick={() => {

                            setDeleteId(question.id);

                            setShowDelete(true);

                          }}

                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 transition-all duration-150 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30"

                        >

                          <Trash2

                            size={14}

                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ============================================== */}
      {/* PAGINATION */}
      {/* ============================================== */}

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
        
        <div className="text-xs text-slate-400">
          Showing page <span className="text-slate-200 font-semibold">{page}</span> of <span className="text-slate-200 font-semibold">{totalPages}</span> total blocks
        </div>

        <div className="flex items-center gap-2">

          <button

            disabled={page === 1}

            onClick={() =>
              setPage(page - 1)
            }

            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-40"

          >

            Previous

          </button>

          <button

            disabled={
              page === totalPages
            }

            onClick={() =>
              setPage(page + 1)
            }

            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-40"

          >

            Next

          </button>

        </div>

      </div>

      {/* ============================================== */}
      {/* DELETE MODAL */}
      {/* ============================================== */}

      {showDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">

          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 mb-4">
              <Trash2 size={24} />
            </div>

            <h2 className="text-xl font-bold text-white tracking-tight">

              Delete Target Question

            </h2>

            <p className="mt-2 text-sm text-slate-400 leading-relaxed">

              Are you sure you want to delete this question? This operation changes standard parameters permanently and cannot be reverted.

            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button

                onClick={() =>
                  setShowDelete(false)
                }

                className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"

              >

                Cancel

              </button>

              <button

                onClick={handleDelete}

                className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-600/20 hover:bg-rose-500 transition-all"

              >

                Delete

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Questions;