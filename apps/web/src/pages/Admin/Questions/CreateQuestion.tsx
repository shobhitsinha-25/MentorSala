import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import QuestionForm from "./QuestionForm";

import {
  createQuestion,
} from "../../../services/admin/question.service";

const CreateQuestion = () => {

  const navigate =
    useNavigate();

  const handleSubmit =
    async (values: any) => {

      try {

        await createQuestion(values);

        toast.success(
          "Question created successfully."
        );

        navigate(
          "/admin/questions"
        );

      }

      catch (err: any) {

        toast.error(

          err.response?.data?.message ||

          "Failed to create question."

        );

      }

    };

  return (

    <div className="bg-slate-950 p-4 text-slate-100 min-h-screen flex flex-col gap-4">

      {/* ============================================== */}
      {/* HEADER */}
      {/* ============================================== */}

      <div className="border-b border-slate-850 pb-3">

        <h1 className="text-xl font-bold tracking-tight text-white">

          Create Question

        </h1>

        <p className="mt-0.5 text-xs text-slate-400">

          Add a new question instance directly to the question bank system repository.

        </p>

      </div>

      {/* ============================================== */}
      {/* FORM WRAPPER COMPONENT */}
      {/* ============================================== */}

      <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-4 shadow-md shadow-black/10">

        <QuestionForm

          onSubmit={handleSubmit}

        />

      </div>

    </div>

  );

};

export default CreateQuestion;