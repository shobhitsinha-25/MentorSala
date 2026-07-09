import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getSubjects,
} from "../../../services/admin/subject.service";

import {
  getChapters,getAllChapters
} from "../../../services/admin/chapter.service";

import type {
  Subject,
} from "../../../services/admin/subject.service";

import type {
  Chapter,
} from "../../../services/admin/chapter.service";

import { uploadImage } from "../../../services/upload.service";
import SearchableSelect from "../../../components/ui/SearchableSelect";

interface Props {
  initialValues?: any;
  onSubmit: (
    values: any
  ) => Promise<void>;
}

interface QuestionOption {
  key: string;
  text: string;
}

const QuestionForm = ({
  initialValues,
  onSubmit,
}: Props) => {

  // ======================================================
  // STATES
  // ======================================================

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [chapters, setChapters] =
    useState<Chapter[]>([]);

  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // FORM
  // ======================================================

  const [examType, setExamType] =
    useState<"JEE" | "WBJEE" | "BOARDS">(
      initialValues?.examType ??
      "JEE"
    );

  const [subjectId, setSubjectId] =
    useState(
      initialValues?.subjectId ??
      ""
    );

  const [chapterId, setChapterId] =
    useState(
      initialValues?.chapterId ??
      ""
    );

  const [questionType, setQuestionType] =
    useState(
      initialValues?.questionType ??
      "SINGLE_CORRECT"
    );

  const [difficulty, setDifficulty] =
    useState(
      initialValues?.difficulty ??
      "MEDIUM"
    );

  const [question, setQuestion] =
    useState(
      initialValues?.question ??
      ""
    );

  const [questionImageUrl, setQuestionImageUrl] =
    useState(
      initialValues?.questionImageUrl ?? ""
    );

  const [optionImages, setOptionImages] =
    useState<Record<string, string>>(
      initialValues?.optionImages ?? {
        A: "",
        B: "",
        C: "",
        D: "",
      }
    );

  const [uploadingQuestionImage, setUploadingQuestionImage] =
    useState(false);

  const [options, setOptions] = useState<QuestionOption[]>(
    initialValues?.options ?? [
      { key: "A", text: "" },
      { key: "B", text: "" },
      { key: "C", text: "" },
      { key: "D", text: "" },
    ]
  );

  const [answer, setAnswer] =
    useState<string[]>(
      initialValues?.answer ??
      []
    );

  const [solution, setSolution] =
    useState(
      initialValues?.solution ??
      ""
    );

  const [solutionImageUrl, setSolutionImageUrl] =
    useState(
      initialValues?.solutionImageUrl ?? ""
    );

  const [uploadingSolutionImage, setUploadingSolutionImage] =
    useState(false);

  const [marks, setMarks] =
    useState(
      initialValues?.marks ??
      4
    );

  const [negativeMarks, setNegativeMarks] =
    useState(
      initialValues?.negativeMarks ??
      1
    );

  const [year, setYear] =
    useState(
      initialValues?.year ??
      new Date().getFullYear()
    );

  const [isPremium, setIsPremium] =
    useState(
      initialValues?.isPremium ??
      false
    );

  const [published, setPublished] =
    useState(
      initialValues?.published ??
      true
    );

  // ======================================================
  // LOAD SUBJECTS
  // ======================================================

  const loadSubjects = async () => {
    const res =
      await getSubjects(
        1,
        "",
        examType
      );
    setSubjects(
      res.subjects
    );
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

    const res = await getAllChapters(subjectId);

    setChapters(res.chapters);

  }

  catch {

    setChapters([]);

    toast.error("Failed to load chapters.");

  }

};

  useEffect(() => {
    loadSubjects();
  }, [examType]);

  useEffect(() => {
    loadChapters();
  }, [subjectId]);

  // ======================================================
  // OPTION CHANGE
  // ======================================================

  const updateOption = (
    index: number,
    value: string
  ) => {
    const copy = [...options];
    copy[index].text = value;
    setOptions(copy);
  };

  // ======================================================
  // QUESTION IMAGE
  // ======================================================

  const handleQuestionImageUpload =
    async (
      file: File
    ) => {
      try {
        setUploadingQuestionImage(true);
        const url =
          await uploadImage(file);
        setQuestionImageUrl(url);
        toast.success(
          "Question image uploaded."
        );
      }
      catch {
        toast.error(
          "Image upload failed."
        );
      }
      finally {
        setUploadingQuestionImage(false);
      }
    };

  // ======================================================
  // OPTION IMAGE
  // ======================================================

  const handleOptionImageUpload =
    async (
      key: string,
      file: File
    ) => {
      try {
        const url =
          await uploadImage(file);
        setOptionImages(
          prev => ({
            ...prev,
            [key]: url,
          })
        );
        toast.success(
          `${key} image uploaded.`
        );
      }
      catch {
        toast.error(
          "Image upload failed."
        );
      }
    };

  // ======================================================
  // SOLUTION IMAGE
  // ======================================================

  const handleSolutionImageUpload =
    async (file: File) => {
      try {
        setUploadingSolutionImage(true);
        const url =
          await uploadImage(file);
        setSolutionImageUrl(url);
        toast.success(
          "Solution image uploaded."
        );
      }
      catch {
        toast.error(
          "Image upload failed."
        );
      }
      finally {
        setUploadingSolutionImage(false);
      }
    };

  // ======================================================
  // SAVE
  // ======================================================

  const handleSubmit =
    async () => {
      try {
        setLoading(true);
        await onSubmit({
          examType,
          subjectId,
          chapterId,
          questionType,
          difficulty,
          question,
          questionImageUrl,
          options,
          optionImages,
          answer,
          solution,
          solutionImageUrl,
          marks,
          negativeMarks,
          year,
          isPremium,
          published,
        });
      }
      catch (err: any) {
        toast.error(
          err.response?.data?.message ||
          "Failed to save question."
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
    <div className="max-w-5xl mx-auto space-y-8 pb-16 antialiased">

      {/* ============================================= */}
      {/* BASIC INFORMATION */}
      {/* ============================================= */}

      {/* FIX: Set a high base stack index (z-30) for the card to flow cleanly over following sections */}
      <div className="relative z-30 rounded-2xl bg-slate-900 border border-slate-800/80 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="h-2 w-2 rounded-full bg-indigo-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Basic Information
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">

          {/* Exam Type - Highest Row Stacking Context */}
          <div className="flex flex-col gap-2 relative z-25">

            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Exam Type
            </label>

            <SearchableSelect
              value={examType}
              onChange={(value) => {
                setExamType(
                  value as
                    | "JEE"
                    | "WBJEE"
                    | "BOARDS"
                );
                setSubjectId("");
                setChapterId("");
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

          {/* Subject - Mid Row Stacking Context */}
          <div className="flex flex-col gap-2 relative z-24">

            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Subject
            </label>

            <SearchableSelect
              value={subjectId}
              onChange={(value) => {
                setSubjectId(value);
                setChapterId("");
              }}
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

          {/* Chapter - Mid Row Stacking Context */}
          <div className="flex flex-col gap-2 relative z-23">

            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chapter
            </label>

            <SearchableSelect
              value={chapterId}
              onChange={setChapterId}
              placeholder="Select Chapter"
              options={[
                {
                  label: "Select Chapter",
                  value: "",
                },
                ...chapters.map((chapter) => ({
                  label: chapter.title,
                  value: chapter.id,
                })),
              ]}
            />

          </div>

          {/* Question Type - Lower Row Stacking Context */}
          <div className="flex flex-col gap-2 relative z-22">

            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Question Type
            </label>

            <SearchableSelect
              value={questionType}
              onChange={setQuestionType}
              placeholder="Select Question Type"
              options={[
                {
                  label: "Single Correct",
                  value: "SINGLE_CORRECT",
                },
                {
                  label: "Multiple Correct",
                  value: "MULTIPLE_CORRECT",
                },
                {
                  label: "Integer",
                  value: "INTEGER",
                },
                {
                  label: "Assertion & Reason",
                  value: "ASSERTION_REASON",
                },
              ]}
            />

          </div>

          {/* Difficulty - Lower Row Stacking Context */}
          <div className="flex flex-col gap-2 relative z-21">

            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Difficulty
            </label>

            <SearchableSelect
              value={difficulty}
              onChange={setDifficulty}
              placeholder="Select Difficulty"
              options={[
                {
                  label: "Easy",
                  value: "EASY",
                },
                {
                  label: "Medium",
                  value: "MEDIUM",
                },
                {
                  label: "Hard",
                  value: "HARD",
                },
              ]}
            />

          </div>

          {/* Year - Ground Stacking Context */}
          <div className="flex flex-col gap-2 relative z-10">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full rounded-xl bg-slate-800 border border-slate-700/60 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

        </div>
      </div>

      {/* ============================================= */}
      {/* QUESTION */}
      {/* ============================================= */}

      {/* FIX: Layer dropped to z-20 so it falls cleanly beneath the Basic Info selections above */}
      <div className="relative z-20 rounded-2xl bg-slate-900 border border-slate-800/80 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="h-2 w-2 rounded-full bg-violet-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Question Statement
          </h2>
        </div>

        <textarea
          rows={5}
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Type the formal question core or contextual problem description here..."
          className="w-full rounded-xl bg-slate-800 border border-slate-700/60 px-4 py-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none leading-relaxed"
        />

        <div className="mt-5 bg-slate-950/40 p-5 border border-slate-800/60 rounded-xl">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Question Supporting Graphic
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="relative cursor-pointer flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-300 transition shadow-sm">
              <span>{uploadingQuestionImage ? "Uploading..." : "Choose Image File"}</span>
              <input
                type="file"
                accept="image/*"
                disabled={uploadingQuestionImage}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleQuestionImageUpload(file);
                  }
                }}
                className="hidden"
              />
            </label>
            <span className="text-xs text-slate-500">Supports standard dynamic pixel assets PNG, JPG, or WEBP up to 5MB.</span>
          </div>

          {questionImageUrl && (
            <div className="mt-4 relative group rounded-xl overflow-hidden border border-slate-800 w-fit max-w-full bg-slate-900">
              <img
                src={questionImageUrl}
                alt="Question payload representation"
                className="max-h-64 object-contain mx-auto p-2"
              />
            </div>
          )}
        </div>
      </div>

      {/* ============================================= */}
      {/* OPTIONS */}
      {/* ============================================= */}

      {questionType !== "INTEGER" && (
        <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight text-slate-100">
              Response Configuration Elements
            </h2>
          </div>

          <div className="space-y-5">
            {options.map((option, index) => (
              <div
                key={option.key}
                className="rounded-xl border border-slate-800/80 bg-slate-950/20 p-5 group hover:border-slate-700/80 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-indigo-400 font-bold text-sm shadow-inner group-hover:bg-indigo-950/30 group-hover:border-indigo-500/30 transition-colors">
                    {option.key}
                  </div>
                  <div className="flex-1">
                    <input
                      value={option.text}
                      onChange={(e) =>
                        updateOption(
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Provide full textual properties for variant ${option.key}`}
                      className="w-full rounded-xl bg-slate-800 border border-slate-700/60 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                    />

                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition">
                        <span>Upload Option Asset</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleOptionImageUpload(
                                option.key,
                                file
                              );
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      {optionImages[option.key] && (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          ✓ External Graphic Linked
                        </span>
                      )}
                    </div>

                    {optionImages[option.key] && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-900 w-fit max-w-full">
                        <img
                          src={optionImages[option.key]}
                          alt={`Option ${option.key} resource visualization`}
                          className="max-h-40 object-contain p-1.5"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================= */}
      {/* ANSWER */}
      {/* ============================================= */}

      <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="h-2 w-2 rounded-full bg-amber-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Designated Solution Target Keys
          </h2>
        </div>

        {/* SINGLE CORRECT */}
        {questionType === "SINGLE_CORRECT" && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {options.map((option) => {
              const isActive = answer.includes(option.key);
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() =>
                    setAnswer([
                      option.key,
                    ])
                  }
                  className={`rounded-xl border p-4 font-bold text-sm tracking-wide transition-all duration-200 transform active:scale-95 shadow-md ${
                    isActive
                      ? "border-indigo-500 bg-indigo-600 text-white ring-2 ring-indigo-500/20"
                      : "border-slate-700/80 bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  Option {option.key}
                </button>
              );
            })}
          </div>
        )}

        {/* MULTIPLE CORRECT */}
        {questionType === "MULTIPLE_CORRECT" && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {options.map((option) => {
              const isActive = answer.includes(option.key);
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    if (
                      answer.includes(option.key)
                    ) {
                      setAnswer(
                        answer.filter(
                          (item) =>
                            item !== option.key
                        )
                      );
                    }
                    else {
                      setAnswer([
                        ...answer,
                        option.key,
                      ]);
                    }
                  }}
                  className={`rounded-xl border p-4 font-bold text-sm tracking-wide transition-all duration-200 transform active:scale-95 shadow-md ${
                    isActive
                      ? "border-indigo-500 bg-indigo-600 text-white ring-2 ring-indigo-500/20"
                      : "border-slate-700/80 bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  Option {option.key}
                </button>
              );
            })}
          </div>
        )}

        {/* INTEGER */}
        {questionType === "INTEGER" && (
          <div className="max-w-md">
            <input
              value={answer[0] ?? ""}
              onChange={(e) =>
                setAnswer([
                  e.target.value,
                ])
              }
              placeholder="Provide exact matching target numeric calculation payload..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm text-slate-200 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
        )}

        {/* ASSERTION & REASON */}
        {questionType === "ASSERTION_REASON" && (
          <div className="max-w-md">
            <select
              value={answer[0] ?? ""}
              onChange={(e) =>
                setAnswer([
                  e.target.value,
                ])
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="">Select Target Conceptual Logical Option Pair</option>
              <option value="A">A (Both True, Reason is correct explanation)</option>
              <option value="B">B (Both True, Reason is NOT correct explanation)</option>
              <option value="C">C (Assertion True, Reason False)</option>
              <option value="D">D (Assertion False, Reason True)</option>
            </select>
          </div>
        )}
      </div>

      {/* ============================================= */}
      {/* SOLUTION */}
      {/* ============================================= */}

      <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="h-2 w-2 rounded-full bg-pink-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Explanatory Derivation Data
          </h2>
        </div>

        <textarea
          rows={5}
          value={solution}
          onChange={(e) =>
            setSolution(
              e.target.value
            )
          }
          placeholder="Document the systematic steps, theoretical equations, or derivations explaining why the chosen targets are valid..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none leading-relaxed"
        />

        <div className="mt-5 bg-slate-950/40 p-5 border border-slate-800/60 rounded-xl">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Detailed Solution Blueprint Asset
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="relative cursor-pointer flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-300 transition shadow-sm">
              <span>{uploadingSolutionImage ? "Processing File..." : "Link Solution Blueprint"}</span>
              <input
                type="file"
                accept="image/*"
                disabled={uploadingSolutionImage}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleSolutionImageUpload(file);
                  }
                }}
                className="hidden"
              />
            </label>
            {uploadingSolutionImage && (
              <span className="text-xs text-indigo-400 animate-pulse font-medium">
                Uploading active asset matrix...
              </span>
            )}
          </div>

          {solutionImageUrl && (
            <div className="mt-4 relative group rounded-xl overflow-hidden border border-slate-800 w-fit max-w-full bg-slate-900">
              <img
                src={solutionImageUrl}
                alt="Solution breakdown payload presentation"
                className="max-h-64 object-contain mx-auto p-2"
              />
            </div>
          )}
        </div>
      </div>

      {/* ============================================= */}
      {/* SCORING */}
      {/* ============================================= */}

      <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="h-2 w-2 rounded-full bg-cyan-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Scoring Vector Configurations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Positive Credit Value
            </label>
            <input
              type="number"
              min={1}
              value={marks}
              onChange={(e) =>
                setMarks(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Negative Penalty Weight
            </label>
            <input
              type="number"
              step="0.25"
              min={0}
              value={negativeMarks}
              onChange={(e) =>
                setNegativeMarks(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full rounded-xl border border-slate-700/60 bg-slate-800 px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Runtime Evaluation Metric
            </label>
            <div className="flex h-[46px] items-center justify-center font-mono rounded-xl border border-dashed border-slate-700 bg-slate-950/30 px-4 text-sm text-indigo-400 font-bold tracking-wider">
              +{marks} / -{negativeMarks} Raw Scope
            </div>
          </div>
        </div>
      </div>

      {/* ============================================= */}
      {/* SETTINGS */}
      {/* ============================================= */}

      <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="h-2 w-2 rounded-full bg-teal-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Visibility & Tier Settings
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Premium Question Switch */}
          <label className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-850 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/40">
            <div className="pr-4">
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                Premium Gateway Restriction
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Restricts access parameters only to subscribed enterprise accounts.
              </p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) =>
                  setIsPremium(
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>

          {/* Published Switch */}
          <label className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-800 bg-slate-850 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/40">
            <div className="pr-4">
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                Production Release Status
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Controls real-time synchronization out to production indexes instantly.
              </p>
            </div>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) =>
                  setPublished(
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>
        </div>
      </div>

      {/* ============================================= */}
      {/* SAVE ACTION */}
      {/* ============================================= */}

      <div className="relative z-10 flex justify-end pt-2">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full sm:w-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 px-10 py-4 font-bold text-sm tracking-wide text-white transition-all duration-200 shadow-lg shadow-indigo-600/20 transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading
            ? "Syncing Object Data..."
            : initialValues
              ? "Commit Dynamic Update"
              : "Generate Question Schema"
          }
        </button>
      </div>

    </div>
  );
};

export default QuestionForm;