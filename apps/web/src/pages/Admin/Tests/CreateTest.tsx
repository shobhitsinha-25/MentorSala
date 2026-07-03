import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  getSubjects,
} from "../../../services/admin/subject.service";

import {
  getChapters,
} from "../../../services/admin/chapter.service";

import {
  createTest,
} from "../../../services/admin/test.service";

import type {
  Subject,
} from "../../../services/admin/subject.service";

import type {
  Chapter,
} from "../../../services/admin/chapter.service";

const CreateTest = () => {

  const navigate =
    useNavigate();

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [chapters, setChapters] =
    useState<Chapter[]>([]);

  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // FORM
  // ======================================================

  const [title, setTitle] =
    useState("");

  const [examType, setExamType] =
    useState("JEE");

  const [subjectId, setSubjectId] =
    useState("");

  const [chapterId, setChapterId] =
    useState("");

  const [testType, setTestType] =
    useState("CHAPTER");

  const [duration, setDuration] =
    useState(60);

  const [instructions, setInstructions] =
    useState("");

  const [marksPerQuestion, setMarksPerQuestion] =
    useState(4);

  const [negativeMarks, setNegativeMarks] =
    useState(1);

  const [subscriptionPlanId, setSubscriptionPlanId] =
    useState("");

  const [published, setPublished] =
    useState(true);
  
  const [description, setDescription] =
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

      console.log(err);

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

      console.log(err);

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

  // ======================================================
  // SAVE
  // ======================================================

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        const res = await createTest({

  title,

  description,

  examType,

  type: testType,

  subjectId:
    subjectId || undefined,

  chapterId:
    chapterId || undefined,

  duration,

  negativeMarks,

  instructions,

  maxAttempts: 1,

  subscriptionPlanId:
    subscriptionPlanId || undefined,

});

        toast.success(
          "Test created successfully."
        );

        navigate(

          `/admin/tests/${res.test.id}/edit`

        );

      }

      catch (err: any) {

  console.log(err);

  console.log(err.response);

  console.log(err.response?.data);

  toast.error(

    err.response?.data?.message ||

    JSON.stringify(err.response?.data) ||

    "Failed to create test."

  );

}

      finally {

        setLoading(false);

      }

    };
      // ======================================================
  // UI
  // ======================================================

  return (

    <div className="max-w-6xl">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div>

        <h1 className="text-4xl font-black text-white">

          Create Test

        </h1>

        <p className="mt-2 text-slate-400">

          Configure a new test before adding questions.

        </p>

      </div>

      {/* ============================================= */}
      {/* FORM */}
      {/* ============================================= */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="grid gap-6 md:grid-cols-2">

          {/* Title */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-slate-400">

              Test Title

            </label>

            <input

              value={title}

              onChange={(e)=>

                setTitle(

                  e.target.value

                )

              }

              placeholder="JEE Physics Mock Test 1"

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            />

          </div>

          {/* Exam */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Exam Type

            </label>

            <select

              value={examType}

              onChange={(e)=>

                setExamType(

                  e.target.value

                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

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

          {/* Test Type */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Test Type

            </label>

            <select

              value={testType}

              onChange={(e)=>

                setTestType(

                  e.target.value

                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            >

              <option value="CHAPTER">

                Chapter Test

              </option>

              <option value="SUBJECT">

                Subject Test

              </option>

              <option value="PRACTICE">
                  Practice Test
              </option>

              <option value="MOCK">

                Mock Test

              </option>

              <option value="PYQ">

                PYQ Test

              </option>

            </select>

          </div>

          {/* Subject */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Subject

            </label>

            <select

              value={subjectId}

              onChange={(e)=>

                setSubjectId(

                  e.target.value

                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            >

              <option value="">

                Select Subject

              </option>

              {

                subjects.map(subject=>(

                  <option

                    key={subject.id}

                    value={subject.id}

                  >

                    {subject.name}

                  </option>

                ))

              }

            </select>

          </div>

          {/* Chapter */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Chapter

            </label>

            <select

              value={chapterId}

              onChange={(e)=>

                setChapterId(

                  e.target.value

                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            >

              <option value="">

                Select Chapter

              </option>

              {

                chapters.map(chapter=>(

                  <option

                    key={chapter.id}

                    value={chapter.id}

                  >

                    {chapter.title}

                  </option>

                ))

              }

            </select>

          </div>

          {/* Duration */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Duration (Minutes)

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

          {/* Marks */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">

              Marks Per Question

            </label>

            <input

              type="number"

              value={marksPerQuestion}

              onChange={(e)=>

                setMarksPerQuestion(

                  Number(

                    e.target.value

                  )

                )

              }

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"

            />

          </div>

          {/* Negative */}

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

          {/* Published */}

          <div className="flex items-end">

            <label className="flex items-center gap-3 text-white">

              <input

                type="checkbox"

                checked={published}

                onChange={(e)=>

                  setPublished(

                    e.target.checked

                  )

                }

              />

              Publish Test

            </label>

          </div>

          {/* Instructions */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-slate-400">

              Instructions

            </label>

            <textarea

              rows={6}

              value={instructions}

              onChange={(e)=>

                setInstructions(

                  e.target.value

                )

              }

              placeholder="Enter instructions for students..."

              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white"

            />

          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button

            disabled={loading}

            onClick={handleSubmit}

            className="rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white hover:bg-indigo-500 disabled:opacity-50"

          >

            {

              loading

                ? "Creating..."

                : "Create Test"

            }

          </button>

        </div>

      </div>

    </div>

  );

};

export default CreateTest;