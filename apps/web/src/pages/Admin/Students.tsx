import { useEffect, useState } from "react";
import { 
  Award, 
  Flame, 
  Zap, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Mail 
} from "lucide-react";
import api from "../../lib/axios";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string | null;

  targetExam: string | null;
  currentClass: string | null;
  targetYear: string | null;

  xp: number;
  streak: number;
  level: string;

  onboardingCompleted: boolean;
}

const AdminStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/user/students");


        setStudents(res.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 font-medium text-sm animate-pulse">Loading core student index...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-[#020617] text-slate-200 min-h-screen p-6 w-full select-none">
      
      {/* HEADER SECTION */}
      <div className="text-center sm:text-left border-b border-white/[0.04] pb-6">
        
        <h1 className="text-4xl font-black text-white tracking-tight leading-none">
          Students Directory
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-2.5">
          Monitor performance, track lifecycle metrics, and inspect verified user progress profiles.
        </p>
      </div>

      {/* EMPTY DIRECTORY FALLBACK */}
      {students.length === 0 ? (
        <div className="text-sm font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-12 rounded-2xl text-center">
          No registered student profiles found inside the active container.
        </div>
      ) : (
        
        /* STUDENT METRIC GRID WRAPPER */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto sm:mx-0">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-[#0F172A]/40 border border-white/[0.04] hover:border-indigo-500/30 rounded-[24px] p-6 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 relative group flex flex-col justify-between overflow-hidden backdrop-blur-md"
            >
              {/* Decorative Tech Mesh Underlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] via-transparent to-transparent pointer-events-none" />

              <div>
                {/* PROFILE HUB AVATAR HEADER */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        student.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          student.name
                        )}&background=4f46e5&color=fff`
                      }
                      alt={student.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/[0.06] shadow-md transition-transform group-hover:scale-[1.03]"
                    />
                    
                    {/* Floating Status Indicator Pin */}
                    <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#090d16] ${
                      student.onboardingCompleted ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1 truncate font-medium">
                      <Mail size={12} className="text-slate-500 shrink-0" />
                      <span className="truncate">{student.email}</span>
                    </div>
                  </div>
                </div>

                {/* GAMIFICATION STATS COUNTERS */}
                <div className="grid grid-cols-3 gap-2 mt-5">
                  <div className="bg-[#1E293B]/30 border border-white/[0.02] rounded-xl p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-400">
                      <Award size={13} />
                      <span className="text-white text-xs font-black tracking-tight">{student.level}</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Tier Rank</div>
                  </div>

                  <div className="bg-[#1E293B]/30 border border-white/[0.02] rounded-xl p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-400">
                      <Zap size={13} fill="currentColor" />
                      <span className="text-white text-xs font-black tracking-tight">{student.xp}</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Total XP</div>
                  </div>

                  <div className="bg-[#1E293B]/30 border border-white/[0.02] rounded-xl p-2.5 text-center">
                    <div className="flex items-center justify-center gap-1 text-orange-500">
                      <Flame size={13} fill="currentColor" />
                      <span className="text-white text-xs font-black tracking-tight">{student.streak}d</span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Streak</div>
                  </div>
                </div>

                {/* TARGET STRATEGICS MANIFEST */}
                <div className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.03]">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 text-slate-400">
                      <BookOpen size={13} className="text-slate-500" />
                      <span>Target Exam</span>
                    </div>
                    <span className="text-slate-200 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md font-bold">
                      {student.targetExam || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 text-slate-400">
                      <GraduationCap size={13} className="text-slate-500" />
                      <span>Current Class</span>
                    </div>
                    <span className="text-slate-200 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md font-bold">
                      {student.currentClass || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={13} className="text-slate-500" />
                      <span>Target Year</span>
                    </div>
                    <span className="text-slate-200 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-md font-bold">
                      {student.targetYear || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER CORE INFRASTRUCTURE STATUS TICKET */}
              <div className="mt-5 pt-3 border-t border-white/[0.03] flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lifecycle State</span>
                {student.onboardingCompleted ? (
                  <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-wide bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    <CheckCircle2 size={10} />
                    <span>Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] font-black uppercase tracking-wide bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                    <Clock size={10} />
                    <span>Pending Setup</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;