import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  ShieldCheck,
  AlertCircle,
  Play,
  Sparkles,
  Maximize2,
  ArrowLeft,
} from "lucide-react";

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
        setError("Fullscreen permission is required to start the exam.");
        return;
      }

      const res = await startTest(testId);
      navigate(`/student/tests/attempts/${res.attempt.id}`);
    } catch (err) {
      console.error(err);
      setError("Unable to start the test. Please try again.");
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden select-none">
      {/* Ambient Light Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-200/40 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[350px] bg-indigo-100/60 blur-[120px] rounded-full" />

      <div className="w-full max-w-lg relative z-10">
        {/* Main Card */}
        <div className="bg-white border border-purple-100/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-500/5 p-6 sm:p-10 md:p-12 text-center relative overflow-hidden flex flex-col items-center">
          {/* Subtle Corner Light Glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />

          

          {/* Countdown / Visual Orb Container */}
          <div className="mb-6 sm:mb-8 relative flex items-center justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-purple-100/80 via-purple-50 to-white border-2 border-purple-200 flex items-center justify-center shadow-lg shadow-purple-500/10">
              {!readyToStart ? (
                <span className="text-4xl sm:text-5xl font-black text-purple-700 tracking-tight transition-all duration-300">
                  {countdown}
                </span>
              ) : (
                <Sparkles className="text-purple-600 animate-pulse" size={38} />
              )}

              {/* Outer Pulsing Ping Ring */}
              {!readyToStart && (
                <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-25" />
              )}
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
            {readyToStart ? "You're All Set!" : "Get Ready"}
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm mx-auto font-normal">
            The exam will launch in fullscreen mode for integrity. Avoid switching tabs, minimizing, or refreshing the page.
          </p>

          {/* Notice Chip */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100/80 text-slate-600 text-[11px] sm:text-xs font-semibold">
            <Maximize2 size={12} className="text-purple-600" />
            <span>Fullscreen required</span>
          </div>

          {/* Countdown State Notice */}
          {!readyToStart ? (
            <div className="mt-6 sm:mt-8 py-2.5 sm:py-3 px-5 sm:px-6 rounded-2xl bg-purple-50/70 border border-purple-100 inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
              <p className="text-purple-800 text-xs sm:text-sm font-semibold">
                Starting in{" "}
                <span className="font-extrabold text-purple-950">{countdown}</span>{" "}
                second{countdown !== 1 ? "s" : ""}...
              </p>
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
              {!starting && !error && (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={startExam}
                    disabled={starting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-purple-600 px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition-all duration-200 hover:bg-purple-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                  >
                    <Play size={16} className="fill-current" />
                    <span>Start Exam</span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Loading Indicator */}
          {starting && (
            <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col items-center gap-2.5 w-full">
              <Loader2 className="animate-spin text-purple-600" size={30} />
              <p className="text-purple-900 text-xs sm:text-sm font-semibold">
                Initializing test session & fullscreen...
              </p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-center w-full">
              <div className="flex items-center justify-center gap-1.5 text-rose-700 font-semibold mb-3 text-xs sm:text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>

              <button
                type="button"
                onClick={startExam}
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
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