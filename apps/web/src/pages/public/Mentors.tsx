import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Search,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

import api from "../../api/axios";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

/* =========================================================
   TYPES
========================================================= */

interface MentorUser {
  id: string;
  name: string;
  avatar: string | null;
}

interface Mentor {
  id: string;

  user: MentorUser;

  bio: string | null;
  profileHeadline: string | null;
  profileImage: string | null;
  qualification: string | null;
  experienceYears: number | null;

  expertise: string[];
  skills: string[];
  languages: string[];

  examType: string | null;

  rating: number;
  totalStudents: number;
  totalSessions: number;
  totalReviews: number;

  availableForMentorship: boolean;
  isVerified: boolean;
}

/* =========================================================
   API RESPONSE
========================================================= */

interface MentorsResponse {
  success: boolean;
  mentors: Mentor[];
}

/* =========================================================
   EXAM FILTERS
========================================================= */

const examFilters = [
  {
    label: "All Mentors",
    value: "ALL",
  },
  {
    label: "JEE",
    value: "JEE",
  },
  {
    label: "WBJEE",
    value: "WBJEE",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getInitials = (name: string) => {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const formatExamType = (examType: string | null) => {
  if (!examType) {
    return "Mentor";
  }

  switch (examType) {
    case "JEE":
      return "JEE";

    case "JEE_MAINS":
      return "JEE Mains";

    case "JEE_ADVANCED":
      return "JEE Advanced";

    case "WBJEE":
      return "WBJEE";

    default:
      return examType
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
  }
};

const getMentorImage = (mentor: Mentor) => {
  return mentor.profileImage || mentor.user.avatar || null;
};

/* =========================================================
   SKELETON CARD
========================================================= */

function MentorCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xs">
      <div className="h-52 sm:h-56 md:h-60 animate-pulse bg-slate-200" />

      <div className="space-y-3.5 sm:space-y-4 p-5 sm:p-6">
        <div className="h-5 sm:h-6 w-2/3 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-3.5 sm:h-4 w-1/2 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-3.5 sm:h-4 w-full animate-pulse rounded-lg bg-slate-200" />

        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 sm:w-20 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-20 sm:w-24 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MENTOR CARD (NON-CLICKABLE DISPLAY CARD)
========================================================= */

interface MentorCardProps {
  mentor: Mentor;
}

function MentorCard({ mentor }: MentorCardProps) {
  const image = getMentorImage(mentor);
  const expertise = mentor.expertise?.filter(Boolean).slice(0, 3) || [];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md select-none">
      {/* IMAGE CONTAINER */}
      <div className="relative h-52 sm:h-56 md:h-60 w-full overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
        {image ? (
          <img
            src={image}
            alt={mentor.user.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
            <span className="text-4xl sm:text-5xl font-black text-white">
              {getInitials(mentor.user.name)}
            </span>
          </div>
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Verified Badge */}
        {mentor.isVerified && (
          <div className="absolute left-3.5 sm:left-4 top-3.5 sm:top-4 flex items-center gap-1.5 rounded-full border border-emerald-100 bg-white/95 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-emerald-600 shadow-md backdrop-blur-md">
            <CheckCircle2 size={13} className="stroke-[2.5]" />
            Verified
          </div>
        )}

        {/* Exam Badge */}
        {mentor.examType && (
          <div className="absolute bottom-3 sm:bottom-3.5 left-3.5 sm:left-4 rounded-full border border-slate-100 bg-white/95 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-slate-800 shadow-md backdrop-blur-md">
            {formatExamType(mentor.examType)}
          </div>
        )}

        {/* Availability Badge */}
        {mentor.availableForMentorship && (
          <div className="absolute bottom-3 sm:bottom-3.5 right-3.5 sm:right-4 flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-white shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Available
          </div>
        )}
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        {/* Name & Rating */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base sm:text-lg md:text-xl font-bold tracking-tight text-slate-900">
              {mentor.user.name}
            </h3>

            {mentor.profileHeadline && (
              <p className="mt-1 line-clamp-2 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                {mentor.profileHeadline}
              </p>
            )}
          </div>

          {mentor.rating > 0 && (
            <div className="flex shrink-0 items-center gap-1 rounded-xl bg-amber-50 border border-amber-100 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-bold text-amber-700">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {mentor.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Qualification */}
        {mentor.qualification && (
          <div className="mt-3.5 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <Award size={15} className="shrink-0 text-indigo-600" />
            <span className="line-clamp-1 font-medium">{mentor.qualification}</span>
          </div>
        )}

        {/* Experience */}
        {mentor.experienceYears !== null &&
          mentor.experienceYears !== undefined && (
            <div className="mt-1.5 sm:mt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
              <BookOpen size={15} className="shrink-0 text-indigo-600" />
              <span className="font-medium">
                {mentor.experienceYears}{" "}
                {mentor.experienceYears === 1 ? "year" : "years"} experience
              </span>
            </div>
          )}

        {/* Statistics Pills */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/80 p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-indigo-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {mentor.totalStudents}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-slate-500">Students</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/80 p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-indigo-600" />
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {mentor.totalSessions}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-slate-500">Sessions</p>
          </div>
        </div>

        {/* Expertise Tags */}
        {expertise.length > 0 && (
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
            {expertise.map((item) => (
              <span
                key={item}
                className="rounded-full border border-indigo-100 bg-indigo-50/70 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-indigo-700"
              >
                {item}
              </span>
            ))}

            {mentor.expertise.length > 3 && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-slate-500">
                +{mentor.expertise.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedExam, setSelectedExam] = useState("ALL");

  /* =======================================================
     FETCH MENTORS
  ======================================================= */

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        setError("");

        const params =
          selectedExam !== "ALL"
            ? {
                examType: selectedExam,
              }
            : undefined;

        const response = await api.get<MentorsResponse>("/mentors/public", {
          params,
        });

        setMentors(response.data?.mentors ?? []);
      } catch {
        setError("Unable to load mentors right now. Please try again.");
        setMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [selectedExam]);

  /* =======================================================
     SEARCH FILTER
  ======================================================= */

  const filteredMentors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return mentors;
    }

    return mentors.filter((mentor) => {
      const searchableText = [
        mentor.user.name,
        mentor.profileHeadline,
        mentor.bio,
        mentor.qualification,
        mentor.examType,
        ...mentor.expertise,
        ...mentor.skills,
        ...mentor.languages,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [mentors, search]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden flex flex-col">
      {/* Dynamic Keyframe Style for Glowing Rotating Light Blue Border */}
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

      {/* Global Navbar */}
      <AboutNavbar />

      {/* ===================================================
          HERO SECTION
      =================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-white border-b border-slate-100 py-12 sm:py-18 md:py-24">
        {/* Soft Ambient Glows */}
        <div className="pointer-events-none absolute -left-28 sm:-left-32 -top-28 sm:-top-32 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-indigo-400/15 blur-[90px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute -right-28 sm:-right-32 top-10 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-blue-400/15 blur-[90px] sm:blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
              Find the right mentor{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent block sm:inline">
                for your journey
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3.5 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 font-normal">
              Connect with experienced toppers and mentors who guide you through
              your syllabus, answer doubts, and formulate winning preparation
              strategies.
            </p>
          </div>

          {/* ===================================================
              ANIMATED LIGHT BLUE BORDER SEARCH BAR
          =================================================== */}
          <div className="mx-auto mt-8 sm:mt-12 max-w-2xl">
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
                <div className="pointer-events-none pl-4 sm:pl-5 pr-2 sm:pr-3 text-sky-500 transition-colors">
                  <Search size={20} className="stroke-[2.2]" />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by mentor name, engineering branch, or expertise..."
                  className="h-12 sm:h-14 w-full bg-transparent pr-20 sm:pr-24 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
                />

                {/* Right Actions: Clear Button / Keyboard Shortcut */}
                <div className="absolute right-3 sm:right-4 flex items-center gap-2">
                  {search ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  ) : (
                    <span className="hidden sm:inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-400 tracking-wider">
                      ⌘K
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Helper Suggestion Pills */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Popular:</span>
              {["Physics", "Chemistry", "Mathematics", "Exam Strategy"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearch(tag)}
                  className="rounded-full border border-slate-200/80 bg-white px-2.5 sm:px-3 py-0.5 text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/40 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          MENTORS LISTING SECTION
      =================================================== */}

      <section className="flex-1 bg-slate-50/60 py-10 sm:py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="mb-7 sm:mb-9 md:mb-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Explore Mentors
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                  Filter by your target competitive examination
                </p>
              </div>

              {/* Exam Tabs */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                {examFilters.map((filter) => {
                  const active = selectedExam === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => setSelectedExam(filter.value)}
                      className={`rounded-xl px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                        active
                          ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700 shadow-2xs"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && !loading && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-xs sm:text-sm font-medium text-red-600 shadow-xs">
              {error}
            </div>
          )}

          {/* Skeleton Loaders */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <MentorCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredMentors.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 sm:py-16 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Search size={22} />
              </div>

              <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900">
                No mentors found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm leading-relaxed text-slate-500">
                We couldn't find any mentors matching your search or selected
                exam filter.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}

                {selectedExam !== "ALL" && (
                  <button
                    type="button"
                    onClick={() => setSelectedExam("ALL")}
                    className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-600 cursor-pointer transition-colors"
                  >
                    View All Mentors
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mentors Grid */}
          {!loading && !error && filteredMentors.length > 0 && (
            <>
              <div className="mb-4">
                <p className="text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-left">
                  Showing{" "}
                  <span className="font-bold text-slate-900">
                    {filteredMentors.length}
                  </span>{" "}
                  {filteredMentors.length === 1 ? "mentor" : "mentors"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===================================================
          BOTTOM CTA
      =================================================== */}

      <section className="bg-white py-12 sm:py-16 md:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-5 py-10 sm:px-8 sm:py-14 text-center shadow-2xl">
            {/* Ambient Background Circles */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/10 text-indigo-300 ring-1 ring-white/15">
                <Users size={20} />
              </div>

              <h2 className="mt-4 sm:mt-5 text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                Ready to take the next step?
              </h2>

              <p className="mx-auto mt-2.5 sm:mt-3 max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-slate-300 font-normal">
                Get personalized guidance from mentors who understand your target
                exam and can help you build an achievable daily revision plan.
              </p>

              <div className="mt-6 sm:mt-7">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-50"
                >
                  Start Your Journey
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          ISOLATED DARK FOOTER
      =================================================== */}

      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
}