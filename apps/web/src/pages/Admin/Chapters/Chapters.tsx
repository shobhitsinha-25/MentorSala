import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  BookOpen,
} from "lucide-react";

import type {
  Chapter,
} from "../../../services/admin/chapter.service";

import {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
} from "../../../services/admin/chapter.service";

import type {
  Subject,
} from "../../../services/admin/subject.service";

import {
  getSubjects,
} from "../../../services/admin/subject.service";

const Chapters = () => {

  // ======================================================
  // STATES
  // ======================================================

  const [chapters, setChapters] =
    useState<Chapter[]>([]);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [filterSubject, setFilterSubject] =
    useState("");

  const [examType, setExamType] = useState<
    "JEE" | "WBJEE" | "BOARDS"
  >("JEE");

  // ======================================================
  // MODAL
  // ======================================================

  const [showModal, setShowModal] =
    useState(false);

  const [editingChapter, setEditingChapter] =
    useState<Chapter | null>(null);

  const [title, setTitle] =
    useState("");

  const [subjectId, setSubjectId] =
    useState("");

  const [order, setOrder] =
    useState(1);

  // ======================================================
  // DELETE
  // ======================================================

  const [showDelete, setShowDelete] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState("");

  // ======================================================
  // LOAD SUBJECTS
  // ======================================================

  const loadSubjects = async () => {

    try {

      const res = await getSubjects(
        1,
        "",
        examType
      );

      setSubjects(res.subjects);

    }

    catch (err) {

      console.error(err);

    }

  };

  // ======================================================
  // LOAD CHAPTERS
  // ======================================================

  const loadChapters = async () => {

    try {

      setLoading(true);

      const res =
        await getChapters(

          page,

          search,

          filterSubject

        );

      setChapters(
        res.chapters
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

  }, [examType]);

  useEffect(() => {

    loadChapters();

  }, [

    page,

    search,

    filterSubject,

  ]);

  // ======================================================
  // CREATE
  // ======================================================

  const handleCreate = async () => {

    try {

      await createChapter({

        title,

        subjectId,

        order,

      });

      toast.success(

        "Chapter created successfully."

      );

      setShowModal(false);

      setTitle("");

      setSubjectId("");

      setOrder(1);

      loadChapters();

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to create chapter."

      );

    }

  };

  // ======================================================
  // UPDATE
  // ======================================================

  const handleUpdate = async () => {

    if (!editingChapter)
      return;

    try {

      await updateChapter(

        editingChapter.id,

        {

          title,

          subjectId,

          order,

          published:
            editingChapter.published,

        }

      );

      toast.success(

        "Chapter updated successfully."

      );

      setEditingChapter(null);

      setShowModal(false);

      loadChapters();

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to update chapter."

      );

    }

  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async () => {

    try {

      await deleteChapter(
        deleteId
      );

      toast.success(
        "Chapter deleted successfully."
      );

      setShowDelete(false);

      loadChapters();

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to delete chapter."

      );

    }

  };

  // ======================================================
  // OPEN EDIT
  // ======================================================

  const openEdit = (
    chapter: Chapter
  ) => {

    setEditingChapter(chapter);

    setTitle(
      chapter.title
    );

    setOrder(
      chapter.order
    );

    setSubjectId(
      chapter.subject.id
    );

    setShowModal(true);

  };

  // ======================================================
  // OPEN CREATE
  // ======================================================

  const openCreate = () => {

    setEditingChapter(null);

    setTitle("");

    setOrder(1);

    setSubjectId("");

    setShowModal(true);

  };

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ============================================== */}
        {/* HEADER */}
        {/* ============================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">

          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">

              Chapters

            </h1>

            <p className="text-slate-400 mt-2 text-sm md:text-base">

              Manage chapters for every subject.

            </p>

          </div>

          <button

            onClick={openCreate}

            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 px-5 py-3 rounded-xl text-white font-semibold text-sm tracking-wide whitespace-nowrap"

          >

            <Plus size={18} />

            Add Chapter

          </button>

        </div>

        {/* ============================================== */}
        {/* FILTERS */}
        {/* ============================================== */}

        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <Search

              size={18}

              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"

            />

            <input

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              placeholder="Search Chapter..."

              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-900"

            />

          </div>

          <select

            value={filterSubject}

            onChange={(e) =>
              setFilterSubject(
                e.target.value
              )
            }

            className="w-full md:w-64 rounded-xl bg-slate-900/60 border border-slate-800 px-4 py-3 text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-900 cursor-pointer"

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

        </div>

        {/* ============================================== */}
        {/* TABLE */}
        {/* ============================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm shadow-xl">
          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-left">

              <thead className="bg-slate-900/80 border-b border-slate-800">

                <tr>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Chapter

                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Subject

                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Order

                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Created

                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-800/60">

                {loading ? (

                  <tr>

                    <td

                      colSpan={5}

                      className="text-center py-20 text-slate-400"

                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium text-slate-400">Loading chapters...</span>
                      </div>

                    </td>

                  </tr>

                ) : chapters.length === 0 ? (

                  <tr>

                    <td

                      colSpan={5}

                      className="text-center py-20 text-slate-500"

                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <BookOpen size={36} className="text-slate-600 mb-1" />
                        <span className="text-base font-medium text-slate-400">No Chapters Found</span>
                        <span className="text-xs text-slate-500">Try refining your search terms or subject selection filters.</span>
                      </div>

                    </td>

                  </tr>

                ) : (

                  chapters.map((chapter) => (

                    <tr

                      key={chapter.id}

                      className="hover:bg-slate-900/40 transition-colors group"

                    >

                      <td className="px-6 py-4.5 text-slate-200 font-medium">

                        {chapter.title}

                      </td>

                      <td className="px-6 py-4.5 text-slate-300">

                        {chapter.subject.name}

                      </td>

                      <td className="px-6 py-4.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                          {chapter.order}
                        </span>

                      </td>

                      <td className="px-6 py-4.5 text-slate-400 text-sm">

                        {new Date(
                          chapter.createdAt
                        ).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}

                      </td>

                      <td className="px-6 py-4.5">

                        <div className="flex justify-center gap-2">

                          <button

                            onClick={() =>
                              openEdit(
                                chapter
                              )
                            }

                            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/30 flex items-center justify-center transition-all group/btn"
                            title="Edit Chapter"

                          >

                            <Pencil

                              size={14}

                              className="text-slate-400 group-hover/btn:text-indigo-400 transition-colors"

                            />

                          </button>

                          <button

                            onClick={() => {

                              setDeleteId(
                                chapter.id
                              );

                              setShowDelete(
                                true
                              );

                            }}

                            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600/20 border border-slate-700 hover:border-red-500/30 flex items-center justify-center transition-all group/btn"
                            title="Delete Chapter"

                          >

                            <Trash2

                              size={14}

                              className="text-slate-400 group-hover/btn:text-red-400 transition-colors"

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

        <div className="flex justify-between sm:justify-end items-center gap-4 border-t border-slate-900 pt-4">

          <button

            disabled={page === 1}

            onClick={() =>
              setPage(page - 1)
            }

            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 font-medium text-sm transition disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:text-slate-300"

          >

            Previous

          </button>

          <span className="text-slate-400 text-sm font-medium">
            Page <strong className="text-slate-200">{page}</strong> of <strong className="text-slate-200">{totalPages}</strong>
          </span>

          <button

            disabled={
              page === totalPages
            }

            onClick={() =>
              setPage(page + 1)
            }

            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 font-medium text-sm transition disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:text-slate-300"

          >

            Next

          </button>

        </div>

        {/* ============================================== */}
        {/* CREATE / EDIT MODAL */}
        {/* ============================================== */}

        {showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">

            <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/50 transform transition-all">

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">

                <h2 className="text-xl font-bold text-white tracking-wide">

                  {editingChapter
                    ? "Edit Chapter"
                    : "Create Chapter"}

                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                >

                  <X
                    size={18}
                    className="text-slate-400 hover:text-white transition-colors"
                  />

                </button>

              </div>

              <div className="mt-6 space-y-5">

                {/* Chapter Name */}

                <div>

                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Chapter Name

                  </label>

                  <input

                    value={title}

                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }

                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"

                    placeholder="e.g. Laws of Motion"

                  />

                </div>

                {/* Exam Type */}

                <div>

                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Exam Type

                  </label>

                  <select

                    value={examType}

                    onChange={(e) => {

                      setExamType(
                        e.target.value as
                          "JEE" |
                          "WBJEE" |
                          "BOARDS"
                      );

                      setSubjectId("");

                    }}

                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 cursor-pointer"

                  >

                    <option value="JEE">
                      JEE
                    </option>

                    <option value="WBJEE">
                      WBJEE
                    </option>

                    <option value="BOARDS">
                      BOARDS
                    </option>

                  </select>

                </div>

                {/* Subject */}

                <div>

                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Subject

                  </label>

                  <select

                    value={subjectId}

                    onChange={(e) =>
                      setSubjectId(
                        e.target.value
                      )
                    }

                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 cursor-pointer"

                  >

                    <option value="">

                      Select Subject

                    </option>

                    {subjects.map((subject) => (

                      <option

                        key={subject.id}

                        value={subject.id}

                      >

                        {subject.name}

                      </option>

                    ))}

                  </select>

                </div>

                {/* Order */}

                <div>

                  <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Chapter Order

                  </label>

                  <input

                    type="number"

                    min={1}

                    value={order}

                    onChange={(e) =>
                      setOrder(
                        Number(
                          e.target.value
                        )
                      )
                    }

                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"

                  />

                </div>

              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-800">

                <button

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition"

                >

                  Cancel

                </button>

                <button

                  onClick={() => {

                    if (
                      editingChapter
                    ) {

                      handleUpdate();

                    }

                    else {

                      handleCreate();

                    }

                  }}

                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-indigo-600/10 transition"

                >

                  {editingChapter
                    ? "Update Chapter"
                    : "Create Chapter"}

                </button>

              </div>

            </div>

          </div>

        )}

        {/* ============================================== */}
        {/* DELETE MODAL */}
        {/* ============================================== */}

        {showDelete && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">

            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/50">

              <h2 className="text-xl font-bold text-white tracking-wide">

                Delete Chapter

              </h2>

              <p className="mt-3 text-slate-400 text-sm leading-relaxed border-b border-slate-800/60 pb-4">

                Are you sure you want to delete this chapter? This action cannot be undone and may clear sub-topics associated with this chapter sequence.

              </p>

              <div className="mt-6 flex justify-end gap-3">

                <button

                  onClick={() =>
                    setShowDelete(false)
                  }

                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition"

                >

                  Cancel

                </button>

                <button

                  onClick={handleDelete}

                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-red-600/10 transition"

                >

                  Delete

                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>

  );

};

export default Chapters;