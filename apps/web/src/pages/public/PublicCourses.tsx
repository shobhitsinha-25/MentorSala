import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FlaskConical,
  GraduationCap,
  Target,
  Trophy,
  Users,
  Atom,
  Calculator,
  Sparkles,
  BarChart3,
  Layers,
  ShieldCheck,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

const COURSES = [
  {
    id: "jee",
    tag: "Most Popular",
    tagColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    title: "JEE Preparation",
    subtitle: "JEE Main & JEE Advanced 2025 - 2026",
    description:
      "A complete, outcome-driven preparation platform for engineering aspirants with syllabus-mapped practice, multi-tier mock tests, and AI-powered performance diagnostics.",
    gradient: "from-violet-700 via-indigo-600 to-blue-600",
    accentLight: "bg-violet-50 text-violet-700 border-violet-100",
    badgeGradient: "from-violet-500 to-indigo-600",
    icon: GraduationCap,
    stats: { tests: "120+", questions: "15,000+", mocks: "35+" },
    subjects: [
      {
        name: "Physics",
        icon: Atom,
        color: "text-indigo-600 bg-indigo-50/80 border-indigo-100",
      },
      {
        name: "Chemistry",
        icon: FlaskConical,
        color: "text-emerald-600 bg-emerald-50/80 border-emerald-100",
      },
      {
        name: "Mathematics",
        icon: Calculator,
        color: "text-amber-600 bg-amber-50/80 border-amber-100",
      },
    ],
    features: [
      "Rigorous Chapter-wise & Topic tests",
      "Subject-level deep dive diagnostics",
      "JEE Main computer-based simulated tests",
      "JEE Advanced multi-correct & matrix mocks",
      "Explanatory step-by-step solutions",
      "All-India Percentile & Rank Predictor",
    ],
    exams: ["JEE Main", "JEE Advanced"],
  },
  {
    id: "wbjee",
    tag: "State Engineering",
    tagColor: "bg-teal-400/20 text-teal-200 border-teal-400/30",
    title: "WBJEE Preparation",
    subtitle: "West Bengal Joint Entrance Examination",
    description:
      "Tailor-made curriculum aligned with WBJEE's unique category marking scheme, high-yield topics, timed speed drills, and official previous-year trends.",
    gradient: "from-blue-700 via-teal-600 to-emerald-600",
    accentLight: "bg-teal-50 text-teal-700 border-teal-100",
    badgeGradient: "from-cyan-500 to-teal-600",
    icon: Target,
    stats: { tests: "90+", questions: "10,000+", mocks: "25+" },
    subjects: [
      {
        name: "Physics",
        icon: Atom,
        color: "text-indigo-600 bg-indigo-50/80 border-indigo-100",
      },
      {
        name: "Chemistry",
        icon: FlaskConical,
        color: "text-emerald-600 bg-emerald-50/80 border-emerald-100",
      },
      {
        name: "Mathematics",
        icon: Calculator,
        color: "text-amber-600 bg-amber-50/80 border-amber-100",
      },
    ],
    features: [
      "Category I, II & III pattern practice",
      "High-speed Mathematics problem banks",
      "Full-length WBJEE standard mock exams",
      "Instant accuracy and time-per-question analysis",
      "Comprehensive revision summaries",
      "State-wide competitive leaderboard",
    ],
    exams: ["WBJEE"],
  },
];

const METRICS = [
  {
    icon: GraduationCap,
    value: "2+",
    label: "Target Exam Programs",
    sub: "JEE & State entrances",
  },
  {
    icon: BookOpen,
    value: "3",
    label: "Core STEM Subjects",
    sub: "Physics, Chem & Math",
  },
  {
    icon: Target,
    value: "200+",
    label: "Curated Practice Tests",
    sub: "Chapter & full mocks",
  },
  {
    icon: Trophy,
    value: "99.2%",
    label: "Aspirant Satisfaction",
    sub: "Real exam readiness",
  },
];

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: "Structured Preparation",
    text: "Follow a step-by-step syllabus pathway with zero guesswork or overwhelming backlogs.",
  },
  {
    icon: Zap,
    title: "High-Yield Practice",
    text: "Target exam-grade questions with granular categorisation by difficulty and historical weightage.",
  },
  {
    icon: Clock3,
    title: "Real Exam Simulations",
    text: "Acclimatize to real CBT testing conditions, negative marking pressures, and clock pacing.",
  },
  {
    icon: BarChart3,
    title: "Precision Analytics",
    text: "Identify accuracy leakages, weak chapters, and time sinks with actionable performance data.",
  },
];

export default function PublicCourses() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredCourses =
    selectedFilter === "all"
      ? COURSES
      : COURSES.filter((c) => c.id === selectedFilter);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-sans selection:bg-violet-500 selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}
      <AboutNavbar />

      <main className="flex-1 w-full">
        {/* =====================================================
            HERO SECTION
        ===================================================== */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 lg:pb-28">
          {/* Subtle Grid Background Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(#CBD5E1 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Ambient Glows */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-200/50 via-indigo-200/40 to-blue-200/40 blur-[110px] pointer-events-none rounded-full" />
          <div className="absolute top-48 -right-24 w-80 h-80 bg-blue-200/30 blur-[90px] pointer-events-none rounded-full" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/90 px-3.5 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-violet-600 animate-pulse" />
                <span>Engineered for Top Percentiles</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-[1.12]">
                Prepare for your dream rank with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  MentorSala
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-7 lg:text-lg font-normal">
                Structured masterclasses, exhaustive problem banks, live CBT
                mock simulations, and granular analytical insights — everything
                calibrated for your exam day confidence.
              </p>

              {/* Quick Filter Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  { label: "All Courses", value: "all" },
                  { label: "JEE Main & Advanced", value: "jee" },
                  { label: "WBJEE", value: "wbjee" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setSelectedFilter(tab.value)}
                    className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      selectedFilter === tab.value
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-100"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mx-auto mt-14 sm:mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {METRICS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white/90 p-4 sm:p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                      <Icon size={19} />
                    </div>
                    <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-slate-800">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {item.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            COURSES SECTION
        ===================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
          <div className="mb-10 sm:mb-12 text-center md:text-left md:flex md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                Target Examination Tracks
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Courses Built For Result-Driven Prep
              </h2>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-500 leading-relaxed">
                Step into a disciplined system with comprehensive coverage,
                mock test schedules, and tailored revision modules.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {filteredCourses.map((course) => {
              const CourseIcon = course.icon;

              return (
                <article
                  key={course.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] sm:rounded-[32px] border border-slate-200/90 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                >
                  <div>
                    {/* Course Header Banner */}
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br ${course.gradient} p-6 sm:p-8 text-white`}
                    >
                      {/* Geometric Decorative Mesh */}
                      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-black/10 blur-lg pointer-events-none" />

                      <div className="relative z-10">
                        {/* Top bar in card */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-inner">
                            <CourseIcon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                          </div>

                          <div
                            className={`rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide backdrop-blur-md ${course.tagColor}`}
                          >
                            {course.tag}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="mt-5 text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-white/85">
                          {course.subtitle}
                        </p>

                        <p className="mt-3.5 max-w-xl text-xs sm:text-sm leading-relaxed text-white/80 line-clamp-3">
                          {course.description}
                        </p>

                        {/* Target exams pills */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-semibold text-white/70 mr-1">
                            Targeting:
                          </span>
                          {course.exams.map((exam) => (
                            <span
                              key={exam}
                              className="rounded-lg bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-xs font-bold text-white border border-white/15"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Syllabus & Features */}
                    <div className="p-6 sm:p-8">
                      {/* Subjects Matrix */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Included Subjects
                          </p>
                          <span className="text-[11px] font-medium text-slate-400">
                            Full Syllabus
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                          {course.subjects.map((subject) => {
                            const SubIcon = subject.icon;
                            return (
                              <div
                                key={subject.name}
                                className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all duration-150 hover:scale-[1.02] ${subject.color}`}
                              >
                                <SubIcon size={20} />
                                <span className="text-xs font-bold tracking-tight">
                                  {subject.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Course Features Checklist */}
                      <div className="mt-6 sm:mt-7 pt-6 border-t border-slate-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Preparation Highlights
                        </p>

                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {course.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-2.5"
                            >
                              <CheckCircle2
                                size={16}
                                className="mt-0.5 shrink-0 text-emerald-500"
                              />
                              <span className="text-xs font-medium text-slate-600 leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Action Footer */}
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:shadow-xl hover:shadow-violet-600/30 hover:brightness-105 active:scale-[0.99] cursor-pointer"
                    >
                      <span>Start Preparing Now</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            WHY MENTORSALA - BENTO GRID
        ===================================================== */}
        <section className="border-y border-slate-200/80 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600">
                <ShieldCheck size={16} />
                <span>The MentorSala Methodology</span>
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Everything You Need to Prepare Better
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Replace random YouTube playlists and unorganized PDFs with an
                accountable, data-backed prep blueprint.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100/80 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA CONVERSION BANNER
        ===================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-violet-700 via-indigo-600 to-blue-700 px-6 sm:px-12 py-12 sm:py-16 text-center text-white shadow-2xl shadow-indigo-500/20">
            {/* Ambient Background Circles */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-violet-400/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 mb-4">
                <Users size={24} className="text-white" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Ready to Boost Your Exam Readiness?
              </h2>

              <p className="mt-3 text-xs sm:text-base leading-relaxed text-white/80">
                Join ambitious aspirants leveraging MentorSala’s structured
                tests, question banks, and live mock analytics.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-violet-700 shadow-xl transition-all duration-200 hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Create Free Account
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-white/20 active:scale-[0.98] cursor-pointer"
                >
                  Sign In
                  <ChevronRight size={16} />
                </button>
              </div>

              <p className="mt-4 text-[11px] text-white/60">
                No credit card required • Instant access to diagnostic tests
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER (ISOLATED DARK CONTAINER)
      ===================================================== */}
      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
}