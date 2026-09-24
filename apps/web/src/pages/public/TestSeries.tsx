import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  FileQuestion,
  FlaskConical,
  GraduationCap,
  Medal,
  PlayCircle,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AboutNavbar from "../About/AboutNavbar";
import Footer from "../home/Footer";

const testTypes = [
  {
    icon: BookOpen,
    title: "Chapter-wise Tests",
    description:
      "Focus on one chapter at a time and strengthen your concepts with targeted practice.",
    features: [
      "Chapter-specific questions",
      "Instant results",
      "Detailed solutions",
      "Track chapter performance",
    ],
  },
  {
    icon: FlaskConical,
    title: "Subject-wise Tests",
    description:
      "Test your preparation across an entire subject with carefully structured questions.",
    features: [
      "Full subject coverage",
      "Timed examination",
      "Performance analysis",
      "Identify weak topics",
    ],
  },
  {
    icon: FileQuestion,
    title: "Full Mock Tests",
    description:
      "Experience a complete exam environment and prepare yourself for the real examination.",
    features: [
      "Complete exam pattern",
      "Realistic time limits",
      "Negative marking",
      "Detailed performance report",
    ],
  },
  {
    icon: Brain,
    title: "PYQ Tests",
    description:
      "Practice previous year questions and understand the type and difficulty of questions asked.",
    features: [
      "Previous year questions",
      "Exam-oriented practice",
      "Topic-wise analysis",
      "Detailed explanations",
    ],
  },
  {
    icon: Target,
    title: "Practice Tests",
    description:
      "Practice regularly and build confidence before attempting full-length examinations.",
    features: [
      "Quick practice sessions",
      "Mixed questions",
      "Instant feedback",
      "Improve accuracy",
    ],
  },
];

const exams = [
  {
    title: "JEE Main",
    description:
      "Prepare for JEE Main with chapter tests, subject tests, PYQs and full-length mock tests.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "from-blue-500/20 to-cyan-500/10",
    icon: GraduationCap,
  },
  {
    title: "JEE Advanced",
    description:
      "Challenge yourself with advanced-level questions and mock tests designed around the exam pattern.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "from-violet-500/20 to-purple-500/10",
    icon: Brain,
  },
  {
    title: "WBJEE",
    description:
      "Practice WBJEE-focused questions with chapter-wise, subject-wise and full mock tests.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "from-emerald-500/20 to-green-500/10",
    icon: Target,
  },
  {
    title: "CBSE Boards",
    description:
      "Prepare for board examinations with sample papers and subject-focused practice.",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    color: "from-orange-500/20 to-amber-500/10",
    icon: BookOpen,
  },
];

const benefits = [
  {
    icon: Clock3,
    title: "Real Exam Environment",
    description:
      "Practice with timers and structured tests to get comfortable with exam pressure.",
  },
  {
    icon: BarChart3,
    title: "Performance Analysis",
    description:
      "Understand your scores, accuracy and performance across different tests.",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description:
      "Compare your performance with other students and stay motivated.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get your result as soon as you complete a test and understand your performance.",
  },
  {
    icon: FileQuestion,
    title: "Detailed Solutions",
    description:
      "Review solutions after the test and understand the approach behind each question.",
  },
  {
    icon: Medal,
    title: "Track Your Progress",
    description:
      "Monitor your preparation over time and identify areas that need more attention.",
  },
];

const testFlow = [
  {
    number: "01",
    title: "Choose Your Exam",
    description:
      "Select the examination you are preparing for.",
  },
  {
    number: "02",
    title: "Select Test Type",
    description:
      "Choose from chapter, subject, mock, PYQ or practice tests.",
  },
  {
    number: "03",
    title: "Attempt the Test",
    description:
      "Solve questions within the given time and exam environment.",
  },
  {
    number: "04",
    title: "Review Your Result",
    description:
      "Check your score, accuracy, solutions and overall performance.",
  },
];

export default function TestSeries() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505]  overflow-x-hidden flex flex-col justify-between selection:bg-blue-500/20">
      {/* ========================= NAVBAR ========================= */}
      <AboutNavbar/>

      <main className="flex-1 w-full">
        {/* ========================= HERO ========================= */}
        <section className="relative pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/10 blur-[100px] sm:blur-[120px] rounded-full" />
            <div className="absolute top-80 left-5 sm:left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-violet-600/10 blur-[90px] sm:blur-[100px] rounded-full" />
            <div className="absolute top-80 right-5 sm:right-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-600/10 blur-[90px] sm:blur-[100px] rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-800 bg-zinc-900/70 text-xs sm:text-sm text-zinc-300 mb-5 sm:mb-7 shadow-sm">
              <Zap size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
              Exam-focused Test Series
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              Practice Smart.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Perform Better.
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-4 sm:mt-7 text-xs sm:text-base lg:text-lg text-zinc-400 leading-relaxed sm:leading-8">
              Prepare for JEE Main, JEE Advanced, WBJEE and CBSE Boards with
              structured tests designed to help you practice concepts, improve
              accuracy and understand your exam readiness.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-9">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all cursor-pointer active:scale-[0.98]"
              >
                Start Practicing
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform sm:w-4 sm:h-4"
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("test-types")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-200 font-semibold text-xs sm:text-sm hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <PlayCircle size={16} className="sm:w-4 sm:h-4" />
                Explore Tests
              </button>
            </div>

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto mt-12 sm:mt-16 border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40">
              <div className="p-4 sm:p-6 border-b md:border-b-0 md:border-r border-zinc-800">
                <p className="text-xl sm:text-3xl font-bold">5+</p>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">Test Types</p>
              </div>

              <div className="p-4 sm:p-6 border-b md:border-b-0 md:border-r border-zinc-800">
                <p className="text-xl sm:text-3xl font-bold">4</p>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">Exam Categories</p>
              </div>

              <div className="p-4 sm:p-6 border-r border-zinc-800">
                <p className="text-xl sm:text-3xl font-bold">3</p>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">Core Subjects</p>
              </div>

              <div className="p-4 sm:p-6">
                <p className="text-xl sm:text-3xl font-bold">24×7</p>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">Practice</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= TEST TYPES ========================= */}
        <section id="test-types" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-10 sm:mb-14 text-center sm:text-left">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-400 font-semibold mb-2 sm:mb-3">
                Test Types
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Every stage of your preparation
              </h2>

              <p className="text-zinc-400 mt-2.5 sm:mt-4 text-xs sm:text-sm leading-relaxed sm:leading-7">
                From individual chapter practice to complete mock examinations,
                choose the test format that matches your current preparation.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testTypes.map((test) => {
                const Icon = test.icon;

                return (
                  <div
                    key={test.title}
                    className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 sm:mb-5">
                        <Icon size={20} className="text-blue-400 sm:w-5 sm:h-5" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold">
                        {test.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed sm:leading-6 mt-2 sm:mt-3">
                        {test.description}
                      </p>

                      <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                        {test.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-emerald-400 mt-0.5 shrink-0"
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================= EXAMS ========================= */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-violet-400 font-semibold mb-2 sm:mb-3">
                Exams
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Prepare for the exams that matter
              </h2>

              <p className="text-zinc-400 mt-2.5 sm:mt-4 text-xs sm:text-sm leading-relaxed sm:leading-7">
                Select your target examination and practice with tests aligned
                with your preparation goals.
              </p>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {exams.map((exam) => {
                const Icon = exam.icon;

                return (
                  <div
                    key={exam.title}
                    className={`relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${exam.color} p-5 sm:p-7 flex flex-col justify-between`}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 w-36 sm:w-40 h-36 sm:h-40 rounded-full bg-white/[0.03] blur-2xl" />

                    <div className="relative">
                      <div className="flex items-center justify-between gap-4">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-center">
                          <Icon size={21} className="sm:w-6 sm:h-6" />
                        </div>

                        <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-zinc-950/50 border border-zinc-800 text-zinc-300">
                          Test Series
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mt-5 sm:mt-7">
                        {exam.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed sm:leading-6 mt-2 sm:mt-3 max-w-xl">
                        {exam.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-5 sm:mt-6">
                        {exam.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-950/50 border border-zinc-800 text-[11px] sm:text-xs text-zinc-300"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="mt-6 sm:mt-7 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        Start Preparing
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================= SUBJECTS ========================= */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2 sm:mb-3">
                  Subject Coverage
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Build preparation subject by subject
                </h2>

                <p className="text-zinc-400 mt-3 sm:mt-5 text-xs sm:text-sm leading-relaxed sm:leading-7">
                  Strengthen individual subjects before moving towards complete
                  mock examinations. Use chapter and subject tests to identify
                  exactly where you need more practice.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-7 sm:mt-9">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-sm sm:text-base">P</span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base mt-3 sm:mt-4">Physics</h3>
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
                      Concepts & numericals
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-sm sm:text-base">C</span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base mt-3 sm:mt-4">Chemistry</h3>
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
                      Concepts & application
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <span className="text-violet-400 font-bold text-sm sm:text-base">M</span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base mt-3 sm:mt-4">Mathematics</h3>
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
                      Problem solving
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-0 bg-blue-500/10 blur-[80px] sm:blur-[100px]" />

                <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                        Preparation Flow
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold mt-1 sm:mt-2">
                        From Chapter to Mock
                      </h3>
                    </div>

                    <BarChart3 className="text-blue-400" size={20} />
                  </div>

                  <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-xs sm:text-sm font-bold text-blue-400">
                        01
                      </span>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">Chapter Tests</p>
                        <p className="text-[11px] sm:text-xs text-zinc-500">
                          Build conceptual strength
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-xs sm:text-sm font-bold text-violet-400">
                        02
                      </span>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">Subject Tests</p>
                        <p className="text-[11px] sm:text-xs text-zinc-500">
                          Test complete subject coverage
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-xs sm:text-sm font-bold text-cyan-400">
                        03
                      </span>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">PYQ Practice</p>
                        <p className="text-[11px] sm:text-xs text-zinc-500">
                          Understand previous exam questions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-xs sm:text-sm font-bold text-emerald-400">
                        04
                      </span>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">Full Mock Tests</p>
                        <p className="text-[11px] sm:text-xs text-zinc-500">
                          Simulate the real examination
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= BENEFITS ========================= */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2 sm:mb-3">
                Built For Preparation
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                More than just a test
              </h2>

              <p className="text-zinc-400 mt-2.5 sm:mt-4 text-xs sm:text-sm leading-relaxed sm:leading-7">
                Every test should help you understand your preparation better.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:p-6 hover:bg-zinc-900 transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <Icon size={19} className="text-emerald-400 sm:w-5 sm:h-5" />
                    </div>

                    <h3 className="font-semibold text-base sm:text-lg mt-4 sm:mt-5">
                      {benefit.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed sm:leading-6 mt-1.5 sm:mt-2">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================= HOW IT WORKS ========================= */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-400 font-semibold mb-2 sm:mb-3">
                  How It Works
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  A simple preparation cycle
                </h2>

                <p className="text-zinc-400 mt-3 sm:mt-5 text-xs sm:text-sm leading-relaxed sm:leading-7">
                  Pick your exam, attempt the right test, analyze the result and
                  use the insights to improve your next attempt.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Create Free Account
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                {testFlow.map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-4 sm:gap-5 p-4 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50"
                  >
                    <div className="text-xs sm:text-sm font-bold text-blue-400 pt-0.5 sm:pt-1">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed sm:leading-6 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================= STUDENT EXPERIENCE ========================= */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 blur-[80px] sm:blur-[100px] rounded-full" />

              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-400 font-medium">
                    <Users size={16} />
                    Built for students
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4 tracking-tight">
                    Know where you stand before the real exam.
                  </h2>

                  <p className="text-zinc-400 mt-3 sm:mt-5 text-xs sm:text-sm leading-relaxed sm:leading-7">
                    Regular testing helps you turn preparation into measurable
                    progress. Attempt tests, review your mistakes and keep
                    improving with every attempt.
                  </p>

                  <div className="mt-6 sm:mt-7 space-y-2.5 sm:space-y-3">
                    {[
                      "Timed examination experience",
                      "Question-wise review",
                      "Detailed solutions",
                      "Performance tracking",
                      "Leaderboard and XP",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-300"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-emerald-400 shrink-0"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                          TEST PERFORMANCE
                        </p>
                        <p className="text-2xl sm:text-3xl font-bold mt-1.5 sm:mt-2">82%</p>
                      </div>

                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <BarChart3
                          size={20}
                          className="text-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-7 h-2.5 sm:h-3 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-6 sm:mt-7">
                      <div className="rounded-xl bg-zinc-900 p-3 sm:p-4 text-center sm:text-left">
                        <p className="text-[10px] sm:text-xs text-zinc-500">Accuracy</p>
                        <p className="font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1">88%</p>
                      </div>

                      <div className="rounded-xl bg-zinc-900 p-3 sm:p-4 text-center sm:text-left">
                        <p className="text-[10px] sm:text-xs text-zinc-500">Tests</p>
                        <p className="font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1">24</p>
                      </div>

                      <div className="rounded-xl bg-zinc-900 p-3 sm:p-4 text-center sm:text-left">
                        <p className="text-[10px] sm:text-xs text-zinc-500">Rank</p>
                        <p className="font-semibold text-xs sm:text-sm mt-0.5 sm:mt-1">#42</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= CTA ========================= */}
        <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-white text-black flex items-center justify-center">
              <Trophy size={23} className="sm:w-6 sm:h-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-5 sm:mt-7 tracking-tight">
              Your next improvement starts with the next test.
            </h2>

            <p className="text-zinc-400 mt-3 sm:mt-5 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed sm:leading-7">
              Start practicing with MentorSala and make every test an
              opportunity to improve your preparation.
            </p>

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="group mt-7 sm:mt-9 inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all cursor-pointer active:scale-[0.98]"
            >
              Start Your Preparation
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform sm:w-4 sm:h-4"
              />
            </button>
          </div>
        </section>
      </main>

      {/* ========================= FOOTER ========================= */}
      <Footer />
    </div>
  );
}