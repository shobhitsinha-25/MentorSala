import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import QuestionForm from "./QuestionForm";

import {
  getQuestionById,
  updateQuestion,
} from "../../../services/admin/question.service";

const EditQuestion = () => {

  const { questionId } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [question, setQuestion] =
    useState<any>(null);

  // ======================================================
  // LOAD QUESTION
  // ======================================================

  useEffect(() => {

    const loadQuestion =
      async () => {

        try {

          const res =
            await getQuestionById(
              questionId as string
            );

          setQuestion(
            res.question
          );

        }

        catch (err: any) {

          toast.error(

            err.response?.data?.message ||

            "Failed to load question."

          );

          navigate(
            "/admin/questions"
          );

        }

        finally {

          setLoading(false);

        }

      };

    loadQuestion();

  }, []);

  // ======================================================
  // UPDATE
  // ======================================================

  const handleSubmit =
    async (values: any) => {

      try {

        await updateQuestion(

          questionId as string,

          values

        );

        toast.success(
          "Question updated successfully."
        );

        navigate(
          "/admin/questions"
        );

      }

      catch (err: any) {

        toast.error(

          err.response?.data?.message ||

          "Failed to update question."

        );

      }

    };

  if (loading) {

    return (

      <div className="bg-slate-950 p-4 text-slate-100 min-h-screen flex items-center justify-center">

        <div className="flex flex-col items-center justify-center gap-2 text-slate-450">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />

          <span className="text-xs font-medium text-slate-400">Loading asset configurations...</span>

        </div>

      </div>

    );

  }

  return (

    <div className="bg-slate-950 p-4 text-slate-100 min-h-screen flex flex-col gap-4">

      {/* ============================================== */}
      {/* HEADER */}
      {/* ============================================== */}

      <div className="border-b border-slate-850 pb-3">

        <h1 className="text-xl font-bold tracking-tight text-white">

          Edit Question

        </h1>

        <p className="mt-0.5 text-xs text-slate-400">

          Modify parameters, choices, and difficulty configuration settings for this entry instance.

        </p>

      </div>

      {/* ============================================== */}
      {/* FORM WRAPPER COMPONENT */}
      {/* ============================================== */}

      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-4 shadow-md shadow-black/10">

        <QuestionForm

          initialValues={question}

          onSubmit={handleSubmit}

        />

      </div>

    </div>

  );

};

export default EditQuestion;