import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Play, ShieldAlert } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header Navigation */}

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-white hover:text-slate-100/50 transition-colors duration-200 mb-6 group font-medium text-sm"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Main Content Card */}

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl shadow-slate-950/50 overflow-hidden">

          {/* Top Section */}

          <div className="border-b border-slate-800/80 px-8 py-8 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-800/30">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <h1 className="text-3xl font-extrabold text-white tracking-tight">
                  Test Instructions
                </h1>

                <p className="text-slate-400 mt-2 text-sm sm:text-base">
                  Please review all rules and guidelines carefully before beginning your test.
                </p>

              </div>

              

            </div>

          </div>

          {/* Instructions List */}

          <div className="px-8 py-8 space-y-4 max-h-[55vh] overflow-y-auto custom-scrollbar">

            {instructions.map((instruction, index) => (

              <div
                key={index}
                className="flex items-start gap-4 p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/40 hover:border-slate-800 transition-colors duration-200"
              >

                <div className="p-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={16} />
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {instruction}
                </p>

              </div>

            ))}

          </div>

          {/* Agreement Checkbox */}

          <div className="border-t border-slate-800/80 bg-slate-950/60 px-8 py-5">

            <label className="flex items-start sm:items-center gap-3.5 cursor-pointer group select-none">

              <div className="relative flex items-center mt-0.5 sm:mt-0">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-5 h-5 rounded-md border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer accent-indigo-600 transition"
                />
              </div>

              <span className="text-slate-300 text-sm sm:text-base group-hover:text-white transition-colors duration-200 font-medium">
                I have read, understood, and agree to abide by all the instructions listed above.
              </span>

            </label>

          </div>

          {/* Footer Action Buttons */}

          <div className="border-t border-slate-800/80 px-8 py-6 bg-slate-900 flex items-center justify-between gap-4">

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-600 active:scale-[0.98] font-medium text-sm transition-all duration-200"
            >
              Back
            </button>

            <button
              disabled={!accepted}
              onClick={handleStart}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed disabled:active:scale-100 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200"
            >
              <Play size={18} className="fill-current" />
              Start Test
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Instructions;