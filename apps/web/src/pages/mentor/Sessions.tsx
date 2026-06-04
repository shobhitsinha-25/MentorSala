import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  Clock,
  User,
  CheckCircle,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../../lib/axios";

interface Session {
  id: string;
  scheduledAt: string;
  duration: number;
  meetingLink?: string | null;
  status:
    | "SCHEDULED"
    | "COMPLETED"
    | "CANCELLED";
  student: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH SESSIONS
  // ==========================================

  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions/mentor");
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
  // COMPLETE SESSION
  // ==========================================

  const markCompleted = async (sessionId: string) => {
    try {
      await api.patch(`/sessions/${sessionId}/complete`);
      toast.success("Session marked completed");
      fetchSessions();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to complete session"
      );
    }
  };

  const saveMeetingLink =
  async (
    sessionId: string,
    meetingLink: string
  ) => {

    try {

      await api.patch(

        `/sessions/${sessionId}/meeting-link`,

        {
          meetingLink,
        }

      );

      toast.success(
        "Meeting link saved"
      );

      fetchSessions();

    } catch (error: any) {

      toast.error(

        error.response?.data
          ?.message ||

        "Failed to save link"

      );

    }

  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // ==========================================
  // FILTERS
  // ==========================================

  const upcoming = sessions.filter(
    (session) => session.status === "SCHEDULED"
  );

  const completed = sessions.filter(
    (session) => session.status === "COMPLETED"
  );

  const cancelled = sessions.filter(
    (session) => session.status === "CANCELLED"
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-[#020617]">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // ==========================================
  // CARD COMPONENT
  // ==========================================

  const SessionCard = ({
    session,
    showComplete,
  }: {
    session: Session;
    showComplete?: boolean;
  }) => (
    <div className="bg-[#0F172A]/70 border border-white/[0.05] rounded-[24px] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:border-indigo-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent pointer-events-none" />
      
      <div>
        {/* STUDENT PROFILE META BLOCK */}
        <div className="flex items-center gap-4 relative z-10">
          <img
            src={
              session.student.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(session.student.name)}&background=4f46e5&color=fff`
            }
            alt="student"
            className="w-14 h-14 rounded-xl object-cover border border-white/[0.08] shadow-md shadow-black/30 group-hover:scale-[1.02] transition-transform duration-200"
          />
          <div className="min-w-0">
            <h3 className="text-white font-bold tracking-tight text-base truncate group-hover:text-indigo-300 transition-colors">
              {session.student.name}
            </h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5 truncate max-w-full">
              {session.student.email}
            </p>
          </div>
        </div>

        {/* DETAILS LOGISTICS BLOCK */}
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
            <span className="font-bold">{session.duration} mins allocation</span>
          </div>
        </div>
      </div>
      {/* MEETING LINK */}

{showComplete && (

  <div className="mt-5">

    <input

      type="text"

      placeholder="Paste Google Meet / Zoom link"

      defaultValue={
        session.meetingLink || ""
      }

      onBlur={(e) => {

        const value =
          e.target.value.trim();

        if (!value) return;

        saveMeetingLink(

          session.id,

          value

        );

      }}

      className="w-full h-10 rounded-xl bg-[#020617] border border-white/[0.06] px-3 text-xs text-slate-300 outline-none focus:border-indigo-500"

    />

    {session.meetingLink && (

      <a

        href={
          session.meetingLink
        }

        target="_blank"

        rel="noreferrer"

        className="mt-2 block text-xs text-indigo-400 hover:text-indigo-300"

      >

        Open Meeting Link

      </a>

    )}

  </div>

)}

      {/* FOOTER ACTIONS AND STATUS HOOKS */}
      <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-col gap-3 relative z-10">
        <div>
          <span
            className={`
              px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase border inline-block
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

        {showComplete && (
          <button
            onClick={() => markCompleted(session.id)}
            className="w-full h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
          >
            <CheckCircle size={14} />
            <span>Mark Session Complete</span>
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
          Sessions
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-2.5">
          Manage and track your active student mentorship consultations
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
              No upcoming items currently scheduled in your planner roster
            </div>
          ) : (
            upcoming.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                showComplete
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
              No matching archival records found inside your cancellation folder
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

export default Sessions;