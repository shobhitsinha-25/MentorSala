import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Star,
  Users,
  GraduationCap,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../../lib/axios";
import toast from "react-hot-toast";

interface Mentor {
  id: string;
  bio: string;
  qualification: string;
  expertise: string[];
  experienceYears: number;
  rating: number;
  totalStudents: number;
  availableForMentorship: boolean;
  user: {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
  };
}

const BookSession = () => {
  const navigate = useNavigate();

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================================
  // FETCH MENTORS
  // ==========================================

  const fetchMentors = async () => {
    try {
      const res = await api.get("/mentors");
      setMentors(res.data.mentors);
      setFilteredMentors(res.data.mentors);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch mentors"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================

  useEffect(() => {
    const filtered = mentors.filter(
      (mentor) =>
        mentor.user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        mentor.expertise.some(
          (skill) =>
            skill
              .toLowerCase()
              .includes(search.toLowerCase())
        )
    );
    setFilteredMentors(filtered);
  }, [search, mentors]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-[#020617]">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#020617] text-slate-200 min-h-screen select-none">
      
      {/* HEADER SECTION */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-white tracking-tight leading-none">
          Book a Session
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-2.5">
          Connect with expert mentors matching your target curriculum tracks
        </p>
      </div>

      {/* ✅ HIGHLY REFINED LUXURY SEARCH INTERFACE */}
      <div className="relative mb-10 max-w-xl mx-auto sm:mx-0 group">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search mentor by name or expertise..."
          className="w-full h-12 bg-[#0B0F19] border border-white/[0.06] rounded-xl pl-12 pr-16 text-sm font-semibold text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:bg-[#0D1321] focus:shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all duration-200 shadow-inner"
        />
        
      </div>

      {/* =====================================================
          ✅ RECTANGULAR DISPLAY GRID WITH BALANCED DARK CONTRAST
          ===================================================== */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto sm:mx-0">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-[#0F172A]/70 border border-white/[0.05] hover:border-indigo-500/40 rounded-[24px] p-6 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 relative group flex flex-col justify-between overflow-hidden backdrop-blur-md"
          >
            {/* Background Light Mesh Inlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-transparent pointer-events-none" />
            
            <div>
              {/* TOP STRIP: AVATAR & QUICK STATS */}
              <div className="flex items-start justify-between gap-4">
                <div className="relative shrink-0">
                  <img
                    src={
                      mentor.user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.user.name)}&background=4f46e5&color=fff`
                    }
                    alt={mentor.user.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/[0.08] shadow-md shadow-black/30 group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#0B0F19] ${
                    mentor.availableForMentorship ? "bg-emerald-500" : "bg-slate-500"
                  }`} />
                </div>

                {/* MINI HUD METRICS CONTAINER */}
                <div className="flex gap-2 text-[11px] font-bold text-slate-400">
                  <div className="bg-[#1E293B]/60 rounded-xl px-2.5 py-1.5 flex items-center gap-1 border border-white/[0.02] shadow-sm">
                    <Star size={12} className="text-amber-400" fill="currentColor" />
                    <span className="text-slate-100 font-extrabold">{mentor.rating}</span>
                  </div>
                  <div className="bg-[#1E293B]/60 rounded-xl px-2.5 py-1.5 flex items-center gap-1 border border-white/[0.02] shadow-sm">
                    <Users size={12} className="text-cyan-400" />
                    <span className="text-slate-100 font-extrabold">{mentor.totalStudents}</span>
                  </div>
                </div>
              </div>

              {/* IDENTITY HEADLINE BLOCK */}
              <div className="mt-4 space-y-1">
                <h2 className="text-lg font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors">
                  {mentor.user.name}
                </h2>
                <p className="text-xs font-semibold text-indigo-400/90 tracking-wide truncate">
                  {mentor.qualification}
                </p>
              </div>

              {/* BIO DESCRIPTION PARAGRAPH */}
              <p className="text-xs font-medium text-slate-400/90 line-clamp-3 mt-3 leading-relaxed">
                {mentor.bio || "No summary profile details provided."}
              </p>

              {/* EXPERTISE BADGES STRIP */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {mentor.expertise.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#1E293B]/40 border border-white/[0.04] text-slate-300 tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="px-2 py-1 text-[10px] font-bold rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 shadow-sm">
                    +{mentor.expertise.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* BOTTOM CARD ACTION BLOCK */}
            <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between gap-4">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <GraduationCap size={14} className="text-slate-600" />
                <span className="font-bold text-slate-400">{mentor.experienceYears} Years Exp</span>
              </div>

              <button
                onClick={() => navigate(`/student/book-session/${mentor.id}`)}
                className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white text-xs font-bold shadow-md shadow-indigo-500/5 hover:opacity-95 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] active:scale-[0.98] transition-all"
              >
                View Profile
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default BookSession;