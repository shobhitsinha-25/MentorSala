import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  Video,
  History,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../lib/axios";

// ============================================================
// TYPES
// ============================================================

interface Session {
  id: string;
  scheduledAt: string;
  duration: number;

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

type SessionTab =
  | "UPCOMING"
  | "PAST"
  | "COMPLETED"
  | "CANCELLED";

// ============================================================
// ERROR HANDLER
// ============================================================

const getUserFriendlyError = (
  error: unknown,
  fallbackMessage: string
): string => {
  // ==========================================================
  // AXIOS RESPONSE ERROR
  // ==========================================================

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    const status = response?.status;

    // ========================================================
    // USE BACKEND BUSINESS MESSAGE WHEN AVAILABLE
    // ========================================================

    const backendMessage =
      response?.data?.message;

    if (
      typeof backendMessage === "string" &&
      backendMessage.trim().length > 0
    ) {
      return backendMessage;
    }

    // ========================================================
    // FALLBACK BY STATUS
    // ========================================================

    switch (status) {
      case 400:
        return "The request could not be completed. Please try again.";

      case 401:
        return "Your session has expired. Please log in again.";

      case 403:
        return "You are not allowed to perform this action.";

      case 404:
        return "The requested session could not be found.";

      case 409:
        return "This session is no longer available. Please refresh your sessions.";

      case 429:
        return "Too many requests. Please wait a moment and try again.";

      case 500:
      case 502:
      case 503:
      case 504:
        return "Something went wrong on our side. Please try again shortly.";

      default:
        return fallbackMessage;
    }
  }

  // ==========================================================
  // NETWORK ERROR
  // ==========================================================

  if (
    typeof error === "object" &&
    error !== null &&
    "request" in error
  ) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // ==========================================================
  // FALLBACK
  // ==========================================================

  return fallbackMessage;
};

// ============================================================
// COMPONENT
// ============================================================

const Sessions = () => {
  const navigate = useNavigate();

  // ==========================================================
  // STATE
  // ==========================================================

  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [joiningSessionId, setJoiningSessionId] =
    useState<string | null>(null);

  const [completingSessionId, setCompletingSessionId] =
    useState<string | null>(null);

  const [activeTab, setActiveTab] =
    useState<SessionTab>("UPCOMING");

  // ==========================================================
  // CURRENT TIME
  // ==========================================================
  //
  // Used to automatically update the session category.
  //
  // A session moves to PAST ONLY after:
  //
  // scheduledAt + duration
  //
  // has passed.
  //

  const [currentTime, setCurrentTime] =
    useState(Date.now());

  // ==========================================================
  // FETCH SESSIONS
  // ==========================================================

  const fetchSessions = async () => {
    try {
      const res =
        await api.get("/sessions/mentor");

      setSessions(res.data.sessions);
    } catch (error: unknown) {
      console.error(
        "[Mentor Sessions] Failed to fetch sessions:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to load your sessions. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // JOIN VIDEO CALL
  // ==========================================================

  const handleJoinCall = (
    sessionId: string
  ) => {
    if (joiningSessionId) {
      return;
    }

    try {
      setJoiningSessionId(sessionId);

      navigate(
        `/mentorship/video-call/${sessionId}`
      );
    } catch (error: unknown) {
      console.error(
        "[Mentor Sessions] Failed to open video call:",
        error
      );

      toast.error(
        "Unable to open the video call. Please try again."
      );

      setJoiningSessionId(null);
    }
  };

  // ==========================================================
  // MARK SESSION AS COMPLETED
  // ==========================================================

  const markCompleted = async (
    sessionId: string
  ) => {
    if (completingSessionId) {
      return;
    }

    try {
      setCompletingSessionId(sessionId);

      await api.patch(
        `/sessions/${sessionId}/complete`
      );

      toast.success(
        "Session marked as completed"
      );

      await fetchSessions();

      // Automatically move mentor to Completed tab
      setActiveTab("COMPLETED");
    } catch (error: unknown) {
      console.error(
        "[Mentor Sessions] Failed to complete session:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to complete this session. Please try again."
        )
      );
    } finally {
      setCompletingSessionId(null);
    }
  };

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    void fetchSessions();
  }, []);

  // ==========================================================
  // REFRESH CURRENT TIME
  // ==========================================================
  //
  // Recalculate the session state every 30 seconds.
  //
  // Example:
  //
  // Session: 5:00 PM
  // Duration: 30 minutes
  //
  // 5:00 PM -> Upcoming / In Progress
  // 5:15 PM -> Upcoming / In Progress
  // 5:29 PM -> Upcoming / In Progress
  // 5:30 PM -> Past
  //
  // The page does not need to be manually refreshed.
  //

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        setCurrentTime(Date.now());
      }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ==========================================================
  // SESSION END TIME
  // ==========================================================

  const getSessionEndTime = (
    session: Session
  ): number => {
    const scheduledTime =
      new Date(
        session.scheduledAt
      ).getTime();

    const durationInMilliseconds =
      session.duration *
      60 *
      1000;

    return (
      scheduledTime +
      durationInMilliseconds
    );
  };

  // ==========================================================
  // CHECK IF SESSION IS PAST
  // ==========================================================
  //
  // IMPORTANT:
  //
  // We do NOT check:
  //
  // scheduledAt < currentTime
  //
  // because that would move the session to Past as soon
  // as the session STARTS.
  //
  // Instead we check:
  //
  // scheduledAt + duration <= currentTime
  //

  const isSessionPast = (
    session: Session
  ): boolean => {
    if (
      session.status !== "SCHEDULED"
    ) {
      return false;
    }

    const sessionEndTime =
      getSessionEndTime(session);

    return (
      currentTime >= sessionEndTime
    );
  };

  // ==========================================================
  // SESSION IN PROGRESS
  // ==========================================================

  const isSessionInProgress = (
    session: Session
  ): boolean => {
    if (
      session.status !== "SCHEDULED"
    ) {
      return false;
    }

    const startTime =
      new Date(
        session.scheduledAt
      ).getTime();

    const endTime =
      getSessionEndTime(session);

    return (
      currentTime >= startTime &&
      currentTime < endTime
    );
  };

  // ==========================================================
  // FILTERS
  // ==========================================================

  const upcoming = sessions.filter(
    (session) =>
      session.status === "SCHEDULED" &&
      !isSessionPast(session)
  );

  const past = sessions.filter(
    (session) =>
      session.status === "SCHEDULED" &&
      isSessionPast(session)
  );

  const completed = sessions.filter(
    (session) =>
      session.status === "COMPLETED"
  );

  const cancelled = sessions.filter(
    (session) =>
      session.status === "CANCELLED"
  );

  // ==========================================================
  // ACTIVE SESSIONS
  // ==========================================================

  const activeSessions =
    activeTab === "UPCOMING"
      ? upcoming
      : activeTab === "PAST"
      ? past
      : activeTab === "COMPLETED"
      ? completed
      : cancelled;

  // ==========================================================
  // TAB CONFIG
  // ==========================================================

  const tabs: {
    id: SessionTab;
    label: string;
    count: number;
  }[] = [
    {
      id: "UPCOMING",
      label: "Upcoming",
      count: upcoming.length,
    },
    {
      id: "PAST",
      label: "Past",
      count: past.length,
    },
    {
      id: "COMPLETED",
      label: "Completed",
      count: completed.length,
    },
    {
      id: "CANCELLED",
      label: "Cancelled",
      count: cancelled.length,
    },
  ];

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="h-9 w-9 rounded-full border-3 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // ==========================================================
  // SESSION CARD
  // ==========================================================

  const SessionCard = ({
    session,
    showComplete,
    isPast,
  }: {
    session: Session;
    showComplete?: boolean;
    isPast?: boolean;
  }) => {
    const isJoining =
      joiningSessionId === session.id;

    const isCompleting =
      completingSessionId === session.id;

    const inProgress =
      isSessionInProgress(session);

    return (
      <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 relative overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1">

        {/* ==================================================
            BACKGROUND GLOW
        ================================================== */}

        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-100/40 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-200/40 transition-colors" />

        <div>

          {/* ==================================================
              STUDENT PROFILE
          ================================================== */}

          <div className="flex items-center gap-4 relative z-10">

            <img
              src={
                session.student.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  session.student.name
                )}&background=9333ea&color=fff`
              }
              alt="student"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-100 shadow-sm group-hover:scale-105 transition-transform duration-200"
            />

            <div className="min-w-0">

              <h3 className="text-slate-900 font-bold tracking-tight text-base truncate group-hover:text-purple-900 transition-colors">
                {session.student.name}
              </h3>

              <p className="text-purple-600/90 text-xs font-semibold mt-0.5 truncate max-w-full">
                {session.student.email}
              </p>

            </div>

          </div>

          {/* ==================================================
              SESSION DETAILS
          ================================================== */}

          <div className="mt-5 space-y-3 relative z-10">

            {/* DATE */}

            <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-purple-50/50 rounded-xl px-3 py-2 border border-purple-100/60">

              <Calendar
                size={15}
                className="text-purple-600 shrink-0"
              />

              <span className="font-bold text-slate-800">
                {new Date(
                  session.scheduledAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>

            </div>

            {/* TIME */}

            <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-violet-50/50 rounded-xl px-3 py-2 border border-violet-100/60">

              <Clock
                size={15}
                className="text-violet-600 shrink-0"
              />

              <span className="font-bold text-slate-800">
                {new Date(
                  session.scheduledAt
                ).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </span>

            </div>

            {/* DURATION */}

            <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-fuchsia-50/50 rounded-xl px-3 py-2 border border-fuchsia-100/60">

              <User
                size={15}
                className="text-fuchsia-600 shrink-0"
              />

              <span className="font-bold text-slate-800">
                {session.duration} mins allocation
              </span>

            </div>

          </div>

        </div>

        {/* ====================================================
            FOOTER ACTIONS
        ==================================================== */}

        <div className="mt-6 pt-4 border-t border-purple-50 flex flex-col gap-3 relative z-10">

          {/* ==================================================
              STATUS
          ================================================== */}

          <div>

            <span
              className={`
                px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border inline-flex items-center gap-1.5
                ${
                  isPast
                    ? "bg-amber-100/80 text-amber-700 border-amber-200"
                    : session.status === "SCHEDULED"
                    ? "bg-purple-100/80 text-purple-700 border-purple-200"
                    : session.status === "COMPLETED"
                    ? "bg-emerald-100/80 text-emerald-700 border-emerald-200"
                    : "bg-rose-100/80 text-rose-700 border-rose-200"
                }
              `}
            >

              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPast
                    ? "bg-amber-600"
                    : session.status === "SCHEDULED"
                    ? "bg-purple-600"
                    : session.status === "COMPLETED"
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                }`}
              />

              {isPast
                ? "PAST"
                : session.status}

            </span>

          </div>

          {/* ==================================================
              SESSION IN PROGRESS
          ================================================== */}

          {session.status === "SCHEDULED" &&
            inProgress &&
            !isPast &&
            activeTab === "UPCOMING" && (
              <div className="w-full h-10 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-bold flex items-center justify-center gap-2">

                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                Session is in progress

              </div>
            )}

          {/* ==================================================
              START / JOIN CALL
          ================================================== */}

          {session.status === "SCHEDULED" &&
            !isPast &&
            activeTab === "UPCOMING" && (
              <button
                type="button"
                onClick={() =>
                  handleJoinCall(
                    session.id
                  )
                }
                disabled={isJoining}
                className={`
                  w-full
                  h-11
                  rounded-xl
                  text-white
                  text-sm
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-200
                  active:scale-[0.98]
                  shadow-sm
                  ${
                    isJoining
                      ? "bg-purple-400 cursor-not-allowed shadow-none"
                      : "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20 hover:shadow-md"
                  }
                `}
              >

                {isJoining ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />

                    Opening call...
                  </>
                ) : (
                  <>
                    <Video size={16} />

                    Start / Join Call
                  </>
                )}

              </button>
            )}

          {/* ==================================================
              PAST SESSION MESSAGE
          ================================================== */}

          {isPast && (
            <div className="w-full min-h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold flex items-center justify-center gap-2 px-3 text-center">

              <History
                size={14}
                className="shrink-0"
              />

              <span>
                Session time has passed
              </span>

            </div>
          )}

          {/* ==================================================
              MARK SESSION AS COMPLETED
          ================================================== */}
          //
          // IMPORTANT:
          //
          // This button is intentionally shown in the PAST
          // section, NOT the UPCOMING section.
          //
          // The mentor can mark the session completed only
          // after its scheduled duration has passed.
          //

          {showComplete &&
            isPast &&
            session.status === "SCHEDULED" && (
              <button
                type="button"
                onClick={() =>
                  markCompleted(
                    session.id
                  )
                }
                disabled={isCompleting}
                className="
                  w-full
                  h-11
                  rounded-xl
                  bg-emerald-50
                  border
                  border-emerald-200
                  text-emerald-700
                  text-xs
                  font-bold
                  hover:bg-emerald-600
                  hover:text-white
                  hover:border-emerald-600
                  transition-all
                  duration-200
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-2xs
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                {isCompleting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-emerald-400 border-t-emerald-700 animate-spin" />

                    Marking completed...
                  </>
                ) : (
                  <>
                    <CheckCircle
                      size={14}
                    />

                    <span>
                      Mark Session Complete
                    </span>
                  </>
                )}

              </button>
            )}

        </div>

      </div>
    );
  };

  // ==========================================================
  // EMPTY STATE MESSAGE
  // ==========================================================

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "UPCOMING":
        return "No upcoming sessions scheduled";

      case "PAST":
        return "No past sessions";

      case "COMPLETED":
        return "No completed sessions";

      case "CANCELLED":
        return "No cancelled sessions";

      default:
        return "No sessions found.";
    }
  };

  const getEmptySubMessage = () => {
    switch (activeTab) {
      case "UPCOMING":
        return "New bookings from students will appear here.";

      case "PAST":
        return "Sessions whose complete duration has passed will appear here. Mark them as completed after the session.";

      case "COMPLETED":
        return "Sessions marked as completed will be cataloged here.";

      case "CANCELLED":
        return "Archived cancelled bookings will be logged here.";

      default:
        return "Your session history will appear here.";
    }
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="p-6 bg-white text-slate-800 min-h-screen select-none w-full">

      {/* ======================================================
          SESSION TABS
      ====================================================== */}

      <div>

        <div className="flex items-center gap-1.5 p-1.5 bg-purple-50/60 border border-purple-100 rounded-2xl w-full sm:w-fit overflow-x-auto shadow-2xs">

          {tabs.map((tab) => {

            const isActive =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`
                  relative
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  h-10
                  rounded-xl
                  text-xs
                  font-bold
                  whitespace-nowrap
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }
                `}
              >

                <span>
                  {tab.label}
                </span>

                <span
                  className={`
                    min-w-[22px]
                    h-5
                    px-1.5
                    rounded-md
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    font-black
                    transition-colors
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-purple-100/80 text-purple-700"
                    }
                  `}
                >
                  {tab.count}
                </span>

              </button>
            );

          })}

        </div>

      </div>

      {/* ======================================================
          ACTIVE SECTION COUNT
      ====================================================== */}

      <div className="mb-5 flex items-center justify-between mt-6">

        <div />

        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">

          {activeSessions.length}{" "}

          {activeSessions.length === 1
            ? "Session"
            : "Sessions"}

        </span>

      </div>

      {/* ======================================================
          ACTIVE SESSION LIST
      ====================================================== */}

      {activeSessions.length === 0 ? (

        <div className="flex flex-col items-center justify-center min-h-[280px] bg-purple-50/20 border border-dashed border-purple-200 rounded-3xl px-6">

          <div className="w-12 h-12 rounded-2xl bg-purple-100/70 border border-purple-200 flex items-center justify-center mb-4 text-purple-600">

            {activeTab === "PAST" ? (
              <History
                size={20}
                className="text-amber-500"
              />
            ) : activeTab === "COMPLETED" ? (
              <CheckCircle
                size={20}
                className="text-emerald-500"
              />
            ) : (
              <Calendar
                size={20}
                className="text-purple-600"
              />
            )}

          </div>

          <p className="text-sm font-semibold text-slate-700 text-center">
            {getEmptyMessage()}
          </p>

          <p className="text-xs text-slate-500 mt-1 text-center">
            {getEmptySubMessage()}
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {activeSessions.map(
            (session) => (
              <SessionCard
                key={session.id}
                session={session}
                isPast={
                  activeTab === "PAST"
                }
                showComplete={
                  activeTab === "PAST"
                }
              />
            )
          )}

        </div>

      )}

    </div>
  );
};

export default Sessions;