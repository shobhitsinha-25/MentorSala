import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  Clock,
  User,
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

const MySessions = () => {
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

  const [cancellingSessionId, setCancellingSessionId] =
    useState<string | null>(null);

  const [activeTab, setActiveTab] =
    useState<SessionTab>("UPCOMING");

  // ==========================================================
  // CURRENT TIME
  // ==========================================================
  //
  // Used to automatically update the session category.
  //
  // A session moves to Past ONLY after:
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
        await api.get("/sessions/student");

      setSessions(res.data.sessions);
    } catch (error: unknown) {
      console.error(
        "[MySessions] Failed to fetch sessions:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to load your mentorship sessions. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // JOIN VIDEO CALL
  // ==========================================================

  const handleJoinCall = async (
    sessionId: string
  ) => {
    if (joiningSessionId) {
      return;
    }

    try {
      setJoiningSessionId(sessionId);

      const res =
        await api.get(
          `/sessions/${sessionId}/join`
        );

      const data = res.data?.data;

      // ========================================================
      // CHECK WHETHER SESSION CAN BE JOINED
      // ========================================================

      if (!data?.canJoin) {
        toast.error(
          "This session cannot be joined right now. Please try again closer to the scheduled time."
        );

        return;
      }

      // ========================================================
      // OPEN VIDEO CALL PAGE
      // ========================================================

      navigate(
        `/mentorship/video-call/${sessionId}`
      );
    } catch (error: unknown) {
      console.error(
        "[MySessions] Join call failed:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to join the mentorship session right now. Please try again."
        )
      );
    } finally {
      setJoiningSessionId(null);
    }
  };

  // ==========================================================
  // CANCEL SESSION
  // ==========================================================

  const cancelSession = async (
    sessionId: string
  ) => {
    if (cancellingSessionId) {
      return;
    }

    try {
      setCancellingSessionId(sessionId);

      await api.patch(
        `/sessions/${sessionId}/cancel`
      );

      toast.success(
        "Session cancelled successfully."
      );

      await fetchSessions();

      // Automatically move user to Cancelled tab
      setActiveTab("CANCELLED");
    } catch (error: unknown) {
      console.error(
        "[MySessions] Cancel session failed:",
        error
      );

      const message =
        getUserFriendlyError(
          error,
          "Unable to cancel this session. Please try again."
        );

      toast.error(message);
    } finally {
      setCancellingSessionId(null);
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
  // The UI checks the session time every 30 seconds.
  //
  // IMPORTANT:
  // A session does NOT move to Past when its START time passes.
  //
  // It moves to Past only when:
  //
  // START TIME + DURATION
  //
  // has passed.
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
  // HELPER: SESSION END TIME
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
  // HELPER: CHECK WHETHER SESSION IS PAST
  // ==========================================================
  //
  // Example:
  //
  // scheduledAt = 5:00 PM
  // duration    = 30 minutes
  //
  // end time    = 5:30 PM
  //
  // Before 5:30 PM -> NOT PAST
  // After 5:30 PM  -> PAST
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
  // UPCOMING SESSIONS
  // ==========================================================
  //
  // SCHEDULED sessions remain Upcoming until their
  // COMPLETE duration has passed.
  //

  const upcoming = sessions.filter(
    (session) => {
      if (
        session.status !== "SCHEDULED"
      ) {
        return false;
      }

      return !isSessionPast(session);
    }
  );

  // ==========================================================
  // PAST SESSIONS
  // ==========================================================
  //
  // Only SCHEDULED sessions whose complete duration
  // has passed are placed here.
  //

  const past = sessions.filter(
    (session) => {
      if (
        session.status !== "SCHEDULED"
      ) {
        return false;
      }

      return isSessionPast(session);
    }
  );

  // ==========================================================
  // COMPLETED
  // ==========================================================

  const completed = sessions.filter(
    (session) =>
      session.status === "COMPLETED"
  );

  // ==========================================================
  // CANCELLED
  // ==========================================================

  const cancelled = sessions.filter(
    (session) =>
      session.status === "CANCELLED"
  );

  // ==========================================================
  // ACTIVE SESSION LIST
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
    showCancel,
  }: {
    session: Session;
    showCancel?: boolean;
  }) => {
    const isJoining =
      joiningSessionId === session.id;

    const isCancelling =
      cancellingSessionId === session.id;

    const isActionInProgress =
      isJoining || isCancelling;

    const sessionEndTime =
      getSessionEndTime(session);

    const sessionHasStarted =
      currentTime >=
      new Date(
        session.scheduledAt
      ).getTime();

    const sessionHasEnded =
      currentTime >=
      sessionEndTime;

    return (
      <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 relative overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 mt-5">

        {/* Background Glow */}

        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-100/40 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-200/40 transition-colors" />

        <div>

          {/* ==================================================
              AVATAR STRIP
          ================================================== */}

          <div className="flex items-center gap-4 relative z-10">

            <img
              src={
                session.mentor.user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  session.mentor.user.name
                )}&background=9333ea&color=fff`
              }
              alt="mentor"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-100 shadow-sm group-hover:scale-105 transition-transform duration-200"
            />

            <div className="min-w-0">

              <h3 className="text-slate-900 font-bold tracking-tight text-base truncate group-hover:text-purple-900 transition-colors">
                {session.mentor.user.name}
              </h3>

              <p className="text-purple-600/90 text-xs font-semibold mt-0.5 tracking-wide uppercase">
                Mentor Profile
              </p>

            </div>

          </div>

          {/* ==================================================
              SESSION METADATA
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
                {session.duration} minutes slot
              </span>

            </div>

          </div>

        </div>

        {/* ====================================================
            STATUS + ACTIONS
        ==================================================== */}

        <div className="mt-6 pt-4 border-t border-purple-50 flex flex-col gap-3 relative z-10">

          {/* STATUS */}

          <div>

            <span
              className={`
                px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border inline-flex items-center gap-1.5
                ${
                  sessionHasEnded &&
                  session.status === "SCHEDULED"
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
                  sessionHasEnded &&
                  session.status === "SCHEDULED"
                    ? "bg-amber-600"
                    : session.status === "SCHEDULED"
                    ? "bg-purple-600"
                    : session.status === "COMPLETED"
                    ? "bg-emerald-600"
                    : "bg-rose-600"
                }`}
              />

              {sessionHasEnded &&
              session.status === "SCHEDULED"
                ? "PAST"
                : session.status}

            </span>

          </div>

          {/* ==================================================
              SESSION IN PROGRESS
          ================================================== */}

          {session.status === "SCHEDULED" &&
            sessionHasStarted &&
            !sessionHasEnded &&
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
            activeTab === "UPCOMING" && (
              <button
                type="button"
                onClick={() =>
                  handleJoinCall(
                    session.id
                  )
                }
                disabled={
                  isActionInProgress ||
                  sessionHasEnded
                }
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
                    isJoining ||
                    sessionHasEnded
                      ? "bg-purple-400 cursor-not-allowed shadow-none"
                      : "bg-purple-600 hover:bg-purple-700 shadow-purple-600/20 hover:shadow-md"
                  }
                `}
              >

                {isJoining ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />

                    Checking session...
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

          {session.status === "SCHEDULED" &&
            sessionHasEnded &&
            activeTab === "PAST" && (
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
              CANCEL SESSION
          ================================================== */}

          {showCancel &&
            session.status === "SCHEDULED" &&
            !sessionHasEnded && (
              <button
                type="button"
                onClick={() =>
                  cancelSession(
                    session.id
                  )
                }
                disabled={
                  isActionInProgress
                }
                className="w-full h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-200 active:scale-[0.98] shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {isCancelling
                  ? "Cancelling session..."
                  : "Cancel Session Allocation"}

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
        return "You don't have any upcoming mentorship sessions.";

      case "PAST":
        return "You don't have any past mentorship sessions.";

      case "COMPLETED":
        return "You don't have any completed mentorship sessions.";

      case "CANCELLED":
        return "You don't have any cancelled sessions.";

      default:
        return "No sessions found.";
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
          ACTIVE SECTION TITLE
      ====================================================== */}

      <div className="mb-5 flex items-center justify-between">

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

            <Calendar
              size={20}
              className="text-purple-600"
            />

          </div>

          <p className="text-sm font-semibold text-slate-700 text-center">
            {getEmptyMessage()}
          </p>

          <p className="text-xs text-slate-500 mt-1 text-center">
            Your session history will appear here.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {activeSessions.map(
            (session) => (
              <SessionCard
                key={session.id}
                session={session}
                showCancel={
                  activeTab === "UPCOMING"
                }
              />
            )
          )}

        </div>

      )}

    </div>
  );
};

export default MySessions;