import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ShieldCheck, AlertCircle, Play, Sparkles } from "lucide-react";

import { startTest } from "../../../api/studentTestApi";
import { enterFullscreen } from "../../student/tests/utils/security";

const ReadyScreen = () => {

  const navigate = useNavigate();

  const { testId } = useParams();

  const [countdown, setCountdown] = useState(5);

  const [starting, setStarting] = useState(false);

  const [error, setError] = useState("");

  const [readyToStart, setReadyToStart] = useState(false);

  // ==========================================
  // COUNTDOWN
  // ==========================================

  useEffect(() => {
    if (countdown <= 0) {
      setReadyToStart(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // ==========================================
  // START TEST
  // ==========================================

  const startExam = async () => {
    if (!testId) return;

    try {
      setStarting(true);
      setError("");

      // Request fullscreen (must come from button click)
      await enterFullscreen();

      if (!document.fullscreenElement) {
        setError(
          "Fullscreen permission is required to start the exam."
        );
        return;
      }

      const res = await startTest(testId);

      navigate(`/student/tests/attempts/${res.attempt.id}`);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to start the test. Please try again."
      );
    } finally {
      setStarting(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full max-w-xl relative z-10">

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl shadow-slate-950/80 p-8 sm:p-12 text-center relative overflow-hidden">

          {/* Top Decorative Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-8">
            <ShieldCheck size={14} />
            Secure Examination Environment
          </div>

          {/* Countdown / Icon Visual */}
          <div className="mb-8 relative flex items-center justify-center">

            <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-600/5 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10">

              {!readyToStart ? (
                <span className="text-5xl font-extrabold text-indigo-400 tracking-tight transition-all duration-300">
                  {countdown}
                </span>
              ) : (
                <Sparkles className="text-indigo-400 animate-pulse" size={44} />
              )}

              {/* Outer Pulsing Ring */}
              {!readyToStart && (
                <div className="absolute inset-0 rounded-full border border-indigo-500/40 animate-ping opacity-25" />
              )}

            </div>

          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {readyToStart ? "You're All Set!" : "Get Ready"}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Please stay focused during the examination.
            The exam will start in fullscreen mode for security.

            <br className="hidden sm:block" />

            Please stay focused and avoid refreshing the page.
          </p>

          {/* Countdown State Message */}
          {!readyToStart ? (
            <div className="mt-8 py-3 px-6 rounded-2xl bg-slate-950/50 border border-slate-800/60 inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <p className="text-indigo-300 text-sm sm:text-base font-medium">
                Starting in <span className="font-bold text-white">{countdown}</span> second{countdown !== 1 ? "s" : ""}...
              </p>
            </div>
          ) : (
            <div className="mt-8">
              {!starting && !error && (
                <button
                  onClick={startExam}
                  disabled={starting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-9 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Play size={18} className="fill-current" />
                  Start Exam
                </button>
              )}
            </div>
          )}

          {/* Loading Indicator */}
          {starting && (
            <div className="mt-8 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center gap-3">

              <Loader2
                className="animate-spin text-indigo-400"
                size={36}
              />

              <p className="text-slate-300 text-sm font-medium">
                Preparing your test environment...
              </p>

            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mt-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">

              <div className="flex items-center justify-center gap-2 text-rose-400 font-medium mb-3 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>

              <button
                onClick={startExam}
                className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-rose-600/20 transition-all duration-200 active:scale-[0.98]"
              >
                Retry
              </button>

            </div>
          )}

        </div>

      </div>

    </div>

  );

};

export default ReadyScreen;