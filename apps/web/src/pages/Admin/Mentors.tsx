import { useEffect, useState } from "react";
import { Star, GraduationCap, Mail } from "lucide-react";
import api from "../../lib/axios";
import toast from "react-hot-toast";

interface Mentor {
  id: string;
  rating: number;
  expertise?: string[];
  experienceYears?: number | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
}

const AdminMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH MENTORS
  // ==========================================
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await api.get("/admin-auth/mentors");


        const mentorData =
          res.data?.data ||
          res.data?.mentors ||
          [];

        setMentors(Array.isArray(mentorData) ? mentorData : []);
      } catch (err) {
        console.error("Failed to fetch mentors:", err);
        toast.error("Failed to sync approved mentor directory");
        setMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-[#020617]">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#020617] text-slate-200 min-h-screen select-none w-full p-6">
      
      {/* HEADER SECTION */}
      <div className="text-center sm:text-left">
        
        <h1 className="text-3xl font-black text-white tracking-tight leading-none">
          Mentors Management
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-2.5">
          Review and audit verified instructor profiles deployed on MentorSala
        </p>
      </div>

      {/* EMPTY DIRECTORY FALLBACK */}
      {mentors.length === 0 ? (
        <div className="text-xs font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-8 rounded-2xl text-center">
          No approved system mentors found inside the database engine.
        </div>
      ) : (
        
        /* RECTANGULAR METRIC GRID WRAPPER WITH CURVED EDGES */
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto sm:mx-0">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#0F172A]/70 border border-white/[0.05] hover:border-indigo-500/40 rounded-[24px] p-6 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 relative group flex flex-col justify-between overflow-hidden backdrop-blur-md"
            >
              {/* Decorative Glow Core Mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-transparent pointer-events-none" />
              
              <div>
                {/* TOP AVATAR IDENTIFIER STRIP */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        mentor.user?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          mentor.user?.name || "Mentor"
                        )}&background=4f46e5&color=fff`
                      }
                      alt={mentor.user?.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/[0.08] shadow-md transition-transform group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors">
                      {mentor.user?.name || "Unverified Profile"}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1 truncate font-medium">
                      <Mail size={12} className="text-slate-500 shrink-0" />
                      <span className="truncate">{mentor.user?.email || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* STRUCTURAL CORE LOGISTICS STATS HUB */}
                <div className="grid grid-cols-2 gap-2.5 mt-5">
                  
                  {/* METRIC CARD: RATING */}
                  <div className="bg-[#1E293B]/40 border border-white/[0.02] rounded-xl p-3 text-center shadow-sm">
                    <div className="flex items-center justify-center gap-1 text-amber-400">
                      <Star size={13} fill="currentColor" />
                      <span className="text-white text-xs font-black">
                        {mentor.rating ?? 0}
                      </span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      Avg Rating
                    </div>
                  </div>

                  {/* METRIC CARD: EXPERIENCE */}
                  <div className="bg-[#1E293B]/40 border border-white/[0.02] rounded-xl p-3 text-center shadow-sm">
                    <div className="flex items-center justify-center gap-1 text-emerald-400">
                      <GraduationCap size={14} />
                      <span className="text-white text-xs font-black">
                        {mentor.experienceYears ?? 0} Yrs
                      </span>
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      Experience
                    </div>
                  </div>

                </div>
              </div>

              {/* EXPERTISE GLASSMORPHIC TAGS RACK */}
              <div className="mt-5 pt-4 border-t border-white/[0.04] flex flex-wrap gap-1.5 max-h-[64px] overflow-hidden">
                {(mentor.expertise || []).length === 0 ? (
                  <span className="text-[10px] font-bold text-slate-600 italic">No specialty tags indexed</span>
                ) : (
                  (mentor.expertise || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#1E293B]/40 border border-white/[0.04] text-slate-300 tracking-wide"
                    >
                      {skill}
                    </span>
                  ))
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMentors;