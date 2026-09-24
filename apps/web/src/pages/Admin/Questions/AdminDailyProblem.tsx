import {
  CalendarDays,
  HelpCircle,
  Search,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getQuestionBank,
  setDailyProblem,
  type DailyProblemQuestion,
} from "./dailyProblem.api";

const AdminDailyProblem = () => {
  // =====================================================
  // DATE
  // =====================================================

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  // =====================================================
  // QUESTION SELECTOR
  // =====================================================

  const [
    showQuestionSelector,
    setShowQuestionSelector,
  ] = useState(false);

  const [
    questions,
    setQuestions,
  ] = useState<DailyProblemQuestion[]>([]);

  const [
    selectedQuestion,
    setSelectedQuestion,
  ] = useState<DailyProblemQuestion | null>(
    null
  );

  const [
    loadingQuestions,
    setLoadingQuestions,
  ] = useState(false);

  const [
    settingDailyProblem,
    setSettingDailyProblem,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  // =====================================================
  // LOAD QUESTION BANK
  // =====================================================

  const fetchQuestions = async () => {
    try {
      setLoadingQuestions(true);

      const response =
        await getQuestionBank({
          search:
            search.trim() || undefined,

          page,

          limit: 10,
        });

      setQuestions(
        response.questions
      );

      setTotalPages(
        response.pagination.pages
      );

    } catch (error: any) {
      console.error(
        "Failed to load question bank:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load questions."
      );
    } finally {
      setLoadingQuestions(false);
    }
  };

  // =====================================================
  // QUESTION BANK EFFECT
  // =====================================================

  useEffect(() => {
    if (!showQuestionSelector) {
      return;
    }

    fetchQuestions();
  }, [
    showQuestionSelector,
    page,
  ]);

  // =====================================================
  // OPEN QUESTION SELECTOR
  // =====================================================

  const handleSelectQuestion = () => {
    setPage(1);
    setSearch("");
    setShowQuestionSelector(true);
  };

  // =====================================================
  // SELECT QUESTION
  // =====================================================

  const handleQuestionSelection = (
    question: DailyProblemQuestion
  ) => {
    setSelectedQuestion(question);
    setShowQuestionSelector(false);
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = () => {
    setPage(1);
    fetchQuestions();
  };

  // =====================================================
  // SET DAILY PROBLEM
  // =====================================================

  const handleSetDailyProblem = async () => {
    if (!selectedQuestion) {
      toast.error(
        "Please select a question first."
      );

      return;
    }

    if (!selectedDate) {
      toast.error(
        "Please select a date."
      );

      return;
    }

    try {
      setSettingDailyProblem(true);

      const response =
        await setDailyProblem({
          questionId:
            selectedQuestion.id,

          date: selectedDate,
        });

      toast.success(
        response.message ||
          "Daily problem set successfully."
      );

    } catch (error: any) {
      console.error(
        "Failed to set daily problem:",
        error
      );

      const backendMessage =
        error?.response?.data?.message;

      toast.error(
        backendMessage ||
          "Failed to set daily problem. Please try again."
      );
    } finally {
      setSettingDailyProblem(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-full bg-[#020617] p-6 md:p-8 text-slate-200">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="mb-8">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">

            <HelpCircle
              size={22}
              className="text-amber-400"
            />

          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100">
              Daily Problem
            </h1>

            <p className="mt-1 text-xs md:text-sm text-slate-500 font-medium">
              Select a question from the question bank and assign it as the daily problem.
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          DAILY PROBLEM SECTION
          ===================================================== */}

      <section className="rounded-2xl border border-white/[0.06] bg-[#0B0F19] shadow-2xl overflow-hidden">

        {/* SECTION HEADER */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] p-5 md:p-6">

          <div>

            <h2 className="text-base md:text-lg font-black text-slate-100">
              Problem of the Day
            </h2>

            <p className="mt-1 text-[11px] md:text-xs text-slate-500">
              Manage the question assigned to students for a particular day.
            </p>

          </div>

          {/* DATE SELECTOR */}

          <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#131926] px-3 py-2">

            <CalendarDays
              size={16}
              className="text-indigo-400 shrink-0"
            />

            <input
              type="date"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(
                  event.target.value
                );

                setSelectedQuestion(
                  null
                );
              }}
              className="bg-transparent text-xs font-bold text-slate-300 outline-none cursor-pointer"
            />

          </div>

        </div>

        {/* =====================================================
            SELECTED QUESTION
            ===================================================== */}

        <div className="p-6 md:p-10">

          {!selectedQuestion ? (

            <div className="min-h-[320px] rounded-2xl border border-dashed border-white/[0.08] bg-[#080C14] flex flex-col items-center justify-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-5">

                <HelpCircle
                  size={26}
                  className="text-indigo-400"
                />

              </div>

              <h3 className="text-sm md:text-base font-black text-slate-200">
                No Daily Problem Selected
              </h3>

              <p className="mt-2 max-w-md text-[11px] md:text-xs leading-relaxed text-slate-500">
                Select an existing question from the question bank to assign it as the Problem of the Day.
              </p>

              <button
                type="button"
                onClick={
                  handleSelectQuestion
                }
                className="mt-6 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-900/20 transition-all hover:opacity-95 active:scale-[0.98]"
              >
                Select Question
              </button>

            </div>

          ) : (

            <div className="rounded-2xl border border-indigo-500/20 bg-[#080C14] overflow-hidden">

              <div className="flex items-center justify-between border-b border-white/[0.06] p-5">

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                    Selected Question
                  </span>

                  <p className="mt-1 text-[11px] text-slate-500">
                    {selectedQuestion.subject.name}
                    {" • "}
                    {selectedQuestion.chapter.title}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    handleSelectQuestion
                  }
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  Change Question
                </button>

              </div>

              <div className="p-5">

                <div className="flex flex-wrap gap-2 mb-4">

                  <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 text-[9px] font-black uppercase text-indigo-400">
                    {selectedQuestion.examType}
                  </span>

                  <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[9px] font-black uppercase text-amber-400">
                    {selectedQuestion.difficulty}
                  </span>

                  <span className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-1 text-[9px] font-black uppercase text-slate-400">
                    {selectedQuestion.questionType}
                  </span>

                </div>

                <div className="rounded-xl border border-white/[0.04] bg-[#131926] p-4">

                  <p className="text-xs md:text-sm leading-relaxed text-slate-200">
                    {selectedQuestion.question}
                  </p>

                </div>

                <div className="mt-5 flex justify-end">

                  <button
                    type="button"
                    onClick={
                      handleSetDailyProblem
                    }
                    disabled={
                      settingDailyProblem
                    }
                    className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-900/20 hover:opacity-95 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >

                    {settingDailyProblem && (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    )}

                    {settingDailyProblem
                      ? "Setting..."
                      : "Set as Daily Problem"}

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          QUESTION BANK MODAL
          ===================================================== */}

      {showQuestionSelector && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

          <div className="w-full max-w-5xl max-h-[90vh] rounded-2xl border border-white/[0.08] bg-[#0B0F19] shadow-2xl flex flex-col overflow-hidden">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/[0.06] p-5">

              <div>

                <h2 className="text-lg font-black text-slate-100">
                  Select Question
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  Select a question from the existing question bank.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowQuestionSelector(false)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-white/[0.04] hover:text-slate-200 transition-all"
              >
                <X size={18} />
              </button>

            </div>

            {/* SEARCH */}

            <div className="border-b border-white/[0.06] p-5">

              <div className="flex gap-2">

                <div className="relative flex-1">

                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter"
                      ) {
                        handleSearch();
                      }
                    }}
                    placeholder="Search questions..."
                    className="w-full rounded-xl border border-white/[0.06] bg-[#131926] py-2.5 pl-9 pr-4 text-xs text-slate-200 outline-none placeholder:text-slate-500 focus:border-indigo-500/40"
                  />

                </div>

                <button
                  type="button"
                  onClick={
                    handleSearch
                  }
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all"
                >
                  Search
                </button>

              </div>

            </div>

            {/* QUESTION LIST */}

            <div className="flex-1 overflow-y-auto p-5">

              {loadingQuestions ? (

                <div className="flex min-h-[300px] items-center justify-center">

                  <Loader2
                    size={24}
                    className="animate-spin text-indigo-400"
                  />

                </div>

              ) : questions.length === 0 ? (

                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                  <HelpCircle
                    size={30}
                    className="text-slate-600"
                  />

                  <p className="mt-3 text-sm font-bold text-slate-400">
                    No questions found
                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">
                    Try another search term.
                  </p>

                </div>

              ) : (

                <div className="space-y-3">

                  {questions.map(
                    (question) => (

                      <button
                        key={
                          question.id
                        }
                        type="button"
                        onClick={() =>
                          handleQuestionSelection(
                            question
                          )
                        }
                        className="w-full text-left rounded-xl border border-white/[0.05] bg-[#131926] p-4 hover:border-indigo-500/30 hover:bg-[#161D2B] transition-all group"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap gap-2 mb-2">

                              <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 text-[9px] font-black uppercase text-indigo-400">
                                {question.examType}
                              </span>

                              <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[9px] font-black uppercase text-amber-400">
                                {question.difficulty}
                              </span>

                              <span className="text-[9px] font-bold text-slate-500">
                                {question.subject.name}
                                {" • "}
                                {question.chapter.title}
                              </span>

                            </div>

                            <p className="text-xs leading-relaxed text-slate-300 line-clamp-3">
                              {question.question}
                            </p>

                          </div>

                          <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.05] text-slate-600 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:text-indigo-400 transition-all">

                            <Check
                              size={15}
                            />

                          </div>

                        </div>

                      </button>

                    )
                  )}

                </div>

              )}

            </div>

            {/* PAGINATION */}

            <div className="flex items-center justify-between border-t border-white/[0.06] p-4">

              <span className="text-[10px] font-bold text-slate-500">
                Page {page} of {totalPages}
              </span>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={
                    page <= 1 ||
                    loadingQuestions
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          1,
                          current - 1
                        )
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft
                    size={15}
                  />
                </button>

                <button
                  type="button"
                  disabled={
                    page >= totalPages ||
                    loadingQuestions
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.min(
                          totalPages,
                          current + 1
                        )
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight
                    size={15}
                  />
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminDailyProblem;