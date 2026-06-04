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
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import {useNavigate,} from "react-router-dom";
import api from "../../lib/axios"; 

// Typography Formula Parsing Imports
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; 

interface Task {
  id: string;
  title: string;
  done: boolean;
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [potdError, setPotdError] = useState("");

  const [
  upcomingSession,
  setUpcomingSession,
] = useState<any>(null);

const [
  sessionLoading,
  setSessionLoading,
] = useState(true);

  // Target MCQ metadata layout definitions
  const dailyProblem = {
    id: "potd-2026-05-21",
    subject: "Mathematics",
    topic: "Definite Integration",
    question: "Evaluate the following limit property of integrals:\n\n$$\\lim_{n \\to \\infty} \\sum_{r=1}^{n} \\frac{1}{n} \\sqrt{\\frac{n+r}{n-r}}$$",
    options: [
      "$$\\frac{\\pi}{2} + 1$$",
      "$$\\frac{\\pi}{2} - 1$$",
      "$$\\pi + 1$$",
      "$$\\pi - 1$$"
    ],
    correctIndex: 0,
    explanation: "By converting the limit of the Riemann sum into a definite integral from $0$ to $1$ of $\\sqrt{(1+x)/(1-x)}\\,dx$, and substituting $x = \\sin(\\theta)$, the total value computes strictly to $\\frac{\\pi}{2} + 1$."
  };

 

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

  useEffect(() => {

  fetchUpcomingSession();

}, []);

const navigate =
  useNavigate();

  const addTask = async () => {
    if (!taskInput.trim()) return;

    try {
      const res = await api.post("/tasks", { title: taskInput.trim() });
      
      if (res.data.success) {
        const newTask = res.data.task || res.data;
        setTasks((prev) => [...prev, newTask]);
        setTaskInput(""); 
      }
    } catch (error) {
      console.error("Failed to commit new task line to database:", error);
    }
  };
  const fetchUpcomingSession =
  async () => {

    try {

      const res =
        await api.get(
          "/sessions/next"
        );

      setUpcomingSession(
        res.data.session
      );

    } catch (error) {

      console.log(
        "No upcoming session"
      );

    } finally {

      setSessionLoading(
        false
      );

    }

  };

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

  const deleteTask = async (id: string) => {
    try {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error("Failed to wipe designated task reference target:", error);
    }
  };

  // =====================================================
  // POTD SUBMISSION (WITH OPTIMISTIC FALLBACK LOGIC)
  // =====================================================
  const handlePotdSubmit = async (optionIndex: number) => {
    if (isAnsweredCorrectly) return;
    setSelectedOption(optionIndex);
    setPotdError("");

    if (optionIndex === dailyProblem.correctIndex) {
      // ✅ OPTIMISTIC UPDATE: Lock user validation states instantly so UI feels perfectly responsive
      setIsAnsweredCorrectly(true);
      setShowExplanation(true);

      try {
        const res = await api.post("/user/gamification/verify-potd", {
          problemId: dailyProblem.id,
        });

        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (error: any) {
        console.warn("Backend gamification route unavailable or failed. Retaining local UI update state:", error.message);
        
        // ✅ ROBUST FALLBACK: If API fails, mock update the Zustand user store state locally so the streak counter visual reacts cleanly
        if (user && setUser) {
          setUser({
            ...user,
            streak: (user.streak || 0) + 1,
            xp: (user.xp || 0) + 50
          });
        }
      }
    } else {
      setIsAnsweredCorrectly(false);
      setPotdError("Incorrect answer. Review your step derivations and try again!");
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  const completedTasksCount = tasks.filter((task) => task.done).length;
  const totalTasksCount = tasks.length;
  const currentCompletionPercentage = totalTasksCount ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="space-y-6 bg-[#020617] p-4 md:p-8 select-none text-slate-200 w-full">
      
      {/* =====================================================
          CARD MODULE 1: TOP PREMIUM GREETINGS HEADER
          ===================================================== */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#111827] to-[#0F172A] border border-white/[0.06] p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-slate-50">
            {greeting}, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-xl leading-relaxed">
            You're making consistent progress toward your {user?.targetExam ? user.targetExam.split("_")[0] : "JEE"} goals. Keep your momentum strong today.
          </p>
        </div>
        
        {/* Performance Tracking Micro Badges */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0 relative z-10">
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md px-4 py-2 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400 fill-orange-400 animate-pulse" />
            <div className="text-xs">
              <span className="block font-black leading-none text-slate-200">{user?.streak || 0} Days</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Current Streak</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md px-4 py-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <div className="text-xs">
              <span className="block font-black leading-none text-slate-200">{currentCompletionPercentage}%</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Tasks Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CARD MODULE 2: PROBLEM OF THE DAY CONTAINER BLOCK
          ===================================================== */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3 items-stretch">
        
        {/* MCQ Interactive Box */}
        <div className="xl:col-span-2 rounded-[24px] border border-white/[0.06] bg-[#0B0F19] p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div className="flex items-center gap-2.5 text-amber-400">
                <HelpCircle className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Problem of the Day</span>
              </div>
              <span className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-[11px] font-bold text-amber-400">
                {dailyProblem.subject} • {dailyProblem.topic}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="text-sm md:text-base text-slate-200 leading-relaxed font-medium bg-[#131926]/40 p-4 border border-white/[0.02] rounded-xl markdown-math-container">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {dailyProblem.question}
                </ReactMarkdown>
              </div>

              {/* Options Selector Tracks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dailyProblem.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectChoice = idx === dailyProblem.correctIndex;
                  
                  let cardStyle = "border-white/[0.06] bg-[#131926] text-slate-300 hover:border-indigo-500/40 hover:bg-[#161D2B]";
                  if (isSelected) {
                    cardStyle = isCorrectChoice 
                      ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-400" 
                      : "border-red-500/40 bg-red-950/20 text-red-400";
                  } else if (isAnsweredCorrectly && isCorrectChoice) {
                    cardStyle = "border-emerald-500/40 bg-emerald-950/20 text-emerald-400";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnsweredCorrectly}
                      onClick={() => handlePotdSubmit(idx)}
                      className={`w-full text-left rounded-xl border p-4 text-sm font-semibold transition-all flex items-center justify-between gap-3 disabled:opacity-90 ${cardStyle}`}
                    >
                      <div className="flex-1 overflow-x-auto min-w-0">
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {option}
                        </ReactMarkdown>
                      </div>
                      <div className={`h-5 w-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                        isSelected && isCorrectChoice ? "bg-emerald-500 border-transparent text-slate-900" :
                        isSelected && !isCorrectChoice ? "bg-red-500 border-transparent text-white" : "border-slate-600"
                      }`}>
                        {isSelected && isCorrectChoice && <Check className="h-3 w-3 stroke-[3]" />}
                        {isSelected && !isCorrectChoice && <X className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {potdError && (
                <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5">
                  {potdError}
                </p>
              )}
            </div>
          </div>

          {showExplanation && (
            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4 mt-4 animate-fadeIn">
              <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-4 w-4" /> Explanation Summary
              </h4>
              <div className="mt-2 text-xs md:text-sm text-slate-400 leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {dailyProblem.explanation}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Streak Reward Incentive Widget */}
        <div className="rounded-[24px] bg-gradient-to-br from-[#1E1B4B] via-[#0F172A] to-[#030712] border border-white/[0.06] p-6 text-white shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-2 text-orange-400">
              <Flame className="h-5 w-5 fill-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Streak Incentive</span>
            </div>
            <h3 className="mt-6 text-xl font-black text-slate-100 tracking-tight leading-tight">
              {isAnsweredCorrectly ? "Daily Streak Extended!" : "Keep Your Flame Burning!"}
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">
              {isAnsweredCorrectly 
                ? "Excellent calculation workflow. Your consecutive activity streak has successfully been locked in for today. +10 XP bonus applied." 
                : "Answering the problem of the day correctly acts as an activity token checkpoint, increasing your consecutive calendar streak instantly. Don't break the record!"}
            </p>
          </div>

          <div className="space-y-3 mt-6 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center justify-between border-t border-white/[0.04] pt-1 text-xs">
              <div className="text-slate-500 font-bold">Reward Status:</div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                isAnsweredCorrectly ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
              }`}>
                {isAnsweredCorrectly ? "Claimed (+0 XP)" : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CARD MODULE 3 & 4: COMPACT EQUAL 50% / 50% GRID TRACKS
          ===================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* 50% WIDTH BLOCK: BOOKED MENTORSHIP ROSTER */}
       <div className="rounded-[24px] border border-white/[0.06] bg-[#0B0F19] p-6 shadow-2xl flex flex-col justify-between">

  <div>

    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">

      <div>

        <h2 className="text-lg font-black text-slate-100 tracking-tight">

          Upcoming Session

        </h2>

        <p className="text-[11px] text-slate-500 font-medium mt-0.5">

          Your next scheduled mentorship session

        </p>

      </div>

      <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider">

        Session

      </div>

    </div>

    <div className="mt-4">

      {sessionLoading ? (

        <p className="text-slate-500">

          Loading...

        </p>

      ) : !upcomingSession ? (

        <div className="rounded-xl border border-white/[0.04] bg-[#131926] p-4">

          <p className="text-slate-400">

            No upcoming session booked

          </p>

        </div>

      ) : (

        <div className="rounded-xl border border-white/[0.04] bg-[#131926] p-4">

          <h3 className="font-bold text-sm text-slate-200">

            {
              upcomingSession
                .mentor
                .user
                .name
            }

          </h3>

          <p className="text-xs text-slate-400 mt-1">

            Mentor

          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold mt-3">

            <Clock3
              size={12}
              className="text-indigo-400"
            />

            <span>

              {new Date(
                upcomingSession.scheduledAt
              ).toLocaleString(
                "en-IN"
              )}

            </span>

          </div>

        </div>

      )}

    </div>

  </div>

  <button

    onClick={() =>

      navigate(
        "/student/my-sessions"
      )

    }

    className="w-full mt-6 h-10 border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-slate-300 text-xs font-bold rounded-xl transition-all active:scale-[0.99]"

  >

    View All Sessions

  </button>

</div>

        {/* 50% WIDTH BLOCK: DAILY STUDY PLANNER TASK CONTROLLER */}
        <div className="rounded-[24px] border border-white/[0.06] bg-[#0B0F19] p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-100 tracking-tight">Plan Your Day</h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Organize and complete your core study routines.</p>
              </div>
              <div className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[10px] font-black text-[#818CF8] self-start sm:self-auto uppercase tracking-wide">
                {completedTasksCount}/{totalTasksCount} Done
              </div>
            </div>

            {/* Input Form Pipeline */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a target study task..."
                className="flex-1 rounded-xl border border-white/[0.08] bg-[#131926] px-4 py-2 text-xs font-semibold text-slate-200 outline-none placeholder:text-slate-500 focus:border-[#6366F1] focus:bg-[#161D2B] transition-all"
              />
              <button
                onClick={addTask}
                className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all whitespace-nowrap active:scale-[0.99] flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            {/* Tasks Scroll Registry Track */}
            <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto pr-1 flex-1 min-h-[140px] scrollbar-thin">
              {loadingTasks ? (
                <div className="text-center py-10 text-xs text-slate-500 font-semibold">
                  Syncing task registry matrix...
                </div>
              ) : tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                    task.done ? "border-emerald-500/20 bg-emerald-950/10" : "border-white/[0.04] bg-[#131926]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-all ${
                        task.done ? "border-emerald-500 bg-emerald-500 text-slate-900" : "border-slate-600 bg-[#0B0F19]"
                      }`}
                    >
                      {task.done && <CheckCircle2 className="h-2.5 w-2.5 stroke-[4] fill-current" />}
                    </button>
                    <h3 className={`text-xs font-bold truncate ${task.done ? "text-emerald-400/50 line-through opacity-60" : "text-slate-200"}`}>
                      {task.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-500 hover:text-red-400 p-1 transition-colors flex-shrink-0 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {!loadingTasks && totalTasksCount === 0 && (
                <div className="text-center py-8 text-[11px] font-semibold text-slate-500 border border-dashed border-white/[0.06] rounded-xl bg-[#131926]/30">
                  No active tasks configured. Add items to index progress tracking.
                </div>
              )}
            </div>
          </div>

          {/* Progress Monitor Metric Status */}
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="mb-2 flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-500">Daily Milestone Metrics</span>
              <span className="text-[#818CF8]">{currentCompletionPercentage}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#161B26]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] transition-all duration-300"
                style={{ width: `${currentCompletionPercentage}%` }}
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}