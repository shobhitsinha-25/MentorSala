import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import api from "../../lib/axios"; 
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

export default function Onboarding() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [targetExam, setTargetExam] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetExam) {
      setError("Please select a target examination to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // ✅ FIXED: Changed to .post to match your completeOnboarding controller endpoint configuration
      const res = await api.post("/user/onboarding", { targetExam });

      if (res.data.success) {
        setUser(res.data.user);
        navigate("/student/dashboard", { replace: true });
      }
    } catch (err: any) {
      console.error("Onboarding Persistence Error:", err);
      setError(err.response?.data?.message || "Failed to commit session configurations.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 select-none text-slate-200">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="w-full max-w-md bg-[#0B0F19] border border-white/[0.06] rounded-[24px] p-8 shadow-2xl relative z-10">
        <div className="flex items-center gap-2 text-indigo-400 mb-6">
          <Sparkles className="h-5 w-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Profile Configuration</span>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
          Welcome to MentorSala
        </h1>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Let's initialize your academic focus to calibrate your dashboard analytics.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Select Target Examination
            </label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <select
                value={targetExam}
                onChange={(e) => {
                  setTargetExam(e.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-white/[0.08] bg-[#131926] pl-11 pr-4 py-3 text-sm text-slate-200 outline-none appearance-none focus:border-[#6366F1] focus:bg-[#161D2B] transition-all cursor-pointer"
              >
                <option value="" disabled hidden>Choose your objective exam...</option>
                {/* ✅ FIXED: Values now map exactly to your database options */}
                <option value="JEE">JEE (Main & Advanced)</option>
                <option value="WBJEE">WBJEE Engineering</option>
                <option value="BOARDS">CBSE / ISC Boards</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/10 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
          >
            {isSubmitting ? "Configuring Environment..." : "Complete Setup"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}