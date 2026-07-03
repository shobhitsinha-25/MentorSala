import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {

Search,

Plus,

Pencil,

Trash2,

} from "lucide-react";

import type {

Test,

} from "../../../services/admin/test.service";

import {

getTests,

deleteTest,

} from "../../../services/admin/test.service";

const Tests = () => {

const [tests, setTests] =
useState<Test[]>([]);

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

const [testType, setTestType] =
useState("");

const [published, setPublished] =
useState("");

const [showDelete, setShowDelete] =
useState(false);

const [deleteId, setDeleteId] =
useState("");

const loadTests =
async ()=>{

try{

setLoading(true);

const res =
await getTests(

page,

search,

examType,

testType,

published

);

setTests(
res.tests
);

setTotalPages(

res.pagination.pages

);

}

catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};

useEffect(()=>{

loadTests();

},[

page,

search,

examType,

testType,

published

]);

const handleDelete =
async()=>{

try{

await deleteTest(

deleteId

);

toast.success(

"Test deleted."

);

setShowDelete(false);

loadTests();

}

catch(err:any){

toast.error(

err.response?.data?.message||

"Delete failed."

);

}

};
  // ======================================================
  // UI
  // ======================================================

  return (

    <div>

      {/* ============================================== */}
      {/* HEADER */}
      {/* ============================================== */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black text-white">

            Tests

          </h1>

          <p className="mt-2 text-slate-400">

            Manage all mock tests and chapter tests.

          </p>

        </div>

        <Link

          to="/admin/tests/create"

          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-500"

        >

          <Plus size={18} />

          Create Test

        </Link>

      </div>

      {/* ============================================== */}
      {/* FILTERS */}
      {/* ============================================== */}

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-5">

        <div className="relative lg:col-span-2">

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

            placeholder="Search Test"

            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white"

          />

        </div>

        <select

          value={examType}

          onChange={(e)=>
            setExamType(
              e.target.value
            )
          }

          className="rounded-xl border border-slate-700 bg-slate-900 px-4 text-white"

        >

          <option value="">

            All Exams

          </option>

          <option value="JEE">

            JEE

          </option>

          <option value="WBJEE">

            WBJEE

          </option>

          <option value="CBSE">

            CBSE

          </option>

        </select>

        <select

          value={testType}

          onChange={(e)=>
            setTestType(
              e.target.value
            )
          }

          className="rounded-xl border border-slate-700 bg-slate-900 px-4 text-white"

        >

          <option value="">

            Test Type

          </option>

          <option value="CHAPTER">

            Chapter Test

          </option>

          <option value="SUBJECT">

            Subject Test

          </option>

          <option value="MOCK">

            Mock Test

          </option>

        </select>

        <select

          value={published}

          onChange={(e)=>
            setPublished(
              e.target.value
            )
          }

          className="rounded-xl border border-slate-700 bg-slate-900 px-4 text-white"

        >

          <option value="">

            Status

          </option>

          <option value="true">

            Published

          </option>

          <option value="false">

            Draft

          </option>

        </select>

      </div>

      {/* ============================================== */}
      {/* TABLE */}
      {/* ============================================== */}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="px-6 py-4 text-left text-slate-400">

                Title

              </th>

              <th className="px-6 py-4 text-left text-slate-400">

                Exam

              </th>

              <th className="px-6 py-4 text-left text-slate-400">

                Type

              </th>

              <th className="px-6 py-4 text-left text-slate-400">

                Questions

              </th>

              <th className="px-6 py-4 text-left text-slate-400">

                Duration

              </th>

              <th className="px-6 py-4 text-center text-slate-400">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              loading ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-10 text-center text-slate-400"

                  >

                    Loading...

                  </td>

                </tr>

              )

              :

              tests.length===0 ? (

                <tr>

                  <td

                    colSpan={6}

                    className="py-10 text-center text-slate-500"

                  >

                    No Tests Found

                  </td>

                </tr>

              )

              :

              tests.map(test=>(

                <tr

                  key={test.id}

                  className="border-t border-slate-800 hover:bg-slate-900/40"

                >

                  <td className="px-6 py-5 text-white">

                    {test.title}

                  </td>

                  <td className="px-6 py-5 text-slate-300">

                    {test.examType}

                  </td>

                  <td className="px-6 py-5">

                    <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300">

                      {test.type}

                    </span>

                  </td>

                  <td className="px-6 py-5 text-slate-300">

                    {test.totalQuestions}

                  </td>

                  <td className="px-6 py-5 text-slate-300">

                    {test.duration} mins

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <Link

                        to={`/admin/tests/${test.id}/edit`}

                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10"

                      >

                        <Pencil

                          size={16}

                          className="text-indigo-400"

                        />

                      </Link>

                      <button

                        onClick={()=>{

                          setDeleteId(

                            test.id

                          );

                          setShowDelete(true);

                        }}

                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10"

                      >

                        <Trash2

                          size={16}

                          className="text-red-400"

                        />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>
            {/* ============================================== */}
      {/* PAGINATION */}
      {/* ============================================== */}

      <div className="mt-6 flex items-center justify-end gap-3">

        <button

          disabled={page === 1}

          onClick={() =>
            setPage(page - 1)
          }

          className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-50"

        >

          Previous

        </button>

        <span className="text-slate-300">

          {page} / {totalPages}

        </span>

        <button

          disabled={
            page === totalPages
          }

          onClick={() =>
            setPage(page + 1)
          }

          className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-50"

        >

          Next

        </button>

      </div>

      {/* ============================================== */}
      {/* DELETE MODAL */}
      {/* ============================================== */}

      {showDelete && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6">

            <h2 className="text-2xl font-bold text-white">

              Delete Test

            </h2>

            <p className="mt-3 text-slate-400">

              Are you sure you want to delete this test?

            </p>

            <div className="mt-8 flex justify-end gap-3">

              <button

                onClick={() =>
                  setShowDelete(false)
                }

                className="rounded-xl bg-slate-700 px-5 py-3 text-white hover:bg-slate-600"

              >

                Cancel

              </button>

              <button

                onClick={handleDelete}

                className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500"

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

export default Tests;