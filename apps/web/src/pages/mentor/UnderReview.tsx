import { useState } from "react";
import api from "../../lib/axios";
import { useAuthStore } from "../../store/auth.store";

export default function UnderReview() {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await api.post("/auth/logout");
      if (res.data.success) {
        setUser(null);
      }
    } catch (error) {
      console.error("Session eviction failure from holding gate:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-4 relative select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      <div className="max-w-md w-full bg-[#0B0F19] border border-white/[0.06] rounded-[24px] p-8 md:p-10 text-center shadow-2xl relative z-10">
        
        <div className="flex justify-center mb-8">
          <div className="relative h-20 w-20 rounded-full bg-indigo-500/5 flex items-center justify-center border border-white/[0.04]">
            <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30 animate-[spin_20s_linear_infinite]" />
            <svg className="h-9 w-9 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
          Application Under Review
        </h1>
        
        <p className="text-xs text-slate-400 mt-3 leading-relaxed max-w-sm mx-auto">
          Your credentials and portfolio assets have been successfully logged into our vetting core.
        </p>

        <div className="my-8 p-4 rounded-xl bg-[#131926] border border-white/[0.04] text-left space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">✓</span>
            <span className="text-xs text-slate-300 font-semibold">Submission Transmitted</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] font-bold text-indigo-400 border border-indigo-500/20 animate-pulse">●</span>
            <span className="text-xs text-white font-bold">Administrative Vetting Pending</span>
          </div>
          <div className="flex items-center gap-3 opacity-40">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] font-bold text-slate-400 border border-white/10">3</span>
            <span className="text-xs text-slate-400 font-medium">Activation Key Email Delivery</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          Vetting operations evaluate records within 24 hours. You will receive an encrypted authorization link right inside your inbox upon profile activation.
        </p>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] py-3 text-xs font-bold text-slate-200 transition-all active:scale-[0.99]"
          >
            Check Update Status
          </button>
          
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors py-1 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoggingOut ? (
              <div className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Disconnect Session</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}