import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  ArrowLeft,
  Save,
  ListChecks,
} from "lucide-react";

import {
  getTestById,
  updateTest,
} from "../../../services/admin/test.service";

const EditTest = () => {

  const { testId } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [duration, setDuration] =
    useState(60);

  const [negativeMarks, setNegativeMarks] =
    useState(0);

  const [status, setStatus] =
    useState("DRAFT");

  const loadTest = async () => {

    try {

      const res =
        await getTestById(
          testId as string
        );

      const test =
        res.test;

      setTitle(
        test.title
      );

      setDescription(
        test.description ?? ""
      );

      setInstructions(
        test.instructions ?? ""
      );

      setDuration(
        test.duration
      );

      setNegativeMarks(
        test.negativeMarks
      );

      setStatus(
        test.status
      );

    }

    catch (err: any) {

      toast.error(

        err.response?.data?.message ||

        "Failed to load test."

      );

      navigate(
        "/admin/tests"
      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadTest();

  }, []);

  const handleSave =
    async () => {

      try {

        setSaving(true);

        await updateTest(

          testId as string,

          {

            title,

            description,

            instructions,

            duration,

            negativeMarks,

            status,

          }

        );

        toast.success(
          "Test updated successfully."
        );

      }

      catch (err: any) {

        toast.error(

          err.response?.data?.message ||

          "Failed to update test."

        );

      }

      finally {

        setSaving(false);

      }

    };

  if (loading) {

    return (

      <div className="flex h-96 items-center justify-center text-white">

        Loading...

      </div>

    );

  }

  return (

    <div className="max-w-5xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <Link

            to="/admin/tests"

            className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-white"

          >

            <ArrowLeft size={18} />

            Back

          </Link>

          <h1 className="text-4xl font-black text-white">

            Edit Test

          </h1>

        </div>

        <Link

          to={`/admin/tests/${testId}/builder`}

          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-500"

        >

          <ListChecks size={18} />

         Manage Questions

        </Link>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="grid gap-6">

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Title

            </label>

            <input

              value={title}

              onChange={(e)=>

                setTitle(
                  e.target.value
                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Description

            </label>

            <textarea

              rows={3}

              value={description}

              onChange={(e)=>

                setDescription(
                  e.target.value
                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Instructions

            </label>

            <textarea

              rows={5}

              value={instructions}

              onChange={(e)=>

                setInstructions(
                  e.target.value
                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            />

          </div>

          <div className="grid grid-cols-3 gap-5">

            <div>

              <label className="mb-2 block text-sm text-slate-400">

                Duration

              </label>

              <input

                type="number"

                value={duration}

                onChange={(e)=>

                  setDuration(

                    Number(
                      e.target.value
                    )

                  )

                }

                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-400">

                Negative Marks

              </label>

              <input

                type="number"

                step="0.25"

                value={negativeMarks}

                onChange={(e)=>

                  setNegativeMarks(

                    Number(
                      e.target.value
                    )

                  )

                }

                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-400">

                Status

              </label>

              <select

                value={status}

                onChange={(e)=>

                  setStatus(
                    e.target.value
                  )

                }

                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

              >

                <option value="DRAFT">

                  Draft

                </option>

                <option value="PUBLISHED">

                  Published

                </option>

              </select>

            </div>

          </div>

          <div className="mt-4 flex justify-end">

            <button

              onClick={handleSave}

              disabled={saving}

              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-bold text-white hover:bg-emerald-500"

            >

              <Save size={18} />

              {

                saving

                  ? "Saving..."

                  : "Save Changes"

              }

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default EditTest;