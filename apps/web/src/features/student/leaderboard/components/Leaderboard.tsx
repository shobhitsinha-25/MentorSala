import {
  Crown,
  Medal,
  Trophy,
  Loader2,
  Sparkles,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  getTop100StudentLeaderboard,
  type LeaderboardStudent,
} from "../services/leaderboard.api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardStudent[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ====================================================
  // FETCH TOP 100
  // ====================================================

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const response = await getTop100StudentLeaderboard();

        setLeaderboard(response.leaderboard || []);
        setCurrentUser(response.currentUser || null);
      } catch (error: any) {
        console.error("[Leaderboard Page] Failed to load:", error);
        toast.error(
          error?.response?.data?.message || "Unable to load leaderboard."
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchLeaderboard();
  }, []);

  // ====================================================
  // SEARCH FILTER
  // ====================================================

  const filteredLeaderboard = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return leaderboard;

    return leaderboard.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.level.toLowerCase().includes(query) ||
        String(student.rank).includes(query)
    );
  }, [leaderboard, search]);

  const clearSearch = () => {
    setSearch("");
  };

  // ====================================================
  // LOADING STATE
  // ====================================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-xs sm:text-sm font-semibold text-slate-500 animate-pulse">
            Loading student rankings...
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 lg:px-8 py-5 sm:py-8 select-none relative overflow-hidden">
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

      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[450px] h-[250px] bg-purple-200/40 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-20 w-[400px] h-[300px] bg-indigo-200/30 blur-[140px] rounded-full" />

      {/* ==================================================
          PAGE HEADER
          ================================================== */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 shadow-xs">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1">
              
              National Rankings
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Student Leaderboard
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
              Top 100 students ranked by total XP earned
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white border border-purple-100 px-3.5 py-2 shadow-2xs text-xs font-semibold text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Academic Scores</span>
        </div>
      </div>

      {/* ==================================================
          CURRENT USER STANDING BANNER
          ================================================== */}
      {currentUser && (
        <div className="mb-6 rounded-2xl sm:rounded-3xl border border-purple-200/80 bg-gradient-to-r from-purple-50 via-indigo-50/40 to-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white font-black text-sm sm:text-base shadow-md shadow-purple-600/20">
                #{currentUser.rank}
              </div>

              <div className="min-w-0">
                <p className="flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-700">
                  
                  Your Global Standing
                </p>
                <p className="text-sm sm:text-base font-black text-slate-900 truncate mt-0.5">
                  {currentUser.name}
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
                  {currentUser.level}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-base sm:text-xl font-black text-purple-700">
                {currentUser.xp.toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Total XP
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          SEARCH BAR (LIGHT BLUE ANIMATED CONIC BEAM)
          ================================================== */}
      <div className="mb-6 w-full max-w-md mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl p-[2px] overflow-hidden shadow-xl shadow-cyan-500/10">
          <div
            className="absolute -inset-[150%] animate-border-beam"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 180deg, #38bdf8 260deg, #06b6d4 310deg, #60a5fa 340deg, transparent 360deg)",
            }}
          />

          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-cyan-400/10 blur-sm pointer-events-none" />

          <div className="relative flex items-center rounded-[14px] sm:rounded-[22px] bg-white border border-slate-200/80 transition-all duration-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-400/10">
            <div className="pointer-events-none pl-3.5 sm:pl-4 pr-2 text-sky-500">
              <Search size={18} className="stroke-[2.2]" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name or rank..."
              className="h-11 sm:h-12 w-full bg-transparent pr-14 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
            />

            {search && (
              <div className="absolute right-3 flex items-center">
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================
          LEADERBOARD TABLE / LIST
          ================================================== */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white shadow-xs">
        {/* Table Column Header */}
        <div className="grid grid-cols-[60px_1fr_90px] sm:grid-cols-[80px_1fr_120px] gap-2 sm:gap-3 border-b border-slate-100 bg-slate-50/80 px-3.5 sm:px-5 py-3 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500">
          <span>Rank</span>
          <span>Student</span>
          <span className="text-right">XP Earned</span>
        </div>

        {/* Rows */}
        {filteredLeaderboard.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              No students found matching "{search}"
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-2 text-xs font-bold text-purple-600 hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLeaderboard.map((student) => {
              const isCurrentUser = student.id === currentUser?.id;

              return (
                <div
                  key={student.id}
                  className={`grid grid-cols-[60px_1fr_90px] sm:grid-cols-[80px_1fr_120px] gap-2 sm:gap-3 items-center px-3.5 sm:px-5 py-3 sm:py-3.5 transition-colors ${
                    isCurrentUser
                      ? "bg-purple-50/90 ring-1 ring-inset ring-purple-200/90"
                      : "hover:bg-slate-50/70"
                  }`}
                >
                  {/* Rank Column */}
                  <div>
                    <div
                      className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-xs sm:text-sm font-black shadow-2xs ${
                        student.rank === 1
                          ? "bg-amber-100 text-amber-700 border border-amber-300"
                          : student.rank === 2
                          ? "bg-slate-200 text-slate-700 border border-slate-300"
                          : student.rank === 3
                          ? "bg-orange-100 text-orange-800 border border-orange-300"
                          : "bg-white text-slate-500 border border-slate-200"
                      }`}
                    >
                      {student.rank === 1 ? (
                        <Crown className="h-4 w-4 text-amber-600" />
                      ) : student.rank === 2 ? (
                        <Medal className="h-4 w-4 text-slate-600" />
                      ) : student.rank === 3 ? (
                        <Medal className="h-4 w-4 text-orange-600" />
                      ) : (
                        `#${student.rank}`
                      )}
                    </div>
                  </div>

                  {/* Student Details Column */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    {student.avatar ? (
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-full object-cover border border-purple-200/80 shadow-2xs"
                      />
                    ) : (
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-xs font-black text-white shadow-2xs">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="truncate text-xs sm:text-sm font-bold text-slate-800">
                          {student.name}
                        </p>

                        {isCurrentUser && (
                          <span className="shrink-0 rounded-full bg-purple-600 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black uppercase text-white shadow-2xs">
                            You
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
                        {student.level}
                      </p>
                    </div>
                  </div>

                  {/* XP Points Column */}
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-black text-purple-700">
                      {student.xp.toLocaleString()}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      XP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;