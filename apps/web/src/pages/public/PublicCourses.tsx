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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

const courses = [
  {
    id: "jee",
    title: "JEE Preparation",
    subtitle: "JEE Main & JEE Advanced",
    description:
      "Complete preparation platform for JEE aspirants with structured learning, practice problems, tests and performance tracking.",
    gradient: "from-violet-600 via-indigo-600 to-blue-600",
    icon: GraduationCap,
    subjects: [
      {
        name: "Physics",
        icon: Atom,
      },
      {
        name: "Chemistry",
        icon: FlaskConical,
      },
      {
        name: "Mathematics",
        icon: Calculator,
      },
    ],
    features: [
      "Chapter-wise tests",
      "Subject-wise tests",
      "JEE Main mock tests",
      "JEE Advanced mock tests",
      "Practice problems",
      "Performance tracking",
    ],
    exams: ["JEE Main", "JEE Advanced"],
  },
  {
    id: "wbjee",
    title: "WBJEE Preparation",
    subtitle: "West Bengal Joint Entrance Examination",
    description:
      "Focused preparation for WBJEE with subject-wise practice, chapter tests and full-length mock examinations.",
    gradient: "from-blue-600 via-cyan-600 to-teal-500",
    icon: Target,
    subjects: [
      {
        name: "Physics",
        icon: Atom,
      },
      {
        name: "Chemistry",
        icon: FlaskConical,
      },
      {
        name: "Mathematics",
        icon: Calculator,
      },
    ],
    features: [
      "Chapter-wise tests",
      "Subject-wise tests",
      "Full mock tests",
      "Practice problems",
      "Performance tracking",
      "Leaderboard",
    ],
    exams: ["WBJEE"],
  },
];

export default function PublicCourses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-slate-900 flex flex-col justify-between overflow-x-hidden selection:bg-violet-500/20">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <AboutNavbar />

      <main className="flex-1 w-full">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative overflow-hidden bg-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 lg:pb-28">
          <div className="absolute -top-32 -left-32 h-64 sm:h-72 w-64 sm:w-72 rounded-full bg-violet-200/40 blur-3xl pointer-events-none" />
          <div className="absolute -right-32 top-20 h-72 sm:h-80 w-72 sm:w-80 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              

              <h1 className="mt-4 sm:mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-tight">
                Prepare for your exam with{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  MentorSala
                </span>
              </h1>

              <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:text-lg">
                Structured preparation, practice tests, mock exams and
                performance tracking — everything you need to prepare with confidence.
              </p>
            </div>

            {/* Quick stats */}
            <div className="mx-auto mt-10 sm:mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
              {[
                {
                  icon: GraduationCap,
                  value: "2",
                  label: "Exams",
                },
                {
                  icon: BookOpen,
                  value: "3",
                  label: "Subjects",
                },
                {
                  icon: Target,
                  value: "100+",
                  label: "Practice Tests",
                },
                {
                  icon: Trophy,
                  value: "24/7",
                  label: "Learn & Practice",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 text-center shadow-sm"
                  >
                    <Icon
                      size={20}
                      className="mx-auto text-violet-600"
                    />

                    <p className="mt-2 text-lg sm:text-xl font-black text-slate-900">
                      {item.value}
                    </p>

                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-medium text-slate-500">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            COURSES
        ===================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
          <div className="mb-8 sm:mb-10 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-violet-600">
              Choose your path
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl lg:text-4xl">
              Courses built for your preparation
            </h2>

            <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-6 text-slate-500">
              Start your preparation with a structured course designed
              around your target examination.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <article
                  key={course.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]"
                >
                  <div>
                    {/* Course header */}
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br ${course.gradient} p-6 sm:p-8 text-white`}
                    >
                      <div className="absolute -right-12 -top-12 h-36 sm:h-40 w-36 sm:w-40 rounded-full bg-white/10 pointer-events-none" />
                      <div className="absolute -bottom-16 -left-10 h-32 sm:h-36 w-32 sm:w-36 rounded-full bg-white/10 pointer-events-none" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                            <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                          </div>

                          <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                            Available Now
                          </div>
                        </div>

                        <h3 className="mt-5 sm:mt-7 text-2xl sm:text-3xl font-black">
                          {course.title}
                        </h3>

                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-white/80">
                          {course.subtitle}
                        </p>

                        <p className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm leading-6 text-white/75">
                          {course.description}
                        </p>

                        <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                          {course.exams.map((exam) => (
                            <span
                              key={exam}
                              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"
                            >
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Course content */}
                    <div className="p-6 sm:p-8">
                      {/* Subjects */}
                      <div>
                        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                          Subjects
                        </p>

                        <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                          {course.subjects.map((subject) => {
                            const SubjectIcon = subject.icon;

                            return (
                              <div
                                key={subject.name}
                                className="flex flex-col items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-100 bg-slate-50 px-2 sm:px-3 py-3 sm:py-4 text-center"
                              >
                                <SubjectIcon
                                  size={18}
                                  className="text-violet-600 sm:w-5 sm:h-5"
                                />

                                <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate w-full">
                                  {subject.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-6 sm:mt-7">
                        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                          What's included
                        </p>

                        <div className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                          {course.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 sm:gap-2.5"
                            >
                              <CheckCircle2
                                size={16}
                                className="shrink-0 text-emerald-500"
                              />

                              <span className="text-xs sm:text-sm font-medium text-slate-600">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95 active:scale-[0.99] cursor-pointer"
                    >
                      Start Preparing
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            WHY MENTORSALA
        ===================================================== */}
        <section className="border-y border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-violet-600">
                Why MentorSala?
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950">
                Everything you need to prepare better
              </h2>
            </div>

            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Target,
                  title: "Structured Preparation",
                  text: "Follow a clear preparation path instead of studying randomly.",
                },
                {
                  icon: BookOpen,
                  title: "Practice",
                  text: "Strengthen your concepts with focused practice and questions.",
                },
                {
                  icon: Clock3,
                  title: "Mock Tests",
                  text: "Experience exam-style tests and improve your time management.",
                },
                {
                  icon: Trophy,
                  title: "Track Progress",
                  text: "Understand your performance and keep improving.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
                  >
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 sm:mt-5 text-sm sm:text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] sm:rounded-[30px] bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-5 sm:px-8 md:px-12 py-10 sm:py-14 text-center text-white shadow-xl">
            <Users className="mx-auto" size={28} />

            <h2 className="mt-4 text-2xl font-black sm:text-3xl lg:text-4xl">
              Ready to start your preparation?
            </h2>

            <p className="mx-auto mt-2.5 sm:mt-3 max-w-xl text-xs sm:text-sm sm:leading-6 text-white/75">
              Join MentorSala and start preparing for your target
              examination with a structured learning experience.
            </p>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="mt-6 sm:mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-violet-700 shadow-lg transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer"
            >
              Create your account
              <ArrowRight size={16} />
            </button>
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