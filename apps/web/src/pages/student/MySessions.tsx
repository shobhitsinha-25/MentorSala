import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  Clock,
  User,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../../lib/axios";

interface Session {
  id: string;
  scheduledAt: string;
  meetingLink?: string | null;
  duration: number;
  status:
    | "SCHEDULED"
    | "COMPLETED"
    | "CANCELLED";
  mentor: {
    user: {
      name: string;
      avatar: string | null;
      email: string;
    };
  };
}

const MySessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH SESSIONS
  // ==========================================

  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions/student");
      setSessions(res.data.sessions);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch sessions"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // CANCEL SESSION
  // ==========================================

  const cancelSession = async (sessionId: string) => {
    try {
      await api.patch(`/sessions/${sessionId}/cancel`);
      toast.success("Session cancelled successfully");
      fetchSessions();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to cancel session"
      );
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const upcoming = sessions.filter(
    (session) => session.status === "SCHEDULED"
  );

  const completed = sessions.filter(
    (session) => session.status === "COMPLETED"
  );

  const cancelled = sessions.filter(
    (session) => session.status === "CANCELLED"
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-[#020617]">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const SessionCard = ({
    session,
    showCancel,
  }: {
    session: Session;
    showCancel?: boolean;
  }) => (
    // ✅ REFINED COMPONENT: Translucent glass backdrop matching card template specs perfectly
    <div className="bg-[#0F172A]/70 border border-white/[0.05] rounded-[24px] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:border-indigo-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent pointer-events-none" />
      
      <div>
        {/* AVATAR STRIP */}
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={
              session.mentor.user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(session.mentor.user.name)}&background=4f46e5&color=fff`
            }
            alt="mentor"
            className="w-14 h-14 rounded-xl object-cover border border-white/[0.08] shadow-md shadow-black/30 group-hover:scale-[1.02] transition-transform duration-200"
          />
          <div className="min-w-0">
            <h3 className="text-white font-bold tracking-tight text-base truncate group-hover:text-indigo-300 transition-colors">
              {session.mentor.user.name}
            </h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5 tracking-wide uppercase">
              Mentor Profile
            </p>
          </div>
        </div>

        {/* METADATA HORIZONS */}
        <div className="mt-5 space-y-2.5 relative z-10">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <Calendar size={14} className="text-indigo-400 shrink-0" />
            <span className="font-bold">
              {new Date(session.scheduledAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <Clock size={14} className="text-indigo-400 shrink-0" />
            <span className="font-bold">
              {new Date(session.scheduledAt).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <User size={14} className="text-indigo-400 shrink-0" />
            <span className="font-bold">{session.duration} minutes slot</span>
          </div>
        </div>
      </div>

      {/* STATUS STRIP OR DESTRUCTIVE ACTION ROW */}
      <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-col gap-3 relative z-10">
        <div>
          <span
            className={`
              px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase border
              ${
                session.status === "SCHEDULED"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                  : session.status === "COMPLETED"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
              }
            `}
          >
            {session.status}
          </span>
        </div>
        {session.meetingLink && (

  <a

    href={
      session.meetingLink
    }

    target="_blank"

    rel="noreferrer"

    className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-indigo-500 text-white text-sm font-semibold"

  >

    Join Meeting

  </a>

)}

        {showCancel && (
          <button
            onClick={() => cancelSession(session.id)}
            className="w-full h-10 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-[0.98] shadow-sm"
          >
            Cancel Session Allocation
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-[#020617] text-slate-200 min-h-screen select-none w-full">
      
      {/* HEADER SECTION */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-white tracking-tight leading-none">
          My Sessions
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-2.5">
          Manage your scheduled mentorship consultation sessions
        </p>
      </div>

      {/* UPCOMING TRACK */}
      <section className="mb-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5 leading-none">
          Upcoming Sessions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.length === 0 ? (
            <div className="text-xs font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-6 rounded-2xl text-center sm:col-span-2 lg:col-span-3">
              No upcoming items currently listed inside your schedule roster
            </div>
          ) : (
            upcoming.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                showCancel
              />
            ))
          )}
        </div>
      </section>

      {/* COMPLETED TRACK */}
      <section className="mb-10">
        <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5 leading-none">
          Completed Sessions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completed.length === 0 ? (
            <div className="text-xs font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-6 rounded-2xl text-center sm:col-span-2 lg:col-span-3">
              No completed sessions 
            </div>
          ) : (
            completed.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
              />
            ))
          )}
        </div>
      </section>

      {/* CANCELLED TRACK */}
      <section>
        <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2.5 leading-none">
          Cancelled Sessions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cancelled.length === 0 ? (
            <div className="text-xs font-semibold text-slate-500 bg-white/[0.01] border border-dashed border-white/[0.04] p-6 rounded-2xl text-center sm:col-span-2 lg:col-span-3">
              No matching records found inside your archive log folder
            </div>
          ) : (
            cancelled.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
              />
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default MySessions;