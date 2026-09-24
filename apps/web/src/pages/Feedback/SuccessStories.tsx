import { useState, useEffect, useMemo } from "react";
import {
  Star,
  Quote,
  Sparkles,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  GraduationCap,
} from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

interface Testimonial {
  name: string;
  journey: string;
  achievement: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Vartika",
    journey: "64 Percentile → 97 Percentile",
    achievement: "JEE Main",
    review:
      "When I joined MentorSala, I was stuck at 64 percentile despite studying at Allen. My mentor completely changed the way I approached JEE. Instead of studying harder, I started studying smarter. Weekly strategy sessions, doubt-solving, and personalized planning helped me improve consistently. I finally achieved 97 percentile, something I never imagined. MentorSala gave me the confidence that coaching alone couldn't.",
  },
  {
    name: "Aditya",
    journey: "Admitted to IIT Jammu",
    achievement: "IIT Jammu",
    review:
      "My dream of getting into IIT became possible because MentorSala kept me accountable throughout my preparation. Every week I knew exactly what to study and how to improve. The mentors were always available whenever I felt lost. Today, I'm proud to be joining IIT Jammu. Thank you, MentorSala!",
  },
  {
    name: "Aditya Rout",
    journey: "Admitted to IIT Kharagpur",
    achievement: "IIT Kharagpur",
    review:
      "MentorSala was the biggest difference-maker in my preparation. Whenever I struggled with consistency or exam pressure, my mentor guided me with a practical study plan. The personalized mentorship and motivation helped me secure admission to IIT Kharagpur. I would recommend MentorSala to every JEE aspirant.",
  },
  {
    name: "Pranay",
    journey: "IIM Rohtak (IPMAT)",
    achievement: "IIM Rohtak",
    review:
      "Preparing for IPMAT felt overwhelming until I joined MentorSala. My mentor helped me build a structured preparation strategy, improve my weak areas, and stay motivated. Their continuous support played a huge role in helping me secure admission to IIM Rohtak.",
  },
  {
    name: "Mohit",
    journey: "Admitted to Jadavpur University",
    achievement: "Jadavpur University",
    review:
      "MentorSala helped me remain disciplined throughout my preparation. The mentors didn't just teach concepts—they guided me on time management, revision, and mock-test analysis. Their support helped me secure admission to Jadavpur University. I'm truly grateful.",
  },
  {
    name: "Sashwat Vibu",
    journey: "63 Percentile → 96 Percentile",
    achievement: "JEE Main",
    review:
      "I had almost lost confidence after scoring only 63 percentile. MentorSala believed in me even when I doubted myself. My mentor created a customized roadmap and constantly tracked my progress. With consistent guidance, I improved to 96 percentile. This journey completely changed my life.",
  },
  {
    name: "Virendra Nail",
    journey: "Admitted to IIT Dharwad",
    achievement: "IIT Dharwad",
    review:
      "The best thing about MentorSala is that you always have someone guiding you. Whenever I felt stuck, my mentor helped me overcome my mistakes and improve steadily. Their support and planning played an important role in my journey to IIT Dharwad.",
  },
  {
    name: "Riya Sharma",
    journey: "Targeted Strategy & Discipline",
    achievement: "Board & JEE Prep",
    review:
      "MentorSala made me realize that preparation isn't only about studying long hours. It's about following the right strategy every day. My mentor kept me accountable, motivated, and focused on my goals. I became much more confident before the exam because I knew I had the right guidance.",
  },
  {
    name: "Aryan Gupta",
    journey: "Consistent Mock Score Growth",
    achievement: "Score Boost",
    review:
      "I joined MentorSala because I needed someone to guide me personally. The one-to-one mentorship, performance reviews, and regular motivation helped me stay consistent throughout the year. I improved my mock-test scores significantly and entered the exam with confidence.",
  },
  {
    name: "Sneha Das",
    journey: "Continuous Mentorship & Mentoring",
    achievement: "Mentee Success",
    review:
      "Whenever I lost motivation, my mentor was there to encourage me and help me get back on track. MentorSala's personalized guidance, planning, and continuous feedback made my preparation much more effective. It felt like having a senior who genuinely cared about my success.",
  },
  {
    name: "Radhika",
    journey: "Admitted to JGEC",
    achievement: "Jalpaiguri Govt. Engg. College",
    review:
      "MentorSala gave me the direction I was missing during my preparation. My mentor helped me create a realistic study plan, analyze my mock tests, and stay consistent even when my confidence dropped. The regular guidance and motivation made a huge difference in my performance. I'm grateful that with MentorSala's support, I secured admission to Jalpaiguri Government Engineering College. I highly recommend MentorSala to every student looking for personalized mentorship.",
  },
];

const categories = [
  { id: "all", label: "All Stories" },
  { id: "iit", label: "IITs & Premier Colleges" },
  { id: "percentile", label: "Percentile Jump" },
];

export default function SuccessStories() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filtered dataset
  const filteredStories = useMemo(() => {
    return testimonials.filter((student) => {
      if (activeFilter === "percentile") return student.journey.includes("Percentile");
      if (activeFilter === "iit") {
        return (
          student.achievement.includes("IIT") ||
          student.achievement.includes("IIM") ||
          student.achievement.includes("Jadavpur") ||
          student.achievement.includes("Jalpaiguri") ||
          student.achievement.includes("JGEC")
        );
      }
      return true;
    });
  }, [activeFilter]);

  // Keep index valid when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Slideshow auto-advance timer (6 seconds per card)
  useEffect(() => {
    if (!isPlaying || filteredStories.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, filteredStories.length, currentIndex]);

  const handleNext = () => {
    if (filteredStories.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length);
  };

  const handlePrev = () => {
    if (filteredStories.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length);
  };

  const activeStory = filteredStories[currentIndex] || filteredStories[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden flex flex-col">
      {/* Global Navbar */}
      <AboutNavbar />

      {/* ===================================================
          HERO SECTION
      =================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-[#0A0D17] text-white py-14 sm:py-20 lg:py-24">
        {/* Soft Background Glows */}
        <div className="pointer-events-none absolute -top-32 -left-20 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-indigo-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-violet-500/15 blur-[120px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Transformations &{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
            Every student's preparation journey is unique. See how structured mentorship, continuous accountability, and personalized strategies turned doubt into top percentiles.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto pt-6 border-t border-slate-800/80">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">1-on-1</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Dedicated Mentor</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">+33%</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Avg. Percentile Jump</div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">IIT / NIT</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">Premier Alumni Mentors</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          STAGE: POP-UP SPOTLIGHT DECK (VIDEO-LIKE POP EFFECT)
      =================================================== */}
      <section className="relative bg-[#0A0D17] text-white py-12 sm:py-16 md:py-20 overflow-hidden border-b border-zinc-800">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Controls for Spotlight */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="text-center sm:text-left">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 block">
                Featured Spotlight
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
                Hear What Changed Their Path
              </h2>
            </div>

            {/* Playback Controls & Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                <span className="font-bold text-white">{currentIndex + 1}</span>
                <span>/</span>
                <span>{filteredStories.length}</span>
              </div>

              

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous story"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next story"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* 3D Kinetic Pop-Up Spotlight Container */}
          <div
            className="relative min-h-[360px] sm:min-h-[380px] md:min-h-[360px] flex items-center justify-center"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Background Layer (Simulated Ghost Card - Layer 2) */}
            <div className="hidden sm:block absolute inset-x-8 -top-3 h-full rounded-3xl bg-zinc-900/40 border border-zinc-800/40 transform scale-90 opacity-40 blur-[2px] pointer-events-none transition-all duration-700" />

            {/* Middle Layer (Simulated Shadow Card - Layer 1) */}
            <div className="hidden sm:block absolute inset-x-4 -top-1.5 h-full rounded-3xl bg-zinc-900/60 border border-zinc-800/60 transform scale-95 opacity-60 pointer-events-none transition-all duration-700" />

            {/* Active Pop-Up Card (Foreground Hero Spotlight) */}
            {activeStory && (
              <div
                key={activeStory.name + currentIndex}
                className="relative z-10 w-full rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-slate-900 p-6 sm:p-8 md:p-10 shadow-2xl shadow-indigo-500/10 transition-all duration-500 transform scale-100 animate-in fade-in zoom-in-95 duration-500"
              >
                {/* Visual Progress Bar (Countdown timer for the auto-play) */}
                {isPlaying && (
                  <div className="absolute top-0 inset-x-0 h-1 overflow-hidden rounded-t-3xl bg-zinc-800">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-[progress_6s_linear_infinite]" />
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="h-13 w-13 sm:h-14 sm:w-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-600/30">
                      {activeStory.name.charAt(0)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {activeStory.name}
                        </h3>
                        <span className="h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                      </div>

                      {activeStory.journey ? (
                        <div className="inline-flex items-center gap-1.5 mt-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-0.5 text-xs font-semibold text-indigo-300">
                          <TrendingUp size={12} className="text-indigo-400" />
                          <span>{activeStory.journey}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-400 font-medium">Verified Mentee</span>
                      )}
                    </div>
                  </div>

                  {/* Rating Stars & Achievement Chip */}
                  <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-1.5">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {activeStory.achievement && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                        <Award size={13} />
                        {activeStory.achievement}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Body */}
                <div className="relative mt-6">
                  <Quote size={40} className="absolute -top-3 -left-2 text-indigo-500/10 pointer-events-none" />
                  <p className="relative z-10 text-sm sm:text-base md:text-lg leading-relaxed text-zinc-300 font-normal">
                    "{activeStory.review}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Click Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8">
            {filteredStories.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to story ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? "w-6 bg-indigo-500 shadow-sm shadow-indigo-500/50" : "w-2 bg-zinc-800 hover:bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          GALLERY OF ALL STORIES (LIGHT THEME)
      =================================================== */}
      <main className="flex-1 bg-slate-50/70 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Category Filters */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-block text-indigo-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100 mb-3">
              Explore All Reviews
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real Students. Real Milestones.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Browse through our authentic feedback from JEE, WBJEE, and board exam aspirants across India.
            </p>

            {/* Category Tabs */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                    activeFilter === cat.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-700 shadow-2xs"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredStories.map((student, idx) => {
              const isSpotlighted = activeStory && activeStory.name === student.name;

              return (
                <div
                  key={student.name + idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                    isSpotlighted
                      ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-indigo-100"
                      : "border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 shrink-0 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {student.name}
                          </h3>

                          {student.journey ? (
                            <span className="inline-flex items-center gap-1 mt-0.5 rounded-md bg-indigo-50/80 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                              <TrendingUp size={11} />
                              {student.journey}
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">Mentee</span>
                          )}
                        </div>
                      </div>

                      <Quote size={20} className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-4 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Review Snippet */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                      "{student.review}"
                    </p>
                  </div>

                  {/* Achievement Bottom Row */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <GraduationCap size={13} />
                      Target
                    </span>

                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100/60 text-[11px]">
                      {student.achievement || "Mentee"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ===================================================
          ISOLATED DARK FOOTER
      =================================================== */}
      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
}