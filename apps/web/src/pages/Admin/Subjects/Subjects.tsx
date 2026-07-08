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
  Subject,
} from "../../../services/admin/subject.service";

import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../../../services/admin/subject.service";
import SearchableSelect from "../../../components/ui/SearchableSelect";

const Subjects = () => {

  // ======================================================
  // STATES
  // ======================================================

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // ======================================================
  // CREATE / EDIT MODAL
  // ======================================================

  const [showModal, setShowModal] =
    useState(false);

  const [editingSubject, setEditingSubject] =
    useState<Subject | null>(null);

  const [name, setName] =
    useState("");

  const [examType, setExamType] =
    useState<"JEE" | "WBJEE" | "BOARDS">("JEE");

  // ======================================================
  // DELETE MODAL
  // ======================================================

  const [showDelete, setShowDelete] =
    useState(false);

  const [deleteSubjectId, setDeleteSubjectId] =
    useState("");

  // ======================================================
  // LOAD SUBJECTS
  // ======================================================

  const loadSubjects = async () => {

    try {

      setLoading(true);

      const res =
        await getSubjects(
          page,
          search
        );

      setSubjects(
        res.subjects
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

  }, [page, search]);

  // ======================================================
  // CREATE SUBJECT
  // ======================================================

  const handleCreate = async () => {

    try {

      await createSubject({

        name,

        examType,

      });
      toast.success(
        "Subject created successfully."
      );

      setShowModal(false);

      setName("");

      setExamType("JEE");

      loadSubjects();

    }

    catch (err: any) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to create subject."
      );

    }

  };

  // ======================================================
  // UPDATE SUBJECT
  // ======================================================

  const handleUpdate = async () => {

    if (!editingSubject) return;

    try {

      await updateSubject(

        editingSubject.id,

        {

          name,

          examType,

          published:
            editingSubject.published,

        }

      );

      toast.success(
        "Subject updated successfully."
      );

      setEditingSubject(null);

      setShowModal(false);

      setName("");

      loadSubjects();

    }
    catch (err: any) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to update subject."
      );

    }
  };

  // ======================================================
  // DELETE SUBJECT
  // ======================================================

  const handleDelete = async () => {

    try {

      await deleteSubject(
        deleteSubjectId
      );

      toast.success(
        "Subject deleted successfully."
      );

      setShowDelete(false);

      loadSubjects();

    }
    catch (err: any) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to delete subject."
      );

    }
  };

  // ======================================================
  // OPEN EDIT
  // ======================================================

  const openEdit = (
    subject: Subject
  ) => {

    setEditingSubject(subject);

    setName(subject.name);

    setExamType(subject.examType);

    setShowModal(true);

  };

  // ======================================================
  // OPEN CREATE
  // ======================================================

  const openCreate = () => {

    setEditingSubject(null);

    setName("");

    setExamType("JEE");

    setShowModal(true);

  };

  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ============================================== */}
        {/* PAGE HEADER */}
        {/* ============================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">

          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">

              Subjects

            </h1>

            <p className="text-slate-400 mt-2 text-sm md:text-base">

              Manage all subjects available in MentorSala.

            </p>

          </div>

          <button

            onClick={openCreate}

            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 px-5 py-3 rounded-xl text-white font-semibold text-sm tracking-wide"

          >

            <Plus size={18} />

            Add Subject

          </button>

        </div>

        {/* ============================================== */}
        {/* SEARCH */}
        {/* ============================================== */}

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

          <div className="relative w-full max-w-md">

            <Search

              size={18}

              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"

            />

            <input

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              placeholder="Search Subject..."

              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-slate-200 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-slate-900"

            />

          </div>

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

                    Name

                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Exam

                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">

                    Status

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
                        <span className="text-sm font-medium text-slate-400">Loading subjects...</span>
                      </div>

                    </td>

                  </tr>

                ) : subjects.length === 0 ? (

                  <tr>

                    <td

                      colSpan={5}

                      className="text-center py-20 text-slate-500"

                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <BookOpen size={36} className="text-slate-600 mb-1" />
                        <span className="text-base font-medium text-slate-400">No Subjects Found</span>
                        <span className="text-xs text-slate-500">Try checking your spelling or clear the search filter.</span>
                      </div>

                    </td>

                  </tr>

                ) : (

                  subjects.map((subject) => (

                    <tr

                      key={subject.id}

                      className="hover:bg-slate-900/40 transition-colors group"

                    >

                      <td className="px-6 py-4.5 text-slate-200 font-medium">

                        {subject.name}

                      </td>

                      <td className="px-6 py-4.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide border ${
                          subject.examType === 'JEE' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                          subject.examType === 'WBJEE' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                          'bg-purple-500/10 border-purple-500/20 text-purple-400'
                        }`}>
                          {subject.examType}
                        </span>

                      </td>

                      <td className="px-6 py-4.5">

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active
                        </span>

                      </td>

                      <td className="px-6 py-4.5 text-slate-400 text-sm">

                        {new Date(
                          subject.createdAt
                        ).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}

                      </td>

                      <td className="px-6 py-4.5">

                        <div className="flex justify-center gap-2">

                          <button

                            onClick={() =>
                              openEdit(subject)
                            }

                            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/30 flex items-center justify-center transition-all group/btn"
                            title="Edit Subject"

                          >

                            <Pencil

                              size={14}

                              className="text-slate-400 group-hover/btn:text-indigo-400 transition-colors"

                            />

                          </button>

                          <button

                            onClick={() => {

                              setDeleteSubjectId(
                                subject.id
                              );

                              setShowDelete(true);

                            }}

                            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600/20 border border-slate-700 hover:border-red-500/30 flex items-center justify-center transition-all group/btn"
                            title="Delete Subject"

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

            disabled={page === totalPages}

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

          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">

            <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl shadow-black/50 transform transition-all">

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">

                <h2 className="text-xl font-bold text-white tracking-wide">

                  {editingSubject
                    ? "Edit Subject"
                    : "Create Subject"}

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

                <div>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">

                    Subject Name

                  </label>

                  <input

                    value={name}

                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }

                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-slate-200 placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"

                    placeholder="e.g. Advanced Physics"

                  />

                </div>

                <div>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">

                    Exam Type

                  </label>

                  <SearchableSelect
  value={examType}
  onChange={(value) =>
    setExamType(
      value as "JEE" | "WBJEE" | "BOARDS"
    )
  }
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

              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-800">

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
                      editingSubject
                    ) {

                      handleUpdate();

                    }

                    else {

                      handleCreate();

                    }

                  }}

                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-indigo-600/10 transition"

                >

                  {editingSubject
                    ? "Update Subject"
                    : "Create Subject"}

                </button>

              </div>

            </div>

          </div>

        )}

        {/* ============================================== */}
        {/* DELETE MODAL */}
        {/* ============================================== */}

        {showDelete && (

          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">

            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl shadow-black/50">

              <h2 className="text-xl font-bold text-white tracking-wide">

                Delete Subject

              </h2>

              <p className="text-slate-400 mt-3 text-sm leading-relaxed border-b border-slate-800/60 pb-4">

                Are you sure you want to delete this subject? This action cannot be undone and may affect associated courses.

              </p>

              <div className="flex justify-end gap-3 mt-6">

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

export default Subjects;