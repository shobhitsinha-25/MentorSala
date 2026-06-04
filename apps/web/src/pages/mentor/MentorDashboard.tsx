import { useAuthStore } from "../../store/auth.store";
import { Video, Calendar } from "lucide-react";

export default function MentorDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none flex items-center justify-center">
      
      {/* HERO HEADER BRAND CARD - DARK MODE POLISHED */}
      <section className="bg-[#0F172A]/40 border border-white/[0.04] rounded-[24px] p-8 relative overflow-hidden backdrop-blur-md shadow-2xl max-w-3xl w-full mx-auto">
        {/* Subtle decorative glow overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.03] via-purple-500/[0.03] to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mx-auto md:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Portal Node Active</span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight leading-tight pt-1">
              Welcome back, {user?.name || "Instructor"}
            </h1>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Continue mentoring students, uploading advanced lecture modules, and conducting interactive live troubleshooting tracks.
            </p>
          </div>
         
        </div>
      </section>

    </div>
  );
}