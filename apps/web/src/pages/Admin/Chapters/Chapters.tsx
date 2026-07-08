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

import SearchableSelect from "../../../components/ui/SearchableSelect";

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

    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 antialiased">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ============================================== */}
        {/* HEADER */}
        {/* ============================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Chapters
            </h1>

            <p className="text-slate-400 mt-1.5 text-sm">
              Manage chapters for every subject.
            </p>

          </div>

          <button

            onClick={openCreate}

            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition shadow-md px-4 py-2.5 rounded-xl text-white font-medium text-sm whitespace-nowrap"

          >

            <Plus size={16} />

            Add Chapter

          </button>

        </div>

        {/* ============================================== */}
        {/* FILTERS */}
        {/* ============================================== */}

        <div className="relative z-30 flex flex-col gap-4 sm:flex-row">

          {/* Search */}

          <div className="relative z-10 flex-1">

            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search Chapter..."
              className="w-full rounded-xl border border-slate-900 bg-slate-900/40 py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-500 outline-none transition focus:border-slate-800 focus:bg-slate-900/80 focus:ring-1 focus:ring-slate-800"
            />

          </div>

          {/* Subject Filter */}

          <div className="relative z-20 w-full sm:w-72">

            <SearchableSelect
              value={filterSubject}
              onChange={setFilterSubject}
              placeholder="All Subjects"
              options={[
                {
                  label: "All Subjects",
                  value: "",
                },
                ...subjects.map((subject) => ({
                  label: subject.name,
                  value: subject.id,
                })),
              ]}
            />

          </div>

        </div>

        {/* ============================================== */}
        {/* TABLE */}
        {/* ============================================== */}

        <div className="relative z-10 overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/20 shadow-sm">
          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-left">

              <thead className="bg-slate-900/60 border-b border-slate-900">

                <tr>

                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Chapter
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Subject
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Order
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Created
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-900/60">

                {loading ? (

                  <tr>

                    <td

                      colSpan={5}

                      className="text-center py-20 text-slate-400"

                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-slate-400">Loading chapters...</span>
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
                        <BookOpen size={28} className="text-slate-700 mb-1" />
                        <span className="text-sm font-medium text-slate-400">No Chapters Found</span>
                        <span className="text-xs text-slate-500">Try refining your search terms or subject filters.</span>
                      </div>

                    </td>

                  </tr>

                ) : (

                  chapters.map((chapter) => (

                    <tr

                      key={chapter.id}

                      className="hover:bg-slate-900/30 transition-colors group"

                    >

                      <td className="px-6 py-4 text-slate-200 font-medium text-sm">
                        {chapter.title}
                      </td>

                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {chapter.subject.name}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400">
                          {chapter.order}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-500 text-sm">

                        {new Date(
                          chapter.createdAt
                        ).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button

                            onClick={() =>
                              openEdit(
                                chapter
                              )
                            }

                            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-indigo-600/10 border border-slate-850 hover:border-indigo-500/20 flex items-center justify-center transition dynamic-btn"
                            title="Edit Chapter"

                          >

                            <Pencil

                              size={14}

                              className="text-slate-400 hover:text-indigo-400 transition-colors"

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

                            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600/10 border border-slate-850 hover:border-red-500/20 flex items-center justify-center transition dynamic-btn"
                            title="Delete Chapter"

                          >

                            <Trash2

                              size={14}

                              className="text-slate-400 hover:text-red-400 transition-colors"

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

        <div className="flex justify-between sm:justify-end items-center gap-4 border-t border-slate-900 pt-5">

          <button

            disabled={page === 1}

            onClick={() =>
              setPage(page - 1)
            }

            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-850 font-medium text-sm transition disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-400"

          >

            Previous

          </button>

          <span className="text-slate-500 text-xs font-medium">
            Page <strong className="text-slate-300 font-semibold">{page}</strong> of <strong className="text-slate-300 font-semibold">{totalPages}</strong>
          </span>

          <button

            disabled={
              page === totalPages
            }

            onClick={() =>
              setPage(page + 1)
            }

            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:bg-slate-850 font-medium text-sm transition disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-400"

          >

            Next

          </button>

        </div>

        {/* ============================================== */}
        {/* CREATE / EDIT MODAL */}
        {/* ============================================== */}

        {showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">

            <div className="w-full max-w-md rounded-2xl border border-slate-900 bg-slate-900 p-6 shadow-xl transform transition-all">

              <div className="flex items-center justify-between border-b border-slate-850 pb-4">

                <h2 className="text-lg font-bold text-white">

                  {editingChapter
                    ? "Edit Chapter"
                    : "Create Chapter"}

                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="p-1 rounded-lg bg-slate-850 hover:bg-slate-800 transition"
                >

                  <X
                    size={16}
                    className="text-slate-400 hover:text-white transition-colors"
                  />

                </button>

              </div>

              <div className="mt-5 space-y-4">

                {/* Chapter Name */}

                <div>

                  <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Chapter Name
                  </label>

                  <input

                    value={title}

                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }

                    className="w-full rounded-xl border border-slate-850 bg-slate-950 px-3.5 py-2 text-slate-200 placeholder-slate-600 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-sm"

                    placeholder="e.g. Laws of Motion"

                  />

                </div>

                {/* Exam Type */}

                <div>

                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Exam Type
                  </label>

                  <SearchableSelect

                    value={examType}

                    onChange={(value) => {

                      setExamType(
                        value as
                          "JEE" |
                          "WBJEE" |
                          "BOARDS"
                      );

                      setSubjectId("");

                    }}

                    placeholder="Select Exam Type"

                    options={[

                      {
                        label: "JEE",
                        value: "JEE",
                      },

                      {
                        label: "WBJEE",
                        value: "WBJEE",
                      },

                      {
                        label: "BOARDS",
                        value: "BOARDS",
                      },

                    ]}

                  />

                </div>

                {/* Subject */}

                <div>

                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Subject
                  </label>

                  <SearchableSelect

                    value={subjectId}

                    onChange={setSubjectId}

                    placeholder="Select Subject"

                    options={[

                      {
                        label: "Select Subject",
                        value: "",
                      },

                      ...subjects.map((subject) => ({

                        label: subject.name,

                        value: subject.id,

                      })),

                    ]}

                  />

                </div>

                {/* Order */}

                <div>

                  <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
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

                    className="w-full rounded-xl border border-slate-850 bg-slate-950 px-3.5 py-2 text-slate-200 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-slate-800 text-sm"

                  />

                </div>

              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-850">

                <button

                  onClick={() =>
                    setShowModal(false)
                  }

                  className="px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium transition"

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

                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition"

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

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">

            <div className="w-full max-w-sm rounded-2xl border border-slate-900 bg-slate-900 p-6 shadow-xl">

              <h2 className="text-lg font-bold text-white">
                Delete Chapter
              </h2>

              <p className="mt-2 text-slate-400 text-sm leading-relaxed border-b border-slate-850 pb-4">
                Are you sure you want to delete this chapter? This action cannot be undone and may clear sub-topics associated with this chapter sequence.
              </p>

              <div className="mt-5 flex justify-end gap-3">

                <button

                  onClick={() =>
                    setShowDelete(false)
                  }

                  className="px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium transition"

                >
                  Cancel
                </button>

                <button

                  onClick={handleDelete}

                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition"

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