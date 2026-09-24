import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react";

const instructions = [
  "Read each question carefully before selecting your answer.",
  "All questions are compulsory unless specified otherwise.",
  "Negative marking will apply wherever mentioned.",
  "The test timer begins as soon as you click Start Test.",
  "Your responses are saved automatically after each attempt.",
  "You can review and modify your answers anytime before submitting the test.",
  "Do not refresh, close, or navigate away from the test window during the examination.",
  "Ensure you have a stable internet connection throughout the test.",
  "The test must be attempted using a single device and browser session.",
  "Any form of unfair practice or suspicious activity may result in cancellation of your test.",
  "The test will be submitted automatically once the allotted time expires.",
  "Once submitted, the test cannot be reopened or edited.",
  "Review your answers carefully before clicking Submit Test.",
  "In case of any technical issues, contact the MentorSala support team immediately.",
];

const Instructions = () => {
  const navigate = useNavigate();
  const { testId } = useParams();

  const [accepted, setAccepted] = useState(false);

  const handleStart = () => {
    navigate(`/student/tests/${testId}/ready`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col justify-center">
      {/* Ambient Purple & Blue Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-200/40 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-100/60 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Top Header Navigation */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-700 transition-colors duration-200 mb-4 sm:mb-6 group font-semibold text-xs sm:text-sm cursor-pointer"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back 
        </button>

        {/* Main Instruction Card */}
        <div className="bg-white border border-purple-100/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-500/5 overflow-hidden flex flex-col">
          {/* Header Strip */}
          <div className="border-b border-purple-50 bg-gradient-to-r from-purple-50/70 via-white to-indigo-50/40 px-5 sm:px-8 py-5 sm:py-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Test Instructions
                </h1>

                <p className="text-slate-500 mt-1 text-xs sm:text-sm font-medium">
                  Review all guidelines thoroughly before initiating the session.
                </p>
              </div>

              {/* Quick Info Badges */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-bold shadow-2xs">
                  <Clock size={13} className="text-amber-600" />
                  <span>Timed Exam</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-bold shadow-2xs">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>Auto Save</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice Alert Banner */}
          <div className="mx-4 sm:mx-8 mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3 text-amber-900">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              Do not switch tabs, minimize the browser window, or refresh the page during the exam. System activity is continuously monitored.
            </p>
          </div>

          {/* Instructions List Box */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 space-y-2.5 sm:space-y-3 max-h-[50vh] sm:max-h-[52vh] overflow-y-auto">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-purple-50/30 border border-purple-100/70 hover:bg-purple-50/60 hover:border-purple-200/80 transition-all duration-200 group"
              >
                <div className="h-6 w-6 rounded-lg bg-purple-100 border border-purple-200/80 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200">
                  {index + 1}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
                  {instruction}
                </p>
              </div>
            ))}
          </div>

          {/* Agreement Checkbox */}
          <div className="border-t border-purple-100/80 bg-slate-50/60 px-5 sm:px-8 py-4">
            <label className="flex items-start sm:items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center mt-0.5 sm:mt-0">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-md border-slate-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-white cursor-pointer accent-purple-600 transition"
                />
              </div>

              <span className="text-slate-700 text-xs sm:text-sm group-hover:text-slate-900 transition-colors font-medium">
                I have read, understood, and agree to abide by all the instructions listed above.
              </span>
            </label>
          </div>

          {/* Bottom Action Buttons */}
          <div className="border-t border-purple-100 px-5 sm:px-8 py-4 sm:py-5 bg-white flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
            >
              Back
            </button>

            <button
              type="button"
              disabled={!accepted}
              onClick={handleStart}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-purple-600 disabled:cursor-not-allowed disabled:active:scale-100 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/25 transition-all duration-200 cursor-pointer"
            >
              <span>Start Test</span>
              <Play size={15} className="fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;