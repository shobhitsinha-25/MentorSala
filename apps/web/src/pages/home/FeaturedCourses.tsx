import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export default function FeaturedCoursesSection() {
  return (
    <section
      id="courses"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F8F9FE]"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-5 sm:right-10 h-[280px] sm:h-[350px] w-[280px] sm:w-[350px] rounded-full bg-purple-300/25 blur-[100px] sm:blur-[130px]" />
        <div className="absolute bottom-10 left-5 sm:left-10 h-[280px] sm:h-[350px] w-[280px] sm:w-[350px] rounded-full bg-indigo-300/25 blur-[100px] sm:blur-[130px]" />
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="relative inline-flex items-center justify-center rounded-full mb-4 sm:mb-5">
              {/* Ring Animation Layer */}
              <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-purple-400/50 bg-purple-200/40 blur-xs" />

              {/* Glass Badge Layer */}
              <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-purple-700 shadow-sm">
                FEATURED COURSES
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Prepare Smarter.
              <br />
              <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Perform Better.
              </span>
            </h2>

            <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-slate-500 font-normal">
              Structured preparation for JEE and WBJEE aspirants with practice problems, mock examinations, and performance tracking.
            </p>
          </div>
        </div>

        {/* 2 Courses Cards (No Inner Card CTAs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto items-stretch">
          {/* ================= JEE COURSE ================= */}
          <div className="rounded-3xl border border-purple-200/70 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-lg shadow-purple-500/5 flex flex-col justify-between transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10">
            <div>
              {/* Top Strip */}
              <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-xl sm:text-2xl text-white shadow-md shadow-indigo-600/20">
                  ⚡
                </div>

                <div className="rounded-full border border-indigo-200 bg-indigo-50/90 px-3 py-1 text-[10px] sm:text-xs font-bold text-indigo-700 tracking-wide">
                  JEE Main & Advanced
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-2.5 tracking-tight">
                JEE Preparation
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 mb-5 font-normal">
                Master Physics, Chemistry, and Mathematics with targeted question banks, chapter tests, and national mock examinations.
              </p>

              {/* Features List */}
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  "Chapter-wise Conceptual Tests",
                  "Subject-wise Full Practice",
                  "JEE Main & Advanced Mock Tests",
                  "Performance & Accuracy Diagnostics",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium"
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/80">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= WBJEE COURSE ================= */}
          <div className="rounded-3xl border border-purple-200/70 bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-lg shadow-purple-500/5 flex flex-col justify-between transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10">
            <div>
              {/* Top Strip */}
              <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-xl sm:text-2xl text-white shadow-md shadow-purple-600/20">
                  📘
                </div>

                <div className="rounded-full border border-purple-200 bg-purple-50/90 px-3 py-1 text-[10px] sm:text-xs font-bold text-purple-700 tracking-wide">
                  WBJEE Complete Track
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 sm:mb-2.5 tracking-tight">
                WBJEE Preparation
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 mb-5 font-normal">
                Dedicated examination module tailored for WBJEE patterns, speed drills, negative marking strategies, and PYQ sets.
              </p>

              {/* Features List */}
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  "WBJEE Focused Syllabus Mapping",
                  "Timed Speed & Accuracy Tests",
                  "Full-Length Mock Examinations",
                  "Chapter-wise Question Analytics",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium"
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600 border border-purple-200/80">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CTA: REDIRECT TO TEST SERIES ================= */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition-all duration-300 hover:opacity-95 hover:shadow-xl hover:shadow-purple-600/30 active:scale-[0.98]"
          >
            <span>Explore Test Series</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}