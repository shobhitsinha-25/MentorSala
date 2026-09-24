import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Target,
  TrendingUp,
  BookOpen,
  UserCheck,
  Users,
  Video,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

export default function Mentorship() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-slate-900 flex flex-col justify-between overflow-x-hidden selection:bg-violet-500/20">
      {/* =====================================================
          NAVBAR CONTAINER (ISOLATED TO PRESERVE ORIGINAL COLORS)
      ===================================================== */}
      <div className="relative z-50">
        <AboutNavbar />
      </div>

      <main className="flex-1 w-full">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative overflow-hidden bg-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 lg:pb-28 border-b border-slate-100">
          {/* Ambient background */}
          <div className="pointer-events-none absolute -left-32 -top-24 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-20 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
              {/* Left Column */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-violet-700 shadow-2xs">
                  <Users size={14} />
                  1:1 Mentorship
                </div>

                <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-950">
                  Your preparation.
                  <br />
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Your mentor.
                  </span>
                </h1>

                <p className="mx-auto lg:mx-0 mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-slate-500 font-normal">
                  Get personalized guidance from a mentor who understands
                  your goals, identifies your challenges, and helps you
                  build a preparation strategy that works for you.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95 active:scale-[0.99] cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer shadow-2xs"
                  >
                    See How It Works
                  </button>
                </div>

                {/* Trust points */}
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 sm:gap-x-6 gap-y-2.5 sm:gap-y-3">
                  {[
                    "Personalized guidance",
                    "Goal-focused preparation",
                    "Direct mentor support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-500"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-500 shrink-0"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual Card */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="relative mx-auto max-w-md">
                  {/* Main Card */}
                  <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] border border-slate-200 bg-white p-5 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-36 sm:h-40 w-36 sm:w-40 rounded-full bg-violet-100/70" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-sm">
                            <UserCheck size={22} className="sm:w-6 sm:h-6" />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              Your Mentor
                            </p>
                            <p className="text-[11px] sm:text-xs text-slate-400">
                              Personalized guidance
                            </p>
                          </div>
                        </div>

                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          AVAILABLE
                        </span>
                      </div>

                      {/* Mentor Profile Sample */}
                      <div className="mt-6 sm:mt-7 rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5">
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <div className="flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-blue-200 text-violet-700 shrink-0">
                            <Users size={24} className="sm:w-7 sm:h-7" />
                          </div>

                          <div>
                            <p className="font-bold text-sm sm:text-base text-slate-900">
                              Expert Mentor
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              Exam preparation & career guidance
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
                          <div className="rounded-xl bg-white p-3 border border-slate-100 shadow-2xs">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                              Focus
                            </p>
                            <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-800 truncate">
                              Your Goals
                            </p>
                          </div>

                          <div className="rounded-xl bg-white p-3 border border-slate-100 shadow-2xs">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                              Support
                            </p>
                            <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-800 truncate">
                              1:1 Dedicated
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Session Preview Block */}
                      <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-3.5 sm:p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm shrink-0">
                            <Video size={18} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                              Mentorship Session
                            </p>
                            <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                              Focused discussion on your preparation
                            </p>
                          </div>

                          <ArrowRight
                            size={16}
                            className="text-violet-500 shrink-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Metric Card */}
                  <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl sm:block">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Target size={18} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Goal
                        </p>
                        <p className="text-xs font-black text-slate-800">
                          Stay on track
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHAT IS 1:1 MENTORSHIP
        ===================================================== */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
                What is 1:1 Mentorship?
              </span>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-slate-950">
                Preparation doesn't have to be a solo journey.
              </h2>

              <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-500 font-normal">
                Every student has different strengths, weaknesses, goals and
                challenges. 1:1 mentorship at MentorSala is designed to provide
                personalized support instead of a one-size-fits-all preparation
                approach.
              </p>

              <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-slate-500 font-normal">
                Your mentor can help you understand where you currently stand, what
                you should focus on next, and how you can stay consistent
                throughout your preparation journey.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: "Clear Goals",
                  text: "Define what you want to achieve and turn it into a practical preparation direction.",
                },
                {
                  icon: Brain,
                  title: "Personal Guidance",
                  text: "Discuss your challenges and receive guidance based on your individual situation.",
                },
                {
                  icon: TrendingUp,
                  title: "Progress Focus",
                  text: "Understand your progress and identify areas that need more attention.",
                },
                {
                  icon: MessageCircle,
                  title: "Direct Support",
                  text: "Have meaningful conversations about your preparation, doubts and strategy.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs transition-all hover:border-violet-200 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHAT YOU GET
        ===================================================== */}
        <section className="border-y border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
                What You Get
              </span>

              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950">
                More than just a conversation
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Mentorship is about understanding your preparation and helping
                you move forward with greater clarity.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Personalized Strategy",
                  text: "Build a preparation approach around your target exam, current level and goals.",
                },
                {
                  icon: BookOpen,
                  title: "Study Direction",
                  text: "Get clarity on what to prioritize and where to spend your preparation time.",
                },
                {
                  icon: MessageCircle,
                  title: "Doubt Discussions",
                  text: "Discuss questions, preparation difficulties and challenges with your mentor.",
                },
                {
                  icon: Clock3,
                  title: "Time Management",
                  text: "Work on creating a realistic and sustainable study routine.",
                },
                {
                  icon: TrendingUp,
                  title: "Progress Review",
                  text: "Review your preparation progress and identify opportunities for improvement.",
                },
                {
                  icon: ShieldCheck,
                  title: "Accountability",
                  text: "Stay committed to your goals with regular guidance and meaningful check-ins.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-violet-200 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-2xs border border-slate-200/80 transition group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600">
                      <Icon size={19} />
                    </div>

                    <h3 className="mt-4 text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full"
        >
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
              How It Works
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950">
              A simple path to personalized guidance
            </h2>
          </div>

          <div className="relative mt-10 sm:mt-14">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-slate-200 lg:block" />

            <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  icon: Users,
                  title: "Choose Mentorship",
                  text: "Start your journey by choosing the 1:1 mentorship experience.",
                },
                {
                  number: "02",
                  icon: UserCheck,
                  title: "Connect With a Mentor",
                  text: "Get connected with a mentor suited to your preparation needs.",
                },
                {
                  number: "03",
                  icon: Video,
                  title: "Have Your Session",
                  text: "Use your session to discuss goals, challenges and preparation.",
                },
                {
                  number: "04",
                  icon: TrendingUp,
                  title: "Keep Improving",
                  text: "Apply the guidance and continue working toward your goals.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.number}
                    className="relative text-center flex flex-col items-center"
                  >
                    <div className="relative mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-4 sm:border-8 border-[#F8F7FC] bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg">
                      <Icon size={22} className="sm:w-6 sm:h-6" />
                    </div>

                    <span className="mt-4 block text-[10px] font-black tracking-[0.2em] text-violet-600">
                      STEP {item.number}
                    </span>

                    <h3 className="mt-1.5 text-sm sm:text-base font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHO IS IT FOR
        ===================================================== */}
        <section className="bg-white border-t border-slate-200/80 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
                  Is Mentorship For You?
                </span>

                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 leading-tight">
                  You don't need to have everything figured out.
                </h2>

                <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-slate-500 font-normal">
                  Mentorship can be useful when you know what you want to achieve
                  but need help turning that goal into a practical and
                  consistent preparation plan.
                </p>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  "You are preparing for JEE or WBJEE.",
                  "You are unsure what to study next.",
                  "You want a more structured preparation approach.",
                  "You need help identifying your weak areas.",
                  "You struggle with consistency or time management.",
                  "You want someone to discuss your preparation with.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 sm:px-4 py-2.5 sm:py-3 transition-colors hover:bg-slate-50"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-emerald-500"
                    />

                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] sm:rounded-[30px] bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-5 sm:px-8 md:px-12 py-10 sm:py-14 text-center text-white shadow-xl shadow-violet-500/10 relative">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-white/10 blur-xl" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mx-auto flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md mb-3">
                <Sparkles size={22} className="sm:w-6 sm:h-6" />
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black">
                Don't prepare alone.
              </h2>

              <p className="mx-auto mt-2.5 max-w-lg text-xs sm:text-sm sm:leading-6 text-white/80">
                Get personalized guidance and take the next step in your
                preparation journey with MentorSala.
              </p>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-violet-700 shadow-lg transition hover:bg-slate-50 active:scale-[0.98] cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </button>
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