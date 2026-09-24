import {
  Flame,
  Clock3,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  HelpCircle,
  Check,
  Calendar,
  ListTodo,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import {
  getTodayDailyProblem,
  verifyDailyProblem,
  type StudentDailyProblem,
} from "../../features/student/daily-problem/services/dailyProblem.api";

import TestProgressChart from "../../features/student/test-progress/components/TestProgressChart";

// Typography Formula Parsing Imports
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import DashboardLeaderboard from "@/features/student/leaderboard/components/DashboardLeaderboard";

interface Task {
  id: string;
  title: string;
  done: boolean;
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const showXPReward = useAuthStore((state) => state.showXPReward);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [dailyProblem, setDailyProblem] = useState<StudentDailyProblem | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [isPotdCompleted, setIsPotdCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [potdError, setPotdError] = useState("");
  const [dailyProblemLoading, setDailyProblemLoading] = useState(true);
  const [isSubmittingPotd, setIsSubmittingPotd] = useState(false);

  const [upcomingSession, setUpcomingSession] = useState<any>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const navigate = useNavigate();

  // ======================================================
  // FETCH DAILY PROBLEM
  // ======================================================

  useEffect(() => {
    const fetchDailyProblem = async () => {
      try {
        setDailyProblemLoading(true);
        setPotdError("");

        const response = await getTodayDailyProblem();
        setDailyProblem(response.dailyProblem);
      } catch (error) {
        console.error("Failed to fetch Problem of the Day:", error);
        setDailyProblem(null);
        setPotdError("Unable to load today's Problem of the Day.");
      } finally {
        setDailyProblemLoading(false);
      }
    };

    fetchDailyProblem();
  }, []);

  // ======================================================
  // FETCH USER TASKS
  // ======================================================

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        setLoadingTasks(true);
        const res = await api.get("/tasks");
        if (res.data.success) {
          setTasks(res.data.tasks);
        }
      } catch (error) {
        console.error("Failed to sync backend planner rows:", error);
      } finally {
        setLoadingTasks(false);
      }
    };

    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  // ======================================================
  // FETCH UPCOMING SESSION
  // ======================================================

  const fetchUpcomingSession = async () => {
    try {
      const res = await api.get("/sessions/next");
      setUpcomingSession(res.data.session);
    } catch (error) {
      console.log("No upcoming session");
    } finally {
      setSessionLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingSession();
  }, []);

  // ======================================================
  // ADD TASK
  // ======================================================

  const addTask = async () => {
    if (!taskInput.trim()) return;

    try {
      const res = await api.post("/tasks", {
        title: taskInput.trim(),
      });

      if (res.data.success) {
        const newTask = res.data.task || res.data;
        setTasks((prev) => [...prev, newTask]);
        setTaskInput("");
      }
    } catch (error) {
      console.error("Failed to commit new task line to database:", error);
    }
  };

  // ======================================================
  // TOGGLE TASK
  // ======================================================

  const toggleTask = async (id: string) => {
    try {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
      await api.patch(`/tasks/${id}`);
    } catch (error) {
      console.error("Failed to commit checkbox state modification:", error);
    }
  };

  // ======================================================
  // DELETE TASK
  // ======================================================

  const deleteTask = async (id: string) => {
    try {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error("Failed to wipe designated task reference target:", error);
    }
  };

  // =====================================================
  // PROBLEM OF THE DAY SELECTION
  // =====================================================

  const handlePotdOptionSelect = (optionKey: string) => {
    if (!dailyProblem || isPotdCompleted || isSubmittingPotd) {
      return;
    }

    setPotdError("");

    if (dailyProblem.question.questionType === "MULTIPLE_CORRECT") {
      setSelectedAnswers((previous) =>
        previous.includes(optionKey)
          ? previous.filter((key) => key !== optionKey)
          : [...previous, optionKey]
      );
      return;
    }

    setSelectedAnswers([optionKey]);
  };

  // =====================================================
  // SUBMIT PROBLEM OF THE DAY
  // =====================================================

  const handlePotdSubmit = async () => {
    if (
      !dailyProblem ||
      isPotdCompleted ||
      isSubmittingPotd ||
      selectedAnswers.length === 0
    ) {
      return;
    }

    setPotdError("");
    setIsSubmittingPotd(true);

    try {
      const answer =
        dailyProblem.question.questionType === "MULTIPLE_CORRECT"
          ? selectedAnswers
          : selectedAnswers[0];

      const response = await verifyDailyProblem({
        dailyProblemId: dailyProblem.id,
        answer,
      });

      if (response.alreadySolved) {
        setIsPotdCompleted(true);
        setPotdError("Problem of the Day is already completed for today.");
        return;
      }

      if (response.correct) {
        setIsAnsweredCorrectly(true);
        setIsPotdCompleted(true);
        setShowExplanation(true);

        if (response.user && user) {
          setUser({
            ...user,
            ...response.user,
          });

          if (response.xpAwarded > 0) {
            showXPReward(response.xpAwarded);
          }
        }
      } else {
        setIsAnsweredCorrectly(false);
        setPotdError("Incorrect answer. Try again.");
      }
    } catch (error: any) {
      console.error("Failed to verify Problem of the Day:", error);
      setPotdError(
        error?.response?.data?.message ||
          "Unable to verify your answer. Please try again."
      );
    } finally {
      setIsSubmittingPotd(false);
    }
  };

  // ======================================================
  // GREETING & PROGRESS
  // ======================================================

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  const completedTasksCount = tasks.filter((task) => task.done).length;
  const totalTasksCount = tasks.length;
  const currentCompletionPercentage = totalTasksCount
    ? Math.round((completedTasksCount / totalTasksCount) * 100)
    : 0;

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 p-3 sm:p-5 lg:p-8 select-none w-full space-y-6 relative overflow-hidden mt-4">
      {/* Ambient Decorative Background Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[300px] bg-purple-200/40 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-20 w-[450px] h-[350px] bg-indigo-200/30 blur-[140px] rounded-full" />

      {/* =====================================================
          MODULE 1: TOP GREETINGS HEADER
          ===================================================== */}
      <div className="relative z-10 rounded-2xl sm:rounded-3xl bg-white border border-purple-100/90 p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center md:justify-between gap-5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100/60 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            {greeting}, {firstName} 👋
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            You're making consistent progress toward your{" "}
            <span className="font-bold text-purple-700">
              {user?.targetExam ? user.targetExam.split("_")[0] : "JEE"}
            </span>{" "}
            goals. Keep your momentum strong today.
          </p>
        </div>

        {/* Micro Badges */}
        <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-auto flex-shrink-0 relative z-10">
          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/70 px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2.5 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-600">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500 animate-pulse" />
            </div>
            <div>
              <span className="block font-black text-xs sm:text-sm text-slate-900 leading-none">
                {user?.streak || 0} Days
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-amber-700/80 mt-0.5 block">
                Current Streak
              </span>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/70 px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2.5 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <span className="block font-black text-xs sm:text-sm text-slate-900 leading-none">
                {currentCompletionPercentage}%
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700/80 mt-0.5 block">
                Tasks Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODULE 2: PROBLEM OF THE DAY
          ===================================================== */}
      <section className="relative z-10">
        <div className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div className="flex items-center gap-2 text-amber-600">
                <div className="h-8 w-8 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                    Problem of the Day
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Earn bonus XP & preserve your preparation streak
                  </span>
                </div>
              </div>

              {dailyProblem && (
                <span className="self-start sm:self-auto rounded-xl bg-purple-50 border border-purple-200/70 px-3 py-1 text-xs font-bold text-purple-700 shadow-2xs">
                  {dailyProblem.question.subject.name} • {dailyProblem.question.chapter.title}
                </span>
              )}
            </div>

            {dailyProblemLoading ? (
              <div className="mt-6 rounded-2xl border border-dashed border-purple-100 bg-purple-50/30 p-8 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  Loading today's problem...
                </p>
              </div>
            ) : !dailyProblem ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                <HelpCircle className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 text-sm font-bold text-slate-700">
                  No Problem of the Day is available today.
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Please check back later or review your test performance.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wide text-indigo-700">
                    {dailyProblem.question.examType}
                  </span>

                  <span className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    {dailyProblem.question.questionType.replace(/_/g, " ")}
                  </span>

                  <span className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-amber-700">
                    {dailyProblem.question.difficulty}
                  </span>
                </div>

                <div className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed font-medium bg-slate-50/70 p-4 sm:p-5 border border-slate-100 rounded-2xl markdown-math-container">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {dailyProblem.question.question}
                  </ReactMarkdown>
                </div>

                {dailyProblem.question.questionImageUrl && (
                  <img
                    src={dailyProblem.question.questionImageUrl}
                    alt="Question"
                    className="max-h-72 max-w-full rounded-2xl border border-slate-200 object-contain mx-auto"
                  />
                )}

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {dailyProblem.question.options.map((option) => {
                    const isSelected = selectedAnswers.includes(option.key);
                    const isMultipleCorrect =
                      dailyProblem.question.questionType === "MULTIPLE_CORRECT";

                    const cardStyle = isSelected
                      ? "border-purple-500 bg-purple-50/80 text-purple-900 shadow-sm shadow-purple-500/10"
                      : "border-slate-200 bg-white text-slate-700 hover:border-purple-200 hover:bg-purple-50/40";

                    const optionImage =
                      dailyProblem.question.optionImages?.[option.key];

                    return (
                      <button
                        key={option.key}
                        type="button"
                        disabled={isPotdCompleted || isSubmittingPotd}
                        onClick={() => handlePotdOptionSelect(option.key)}
                        className={`w-full text-left rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 text-xs sm:text-sm font-semibold transition-all flex items-start justify-between gap-3 disabled:cursor-not-allowed ${cardStyle} cursor-pointer active:scale-[0.99]`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div
                            className={`h-6 w-6 shrink-0 flex items-center justify-center border text-[11px] font-black ${
                              isMultipleCorrect ? "rounded-md" : "rounded-full"
                            } ${
                              isSelected
                                ? "border-purple-600 bg-purple-600 text-white"
                                : "border-slate-300 bg-slate-50 text-slate-600"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            ) : (
                              option.key
                            )}
                          </div>

                          <div className="flex-1 overflow-x-auto min-w-0">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {option.text}
                            </ReactMarkdown>

                            {optionImage && (
                              <img
                                src={optionImage}
                                alt={`Option ${option.key}`}
                                className="mt-2 max-h-32 max-w-full rounded-lg object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {!isPotdCompleted && (
                  <button
                    type="button"
                    onClick={handlePotdSubmit}
                    disabled={selectedAnswers.length === 0 || isSubmittingPotd}
                    className="w-full rounded-xl sm:rounded-2xl bg-purple-600 px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-purple-600/25 transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmittingPotd ? "Checking Answer..." : "Submit Answer"}
                  </button>
                )}

                {isAnsweredCorrectly && (
                  <p className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    Correct answer! Your Problem of the Day has been verified & completed.
                  </p>
                )}

                {potdError && !isAnsweredCorrectly && (
                  <p className="text-xs sm:text-sm font-bold text-rose-800 bg-rose-50 border border-rose-200 rounded-xl p-3.5">
                    {potdError}
                  </p>
                )}
              </div>
            )}
          </div>

          {showExplanation && dailyProblem?.question.solution && (
            <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/80 p-4 sm:p-5 mt-4">
              <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Explanation Summary
              </h4>

              <div className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {dailyProblem.question.solution}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          MODULE 3 & 4: UPCOMING SESSION & PLAN YOUR DAY (ABOVE LEADERBOARD)
          ===================================================== */}
      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* UPCOMING SESSION */}
        <div className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Calendar size={16} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Upcoming Session
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Your next scheduled 1-on-1 mentorship call
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                Mentorship
              </div>
            </div>

            <div className="mt-5">
              {sessionLoading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-slate-400 animate-pulse">
                    Checking scheduled sessions...
                  </p>
                </div>
              ) : !upcomingSession ? (
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 text-center">
                  <Clock3 className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                  <h4 className="text-sm font-bold text-slate-800">
                    No upcoming session booked
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Schedule a 1-on-1 session with your mentor to refine your target strategy.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-purple-50/20 to-white p-4 sm:p-5 shadow-2xs">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {upcomingSession.mentor?.user?.name || "Assigned Mentor"}
                      </h3>
                      <p className="text-xs font-medium text-purple-700 mt-0.5">
                        Senior Mentor • 1-on-1 Strategy
                      </p>
                    </div>

                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold mt-4 pt-3 border-t border-indigo-100/60">
                    <Clock3 size={14} className="text-indigo-600" />
                    <span>
                      {new Date(upcomingSession.scheduledAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/student/my-sessions")}
            className="w-full mt-6 h-10 sm:h-11 border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 text-slate-700 text-xs sm:text-sm font-bold rounded-xl transition-all active:scale-[0.99] cursor-pointer"
          >
            View All Sessions
          </button>
        </div>

        {/* PLAN YOUR DAY */}
        <div className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <ListTodo size={16} />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Plan Your Day
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Organize and complete your core study milestones
                  </p>
                </div>
              </div>

              <div className="rounded-full bg-purple-50 border border-purple-200/70 px-3 py-1 text-[10px] font-black text-purple-700 uppercase tracking-wide">
                {completedTasksCount}/{totalTasksCount} Done
              </div>
            </div>

            {/* Input Pipeline */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a target study task..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all"
              />

              <button
                type="button"
                onClick={addTask}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 transition-all whitespace-nowrap active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Tasks Scroll Track */}
            <div className="mt-4 space-y-2 max-h-[190px] overflow-y-auto pr-1 flex-1 min-h-[130px]">
              {loadingTasks ? (
                <div className="text-center py-8 text-xs text-slate-400 font-semibold">
                  Syncing task registry matrix...
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-8 text-xs font-semibold text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  No active tasks. Add daily study goals to track completion.
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                      task.done
                        ? "border-emerald-200 bg-emerald-50/40 text-slate-500"
                        : "border-slate-200/80 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                          task.done
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 bg-slate-50 hover:border-purple-400"
                        }`}
                      >
                        {task.done && (
                          <Check className="h-3 w-3 stroke-[3]" />
                        )}
                      </button>

                      <h3
                        className={`text-xs font-bold truncate ${
                          task.done
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors flex-shrink-0 ml-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Progress Monitor Metric Status */}
          <div className="mt-4 pt-3.5 border-t border-slate-100">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-500">Daily Goal Completion</span>
              <span className="text-purple-700 font-extrabold">
                {currentCompletionPercentage}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${currentCompletionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MODULE 5: LEADERBOARD
          ===================================================== */}
      <section className="relative z-10 grid grid-cols-1 gap-6">
        <DashboardLeaderboard />
      </section>

      {/* =====================================================
          MODULE 6: TEST PROGRESS CHART
          ===================================================== */}
      <section className="relative z-10 mt-6">
        <TestProgressChart />
      </section>
    </div>
  );
}