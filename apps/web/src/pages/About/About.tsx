import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Eye,
  GraduationCap,
  Users,
  BarChart3,
  Briefcase,
  Laptop,
  Brain,
  CheckCircle2,
  School,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AboutNavbar from "./AboutNavbar";
import Footer from "../home/Footer";

const About = () => {
  const whoWeServeItems = [
    "JEE Main Aspirants",
    "JEE Advanced Aspirants",
    "WBJEE Aspirants",
    "Class 9–12 Students",
    "Board Examination Students",
    "Engineering Aspirants",
    "Career Guidance Seekers",
    "Academic Mentoring",
  ];

  // State to track the leftmost visible card index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive visible cards count (1 on mobile, 2 on tablet, 3 on desktop)
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, whoWeServeItems.length - visibleCards);

  // Keep currentIndex bounded when resizing between screen breakpoints
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/20 overflow-x-hidden">
      <AboutNavbar />

      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-0 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-indigo-400/15 blur-[100px] sm:blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-blue-400/15 blur-[100px] sm:blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
          {/* Responsive Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Column: Tagline */}
            <div className="lg:col-span-6 text-center lg:text-left">
             

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.12] sm:leading-[1.08] tracking-tight text-slate-950">
                Crack Your Goals With{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent block sm:inline">
                  Personalized Mentorship.
                </span>
              </h1>
            </div>

            {/* Right Column: MentorSala Description & Actions */}
            <div className="lg:col-span-6 lg:pl-6 text-center lg:text-left">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 font-normal">
                MentorSala is a personalized mentorship platform dedicated to
                helping students succeed in{" "}
                <span className="font-semibold text-slate-900">JEE Main,</span>{" "}
                <span className="font-semibold text-slate-900">JEE Advanced,</span>{" "}
                <span className="font-semibold text-slate-900">WBJEE</span> and{" "}
                <span className="font-semibold text-slate-900">Board Examinations</span>{" "}
                through one-on-one mentorship, personalized academic guidance,
                strategic planning, and continuous performance tracking.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                  <ArrowRight size={17} />
                </Link>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  1-on-1 Sessions Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHY MENTORSALA SECTION */}
      {/* ========================================================= */}

      <section className="py-14 sm:py-18 lg:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block font-bold uppercase tracking-[0.2em] text-[11px] sm:text-xs text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
              Why MentorSala
            </span>

            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              What Makes MentorSala Different?
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              MentorSala combines expert mentorship, structured guidance, and
              modern technology to deliver a personalized learning experience that
              traditional coaching institutes cannot.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-14 lg:mt-16">
            <FeatureCard
              icon={<GraduationCap size={26} />}
              title="Personalized Mentorship"
              description="Every student receives a customized study plan based on strengths, weaknesses, learning style, and target colleges."
            />

            <FeatureCard
              icon={<Users size={26} />}
              title="Dedicated Mentor Support"
              description="Our mentors continuously monitor progress, solve doubts, motivate students, and provide strategic guidance."
            />

            <FeatureCard
              icon={<BarChart3 size={26} />}
              title="Performance Tracking"
              description="Regular assessments, goal reviews, and progress reports help students stay consistent throughout preparation."
            />

            <FeatureCard
              icon={<Briefcase size={26} />}
              title="Career Guidance"
              description="Beyond exams, MentorSala helps students make informed decisions about colleges, branches, and careers."
            />

            <FeatureCard
              icon={<Laptop size={26} />}
              title="Flexible Online Learning"
              description="Connect with mentors anytime, anywhere through interactive online sessions and digital resources."
            />

            <FeatureCard
              icon={<Brain size={26} />}
              title="AI Powered Learning"
              description="Leverage intelligent tools to practice, analyze performance, and improve learning efficiency."
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHO WE HELP (RESPONSIVE MULTI-DEVICE CAROUSEL) */}
      {/* ========================================================= */}

      <section className="py-14 sm:py-18 lg:py-20 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 text-center sm:text-left">
            <div>
              <span className="text-indigo-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold block">
                Who We Serve
              </span>
              <h2 className="mt-1.5 sm:mt-2 text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Helping Students Across Every Stage
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous card"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next card"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mask Container */}
          <div className="overflow-hidden w-full py-2">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {whoWeServeItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3"
                >
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 text-slate-900 shadow-xs hover:border-indigo-300 hover:bg-white hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-600 mb-4 sm:mb-5">
                        <School size={20} />
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {item}
                      </h3>
                    </div>

                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-indigo-600">
                      <span>Curated Guidance</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Pagination Tracker Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide to index ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-5 sm:w-6 bg-indigo-600" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHY STUDENTS CHOOSE US */}
      {/* ========================================================= */}

      <section className="py-14 sm:py-18 lg:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Ambient Mesh Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[180px] sm:h-[250px] bg-indigo-500/15 blur-[90px] sm:blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-indigo-400 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold bg-indigo-950/60 border border-indigo-800/80 px-3.5 py-1 rounded-full">
              Why Students Choose Us
            </span>

            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Trusted By Future Achievers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 mt-10 sm:mt-14 lg:mt-16">
            {[
              "Personalized Academic Roadmaps",
              "One-on-One Mentor Interaction",
              "Regular Progress Reviews",
              "Strategic Exam Preparation",
              "Time Management Support",
              "Motivation & Accountability",
              "Career & College Counseling",
              "Online Mentorship Across India",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center text-white gap-3.5 sm:gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 lg:p-6 shadow-sm hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all duration-200"
              >
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                  <CheckCircle2 size={18} />
                </div>

                <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-slate-100">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* VISION & MISSION */}
      {/* ========================================================= */}

      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Vision Card */}
            <div className="flex flex-col rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-all duration-300">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 border border-indigo-200/60">
                <Eye size={26} />
              </div>

              <h3 className="mt-6 sm:mt-8 text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                Our Vision
              </h3>

              <p className="mt-3 sm:mt-4 leading-relaxed text-slate-600 text-sm sm:text-base lg:text-lg flex-grow">
                To become India's most trusted student mentorship platform,
                empowering learners with personalized guidance, confidence,
                clarity, and a solid roadmap to achieve their academic and
                career goals.
              </p>
            </div>

            {/* Mission Card */}
            <div className="flex flex-col rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-white p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-md transition-all duration-300">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-200/60">
                <Target size={26} />
              </div>

              <h3 className="mt-6 sm:mt-8 text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                Our Mission
              </h3>

              <ul className="mt-4 sm:mt-6 space-y-3 text-slate-600 font-medium text-xs sm:text-sm lg:text-base flex-grow">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Provide personalized mentorship for JEE, WBJEE and Board
                    students.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Help students build effective study strategies and exam
                    preparation plans.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Improve consistency, discipline and academic performance.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Reduce stress through continuous mentorship and accountability.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>
                    Create a supportive learning ecosystem where every student
                    receives individual attention.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================= */}

      <section className="py-14 sm:py-18 lg:py-20 bg-slate-50/70 relative overflow-hidden border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-indigo-600 uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
              Got Questions?
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {[
              {
                q: "Why I need mentorship?",
                a: "Preparing for competitive exams can feel overwhelming, and hard work alone isn't always enough. A mentor provides the right strategy, tells you exactly what to study, keeps you disciplined, and helps you stay motivated so you don't lose track or burn out during your preparation journey.",
              },
              {
                q: "Why to choose MentorSala? How is it different from others?",
                a: "Unlike ordinary platforms, MentorSala provides structured guidance from highly qualified mentors who have cracked these exams themselves. We don't just give you a generic study plan; we continuously keep track of your individual progress, monitor your scores, and adapt your roadmap dynamically. You get a real, experienced mentor keeping you accountable at every single step.",
              },
              {
                q: "Is it only for Jee Student?",
                a: "Not at all! While we offer top-tier guidance for JEE Main and JEE Advanced, MentorSala also provides dedicated mentorship programs for WBJEE aspirants as well as Class 9 to 12 school students preparing for their Board Examinations.",
              },
              {
                q: "How frequently will I interact with my personal mentor?",
                a: "Your interaction frequency depends entirely on the specific plan you are enrolled in. However, regardless of your plan, each scheduled mentorship session is a dedicated 30-minute one-on-one call focused entirely on your strategy, progress tracking, and goal reviews.",
              },
              {
                q: "Does MentorSala provide study materials or mock test series?",
                a: "We do not provide standard study materials, as our focus is entirely on personalized guidance and strategy. However, we do offer a comprehensive mock test series, including monthly All India Tests. These tests help you check exactly where you stand on a national level, and the top performers win exciting gifts!",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 lg:p-6 shadow-xs transition-all duration-300 hover:border-slate-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-slate-900">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight transition-colors duration-200 group-hover:text-indigo-600">
                    {faq.q}
                  </h3>

                  <div className="inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-open:bg-indigo-50 group-open:text-indigo-600 transition-colors duration-200">
                    <svg
                      className="h-4 w-4 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>

                <p className="mt-3.5 sm:mt-4 leading-relaxed text-slate-600 text-xs sm:text-sm lg:text-base border-t border-slate-100 pt-3.5 sm:pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER (ISOLATED DARK CONTAINER) */}
      {/* ========================================================= */}

      <div className="dark w-full bg-[#07090E] text-zinc-100 selection:bg-purple-500/30 isolate">
        <Footer />
      </div>
    </div>
  );
};

{/* ========================================================= */}
{/* SUB-COMPONENTS */}
{/* ========================================================= */}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 lg:p-8 shadow-xs hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
    <div>
      <div className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 mb-4 sm:mb-6">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
        {title}
      </h3>
      <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  </div>
);

export default About;