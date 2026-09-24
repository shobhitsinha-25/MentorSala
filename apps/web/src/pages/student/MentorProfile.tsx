import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Star,
  ArrowLeft,
  Users,
  GraduationCap,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../../lib/axios";

interface Mentor {
  id: string;
  bio: string;
  qualification: string;
  experienceYears: number;
  expertise: string[];
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

// ============================================================
// SAFE FRONTEND ERROR HANDLER
// ============================================================

const getUserFriendlyError = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          status?: number;
        };
      }
    ).response;

    const status = response?.status;

    switch (status) {
      case 400:
        return "The request could not be completed. Please check your selection and try again.";

      case 401:
        return "Your session has expired. Please log in again.";

      case 403:
        return "You are not allowed to perform this action.";

      case 404:
        return "The requested mentor or session information could not be found.";

      case 409:
        return "This slot is no longer available. Please select another available slot.";

      case 422:
        return "Some of the selected information is invalid. Please try again.";

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

  if (
    typeof error === "object" &&
    error !== null &&
    "request" in error
  ) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  return fallbackMessage;
};

// ============================================================
// COMPONENT
// ============================================================

const MentorProfile = () => {
  const navigate = useNavigate();
  const { mentorId } = useParams();

  const [mentor, setMentor] =
    useState<Mentor | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [slots, setSlots] =
    useState<string[]>([]);

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [slotsLoading, setSlotsLoading] =
    useState(false);

  // ======================================
  // FETCH MENTOR
  // ======================================

  const fetchMentor = async () => {
    try {
      const res =
        await api.get(`/mentors/${mentorId}`);

      setMentor(res.data.mentor);
    } catch (error: unknown) {
      console.error(
        "[MentorProfile] Failed to load mentor:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to load the mentor profile. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // FETCH SLOTS
  // ======================================

  const fetchSlots = async (date: string) => {
    try {
      setSlotsLoading(true);

      const res =
        await api.get(
          `/slots/${mentorId}?date=${date}`
        );

      setSlots(res.data.slots || []);
    } catch (error: unknown) {
      console.error(
        "[MentorProfile] Failed to fetch slots:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to load available slots. Please try again."
        )
      );
    } finally {
      setSlotsLoading(false);
    }
  };

  // ======================================
  // BOOK SESSION
  // ======================================

  const handleBookSession = async () => {
    try {
      await api.post(
        "/sessions/book",
        {
          mentorId,
          scheduledAt: selectedSlot,
        }
      );

      toast.success(
        "Session booked successfully"
      );

      setSelectedSlot("");

      fetchSlots(selectedDate);
    } catch (error: unknown) {
      console.error(
        "[MentorProfile] Failed to book session:",
        error
      );

      toast.error(
        getUserFriendlyError(
          error,
          "Unable to book this session. Please try again."
        )
      );
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [mentorId]);

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="h-9 w-9 rounded-full border-3 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // ======================================
  // NO MENTOR
  // ======================================

  if (!mentor) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4">

        <p className="text-center text-rose-500 font-bold text-base select-none">
          Mentor not found
        </p>

        <button
          onClick={() =>
            navigate("/student/book-session")
          }
          className="mt-4 px-4 py-2 text-xs font-semibold text-purple-600 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
        >
          Back
        </button>

      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8 bg-white text-slate-800 min-h-screen select-none w-full">

      {/* BACK NAVIGATION ACTION BUTTON */}

      <button
        onClick={() =>
          navigate("/student/book-session")
        }
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-purple-700 transition-colors px-1"
      >
        <ArrowLeft size={16} />

        <span>Back</span>
      </button>

      {/* HEADER PROFILE BANNER */}

      <div className="bg-white border border-purple-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">

        <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 lg:gap-8 items-center sm:items-start text-center sm:text-left">

          {/* AVATAR BOX BLOCK */}

          <div className="relative shrink-0">

            <img
              src={
                mentor.user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  mentor.user.name
                )}&background=9333ea&color=fff`
              }
              alt={mentor.user.name}
              className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl object-cover border-2 border-purple-100 shadow-sm"
            />

            <span
              className={`absolute -bottom-1.5 sm:-bottom-1 -right-1.5 sm:-right-1 h-4 w-4 rounded-full border-2 border-white shadow-xs ${
                mentor.availableForMentorship
                  ? "bg-emerald-500"
                  : "bg-slate-400"
              }`}
            />

          </div>

          {/* IDENTITY TEXT CORE BLOCK */}

          <div className="flex-1 min-w-0 w-full">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

              <div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">
                  {mentor.user.name}
                </h1>

                <p className="text-xs sm:text-sm font-semibold text-purple-700 mt-1">
                  {mentor.qualification}
                </p>

              </div>

              {mentor.availableForMentorship && (
                <span className="self-center sm:self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-bold">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                  Available Now

                </span>
              )}

            </div>

            {/* EXPERTISE KEY TAGS SCROLLER STRIP */}

            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 mt-4">

              {mentor.expertise.map(
                (item) => (
                  <span
                    key={item}
                    className="px-2.5 sm:px-3 py-1 rounded-lg sm:rounded-xl bg-purple-50/70 border border-purple-100 text-purple-800 text-[11px] sm:text-xs font-semibold shadow-2xs"
                  >
                    {item}
                  </span>
                )
              )}

            </div>

            {/* ANALYTICS HUD BLOCKS */}

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6">

              <div className="bg-purple-50/40 border border-purple-100/70 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center shadow-2xs">

                <Star
                  size={16}
                  className="mx-auto text-amber-500"
                  fill="currentColor"
                />

                <div className="text-slate-900 text-sm sm:text-base font-black mt-1.5 leading-none">
                  {mentor.rating}
                </div>

                <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Rating
                </div>

              </div>

              <div className="bg-purple-50/40 border border-purple-100/70 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center shadow-2xs">

                <Users
                  size={16}
                  className="mx-auto text-purple-600"
                />

                <div className="text-slate-900 text-sm sm:text-base font-black mt-1.5 leading-none">
                  {mentor.totalStudents}
                </div>

                <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Students
                </div>

              </div>

              <div className="bg-purple-50/40 border border-purple-100/70 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center shadow-2xs">

                <GraduationCap
                  size={18}
                  className="mx-auto text-indigo-600"
                />

                <div className="text-slate-900 text-sm sm:text-base font-black mt-1.5 leading-none">
                  {mentor.experienceYears}
                </div>

                <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Years Exp
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ABOUT DESCRIPTION MODULE */}

      <div className="bg-white border border-purple-100 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm">

        <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">

          <Sparkles
            size={16}
            className="text-purple-600"
          />

          About Mentor

        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-normal">
          {mentor.bio || "No bio available."}
        </p>

      </div>

      {/* SCHEDULING DISCOVERY LAYOUT WORKSPACE */}

      <div className="bg-white border border-purple-100 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm space-y-5 sm:space-y-6">

        <div>

          <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">

            <Calendar
              size={16}
              className="text-purple-600"
            />

            Book Session

          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Select a convenient date and an available slot.
          </p>

        </div>

        <div className="space-y-4">

          <div className="w-full sm:max-w-xs">

            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Select Date
            </label>

            <input
              type="date"
              value={selectedDate}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) => {
                const date =
                  e.target.value;

                setSelectedDate(date);
                setSelectedSlot("");

                fetchSlots(date);
              }}
              className="w-full h-11 sm:h-12 bg-purple-50/30 border border-purple-100 rounded-xl px-3.5 sm:px-4 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all cursor-pointer shadow-2xs"
            />

          </div>

          <div className="pt-2">

            <h3 className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">

              <Clock
                size={14}
                className="text-purple-600"
              />

              Available Slots

            </h3>

            {slotsLoading ? (

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 py-3">

                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />

                <span>
                  Loading slots...
                </span>

              </div>

            ) : !selectedDate ? (

              <div className="text-xs font-medium text-slate-500 bg-purple-50/30 border border-dashed border-purple-200 p-4 rounded-xl text-center">
                Please pick a date to see available timings.
              </div>

            ) : slots.length === 0 ? (

              <div className="text-xs font-medium text-slate-500 bg-purple-50/20 border border-dashed border-purple-200 p-4 rounded-xl text-center">
                No slots available on this date.
              </div>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">

                {slots.map((slot) => {

                  const isSelected =
                    selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() =>
                        setSelectedSlot(slot)
                      }
                      className={`h-11 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                        isSelected
                          ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-600/20"
                          : "bg-purple-50/30 border-purple-100 hover:border-purple-300 hover:bg-purple-50 text-slate-700"
                      }`}
                    >

                      {isSelected && (
                        <CheckCircle2
                          size={13}
                          className="text-white"
                        />
                      )}

                      <span>
                        {new Date(
                          slot
                        ).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </span>

                    </button>
                  );
                })}

              </div>

            )}

          </div>

        </div>

        {/* BOOK SUBMIT ACTION CTA */}

        <button
          disabled={!selectedSlot}
          onClick={handleBookSession}
          className="w-full h-11 sm:h-12 mt-2 rounded-xl bg-purple-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20 hover:bg-purple-700 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span>
            Book Session
          </span>
        </button>

      </div>

    </div>
  );
};

export default MentorProfile;