import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Star,
  Users,
  GraduationCap,
  X,
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
      setMentors(res.data.mentors || []);
      setFilteredMentors(res.data.mentors || []);
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
    const query = search.trim().toLowerCase();
    if (!query) {
      setFilteredMentors(mentors);
      return;
    }

    const filtered = mentors.filter(
      (mentor) =>
        mentor.user.name.toLowerCase().includes(query) ||
        mentor.qualification?.toLowerCase().includes(query) ||
        mentor.expertise?.some((skill) =>
          skill.toLowerCase().includes(query)
        )
    );
    setFilteredMentors(filtered);
  }, [search, mentors]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="h-9 w-9 rounded-full border-3 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white text-slate-800 min-h-screen select-none w-full mt-4">
      {/* Keyframe animation for the rotating conic border beam */}
      <style>{`
        @keyframes rotateBorderGlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-border-beam {
          animation: rotateBorderGlow 4s linear infinite;
        }
      `}</style>

      {/* REFINED PROFESSIONAL SEARCH INTERFACE */}
      <div className="relative mb-6 sm:mb-8 lg:mb-10 w-full max-w-xl">
        <div className="relative rounded-2xl sm:rounded-3xl p-[2px] overflow-hidden shadow-xl shadow-cyan-500/10">
          {/* Rotating Light-Blue / Cyan Conic Beam Border Animation */}
          <div
            className="absolute -inset-[150%] animate-border-beam"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #38bdf8 260deg, #06b6d4 310deg, #60a5fa 340deg, transparent 360deg)",
            }}
          />

          {/* Ambient Glow layer matching the border */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-cyan-400/10 blur-sm pointer-events-none" />

          {/* Inner Input Card */}
          <div className="relative flex items-center rounded-[14px] sm:rounded-[22px] bg-white border border-slate-200/80 transition-all duration-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-400/10">
            {/* Search Icon */}
            <div className="pointer-events-none pl-3.5 sm:pl-5 pr-2 sm:pr-3 text-sky-500 transition-colors">
              <Search size={18} className="stroke-[2.2] sm:w-5 sm:h-5" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentor by name or expertise..."
              className="h-11 sm:h-12 w-full bg-transparent pr-16 sm:pr-20 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
            />

            {/* Right Actions: Clear Button / Keyboard Shortcut */}
            <div className="absolute right-2.5 sm:right-3.5 flex items-center gap-1.5 sm:gap-2">
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              ) : (
                <span className="hidden sm:inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 tracking-wider">
                  ⌘
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RESPONSIVE GRID FOR MOBILE, TABS & LAPTOP
          ===================================================== */}
      {filteredMentors.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-slate-300 max-w-xl">
          <p className="text-sm font-semibold text-slate-600">No mentors found matching "{search}"</p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-3 text-xs font-bold text-purple-600 hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-purple-100 hover:border-purple-300 rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
            >
              {/* Ambient Background Accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-100/40 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-200/40 transition-colors" />

              <div>
                {/* TOP STRIP: AVATAR & QUICK STATS */}
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        mentor.user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.user.name)}&background=9333ea&color=fff`
                      }
                      alt={mentor.user.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-purple-100 shadow-sm group-hover:scale-105 transition-transform duration-200"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 h-3 sm:h-3.5 w-3 sm:w-3.5 rounded-full border-2 border-white ${
                        mentor.availableForMentorship ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                    />
                  </div>

                  {/* MINI HUD METRICS CONTAINER */}
                  <div className="flex gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold">
                    <div className="bg-amber-50 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center gap-1 border border-amber-200/70 shadow-2xs">
                      <Star size={12} className="text-amber-500" fill="currentColor" />
                      <span className="text-amber-800 font-extrabold">{mentor.rating}</span>
                    </div>
                    <div className="bg-purple-50 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center gap-1 border border-purple-100 shadow-2xs">
                      <Users size={12} className="text-purple-600" />
                      <span className="text-purple-900 font-extrabold">{mentor.totalStudents}</span>
                    </div>
                  </div>
                </div>

                {/* IDENTITY HEADLINE BLOCK */}
                <div className="mt-3 sm:mt-4 space-y-0.5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate group-hover:text-purple-900 transition-colors">
                    {mentor.user.name}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-semibold text-purple-600/90 tracking-wide truncate">
                    {mentor.qualification}
                  </p>
                </div>

                {/* BIO DESCRIPTION PARAGRAPH */}
                <p className="text-xs font-normal text-slate-500 line-clamp-3 mt-2 sm:mt-3 leading-relaxed">
                  {mentor.bio || "No summary profile details provided."}
                </p>

                {/* EXPERTISE BADGES STRIP */}
                <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-4">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] font-semibold rounded-md sm:rounded-lg bg-purple-50/70 border border-purple-100 text-purple-700 tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-2 py-0.5 sm:py-1 text-[10px] font-bold rounded-md sm:rounded-lg bg-purple-100 text-purple-700 border border-purple-200">
                      +{mentor.expertise.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* BOTTOM CARD ACTION BLOCK */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-purple-50 flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-500">
                  <GraduationCap size={15} className="text-purple-600 shrink-0" />
                  <span className="font-bold text-slate-700 truncate">{mentor.experienceYears} Yrs Exp</span>
                </div>

                <button
                  onClick={() => navigate(`/student/book-session/${mentor.id}`)}
                  className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-lg sm:rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md shadow-purple-600/25 hover:bg-purple-700 active:scale-[0.98] transition-all shrink-0 cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSession;