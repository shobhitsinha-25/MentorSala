import {
  Crown,
  Trophy,
  Medal,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getStudentLeaderboard,
  type LeaderboardStudent,
} from "../services/leaderboard.api";

// ======================================================
// TYPES
// ======================================================

interface LeaderboardData {
  leaderboard: LeaderboardStudent[];
  currentUser: LeaderboardStudent;
}

// ======================================================
// COMPONENT
// ======================================================

const DashboardLeaderboard = () => {
  const navigate = useNavigate();

  // ==================================================
  // STATE
  // ==================================================

  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);

  const [loading, setLoading] = useState(true);

  // ==================================================
  // FETCH LEADERBOARD
  // ==================================================

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const response = await getStudentLeaderboard();

        setLeaderboardData({
          leaderboard: response.leaderboard,
          currentUser: response.currentUser,
        });
      } catch (error: any) {
        console.error(
          "[Dashboard Leaderboard] Failed to load:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Unable to load leaderboard."
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchLeaderboard();
  }, []);

  // ==================================================
  // LOADING STATE
  // ==================================================

  if (loading) {
    return (
      <section className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col items-center justify-center min-h-[220px] gap-2.5">
          <Loader2 className="h-7 w-7 animate-spin text-purple-600" />
          <p className="text-xs font-semibold text-slate-400 animate-pulse">
            Loading student rankings...
          </p>
        </div>
      </section>
    );
  }

  if (!leaderboardData) {
    return null;
  }

  const { leaderboard, currentUser } = leaderboardData;

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <section className="relative z-10 rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Subtle Ambient Corner Accent */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-100/50 blur-3xl" />

      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 border border-amber-200/70 text-amber-600 shadow-2xs">
              <Trophy className="h-4 w-4" />
            </div>

            <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              Leaderboard
            </h2>
          </div>

          <p className="mt-1 text-[11px] sm:text-xs font-medium text-slate-500">
            Top performing students ranked by total XP earned
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/leaderboard")}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/80 px-3.5 py-1.5 text-xs font-bold text-purple-700 transition-all hover:bg-purple-600 hover:text-white hover:border-purple-600 active:scale-[0.98] cursor-pointer shadow-2xs"
        >
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ==================================================
          TOP STUDENTS LIST
          ================================================== */}

      <div className="relative z-10 mt-4 space-y-2">
        {leaderboard.map((student) => {
          const isCurrentUser = student.id === currentUser.id;

          return (
            <div
              key={student.id}
              className={`flex items-center justify-between gap-3 rounded-xl sm:rounded-2xl border p-2.5 sm:p-3.5 transition-all duration-200 ${
                isCurrentUser
                  ? "border-purple-300 bg-gradient-to-r from-purple-50 via-purple-50/50 to-indigo-50/40 shadow-xs ring-1 ring-purple-400/20"
                  : "border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300"
              }`}
            >
              {/* Left Segment: Rank, Avatar & Name */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                {/* Rank Badge */}
                <div
                  className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl font-black text-xs shadow-2xs ${
                    student.rank === 1
                      ? "bg-amber-100 text-amber-700 border border-amber-300/80"
                      : student.rank === 2
                      ? "bg-slate-200 text-slate-700 border border-slate-300"
                      : student.rank === 3
                      ? "bg-orange-100 text-orange-800 border border-orange-300/80"
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

                {/* Student Avatar */}
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

                {/* Identity & Level */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="truncate text-xs sm:text-sm font-bold text-slate-800">
                      {student.name}
                    </p>

                    {isCurrentUser && (
                      <span className="rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] font-black uppercase text-white shadow-2xs">
                        You
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-500">
                    {student.level}
                  </p>
                </div>
              </div>

              {/* Right Segment: XP readout */}
              <div className="text-right shrink-0">
                <p className="text-xs sm:text-sm font-black text-purple-700">
                  {student.xp.toLocaleString()}
                </p>

                <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  XP
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================
          CURRENT USER RANK HUD STRIP
          ================================================== */}

      <div className="relative z-10 mt-4 rounded-xl sm:rounded-2xl border border-purple-200/80 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white p-3 sm:p-4 shadow-2xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white font-black text-sm shadow-md shadow-purple-600/20">
              #{currentUser.rank}
            </div>

            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
                <Sparkles size={12} className="text-purple-600" />
                Your Global Standing
              </p>
              <p className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">
                {currentUser.name}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs sm:text-sm font-black text-purple-700">
              {currentUser.xp.toLocaleString()} XP
            </p>
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5">
              {currentUser.level}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLeaderboard;