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
  BookOpen,
  School,
  Clock,
  TrendingUp,
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
    "Academic Mentoring"
  ];

  // State to track the leftmost visible card index for the circular slide effect
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect to move in a continuous round fashion
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3500); // Transitions cards every 3.5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= whoWeServeItems.length - 3 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? whoWeServeItems.length - 3 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white text-black">

      <AboutNavbar />

      {/* ========================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================= */}

      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          {/* Responsive Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Tagline */}
            <div className="lg:col-span-5">
              <h1
                className="
                  mt-2
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-black
                  leading-none
                  tracking-tight
                  text-black
                "
              >
                <span 
                  className="text-white select-none"
                  style={{ WebkitTextStroke: "1px #000000" }}
                >
                  Crack Your Goals With
                </span>
                <span className="block mt-2 pb-2  bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                  Personalized Mentorship.
                </span>
              </h1>
            </div>

            {/* Right Column: MentorSala Description & Actions */}
            <div className="lg:col-span-7 lg:mt-4">
              <p
                className="
                  text-lg
                  leading-8
                  text-black
                "
              >
                MentorSala is a personalized mentorship platform dedicated to helping students succeed in
                <span className="text-black font-semibold"> JEE Main,</span>{" "}
                <span className="text-black font-semibold"> JEE Advanced,</span>{" "}
                <span className="text-black font-semibold"> WBJEE</span> and{" "}
                <span className="text-black font-semibold"> Board Examinations </span>
                through one-on-one mentorship, personalized academic guidance, strategic planning, and continuous performance tracking.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-600
                    to-blue-600
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    shadow-lg
                    transition
                    hover:scale-[1.02]
                    !text-white
                  "
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* WHY MENTORSALA SECTION */}
      {/* ========================================================= */}

      <section className="py-5  bg-indigo-600/10">

        <div className="max-w-7xl mx-auto px-6 text-black">

          <div className="text-center max-w-3xl mx-auto mt-2">

            <span className="!text-indigo font-bold uppercase tracking-[0.25em] text-sm">
              Why MentorSala
            </span>

            <h2 className="mt-5 text-5xl font-black text-indigo-700">
              What Makes MentorSala Different?
            </h2>

            <p className="mt-6 text-black leading-8">
              MentorSala combines expert mentorship, structured guidance,
              and modern technology to deliver a personalized learning
              experience that traditional coaching institutes cannot.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

            <FeatureCard
              icon={<GraduationCap size={32} />}
              title="Personalized Mentorship"
              description="Every student receives a customized study plan based on strengths, weaknesses, learning style, and target colleges."
            />

            <FeatureCard
              icon={<Users size={32} />}
              title="Dedicated Mentor Support"
              description="Our mentors continuously monitor progress, solve doubts, motivate students, and provide strategic guidance."
            />

            <FeatureCard
              icon={<BarChart3 size={32} />}
              title="Performance Tracking"
              description="Regular assessments, goal reviews, and progress reports help students stay consistent throughout preparation."
            />

            <FeatureCard
              icon={<Briefcase size={32} />}
              title="Career Guidance"
              description="Beyond exams, MentorSala helps students make informed decisions about colleges, branches, and careers."
            />

            <FeatureCard
              icon={<Laptop size={32} />}
              title="Flexible Online Learning"
              description="Connect with mentors anytime, anywhere through interactive online sessions and digital resources."
            />

            <FeatureCard
              icon={<Brain size={32} />}
              title="AI Powered Learning"
              description="Leverage intelligent tools to practice, analyze performance, and improve learning efficiency."
            />

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* WHO WE HELP (UPDATED FOR INFINITE 3-CARD CAROUSEL SELECTION) */}
      {/* ========================================================= */}

      <section className="py-10 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col items-center justify-center text-center mb-16">
  <div>
    <span className="text-indigo-400 uppercase tracking-[0.25em] text-sm font-bold block">
      Who We Serve
    </span>
    <h2 className="mt-5 text-4xl md:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto">
      Helping Students Across Every Stage
    </h2>
  </div>
  
  
</div>

          {/* Mask Container */}
          <div className="overflow-hidden w-full px-1 py-4">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 3)}%)` 
              }}
            >
              {whoWeServeItems.map((item, index) => (
                <div 
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                >
                  <div
                    className="
                      rounded-2xl
                      border
                      border-indigo-500
                      bg-[#e6e6ff]
                      text-black
                      p-7
                      hover:border-black
                      transition-all
                      duration-300
                      h-full
                    "
                  >
                    <School className="text-indigo-400 mb-5" />

                    <h3 className="font-bold text-lg">
                      {item}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Pagination Tracker Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: whoWeServeItems.length - 2 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-indigo-600" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* WHY STUDENTS CHOOSE US */}
      {/* ========================================================= */}

      <section className="py-10 bg-[#030B1A]">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="text-indigo-400 uppercase tracking-[0.25em] text-sm font-bold">
              Why Students Choose Us
            </span>

            <h2 className="mt-5 text-5xl font-black text-white">
              Trusted By Future Achievers
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-20">

            {[
              "Personalized Academic Roadmaps",
              "One-on-One Mentor Interaction",
              "Regular Progress Reviews",
              "Strategic Exam Preparation",
              "Time Management Support",
              "Motivation & Accountability",
              "Career & College Counseling",
              "Online Mentorship Across India"
            ].map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  text-white
                  gap-4
                  rounded-2xl
                  border
                  border-indigo-500/10
                  bg-black
                  p-6
                "
              >

                <CheckCircle2
                  className="text-indigo-400 shrink-0"
                  size={24}
                />

                <h3 className="font-semibold text-lg">
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

  <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

      {/* Vision Card */}
      <div
        className="
          flex
          flex-col
          rounded-3xl
          border
          border-indigo-100
          bg-gradient-to-br
          from-indigo-50/60
          to-white
          p-8
          md:p-10
          shadow-sm
          hover:shadow-md
          transition-all
          duration-300
        "
      >
        {/* Icon Container */}
        <div
          className="
            h-14
            w-14
            rounded-2xl
            bg-indigo-600/10
            flex
            items-center
            justify-center
            text-indigo-600
            border
            border-indigo-100
          "
        >
          <Eye size={28} />
        </div>

        {/* Title */}
        <h3 className="mt-8 text-3xl font-black text-slate-900 tracking-tight">
          Our Vision
        </h3>

        {/* Content Description */}
        <p className="mt-4 leading-8 text-slate-700 text-base md:text-lg flex-grow">
          To become India's most trusted student mentorship platform, empowering 
          learners with personalized guidance, confidence, clarity, and a solid 
          roadmap to achieve their academic and career goals.
        </p>
      </div>

      {/* Mission Card */}
      <div
        className="
          flex
          flex-col
          rounded-3xl
          border
          border-blue-100
          bg-gradient-to-br
          from-blue-50/60
          to-white
          p-8
          md:p-10
          shadow-sm
          hover:shadow-md
          transition-all
          duration-300
        "
      >
        {/* Icon Container */}
        <div
          className="
            h-14
            w-14
            rounded-2xl
            bg-blue-600/10
            flex
            items-center
            justify-center
            text-blue-600
            border
            border-blue-100
          "
        >
          <Target size={28} />
        </div>

        {/* Title */}
        <h3 className="mt-8 text-3xl font-black text-slate-900 tracking-tight">
          Our Mission
        </h3>

        {/* Custom Premium List Items */}
        <ul className="mt-6 space-y-4 text-slate-700 font-medium text-sm md:text-base flex-grow">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>Provide personalized mentorship for JEE, WBJEE and Board students.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>Help students build effective study strategies and exam preparation plans.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>Improve consistency, discipline and academic performance.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>Reduce stress through continuous mentorship and accountability.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <span>Create a supportive learning ecosystem where every student receives individual attention.</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>

{/* ========================================================= */}
{/* FREQUENTLY ASKED QUESTIONS */}
{/* ========================================================= */}
<section className="py-10 bg-slate-50/50 relative overflow-hidden border-t border-slate-100">
  <div className="max-w-4xl mx-auto px-6 relative z-10">
    
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      
      <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
       FAQ's
      </h2>
     
    </div>

    {/* FAQ Accordion List Components */}
    <div className="space-y-4">
      {[
        {
          q: "Why I need mentorship?",
          a: "Preparing for competitive exams can feel overwhelming, and hard work alone isn't always enough. A mentor provides the right strategy, tells you exactly what to study, keeps you disciplined, and helps you stay motivated so you don't lose track or burn out during your preparation journey."
        },
        {
          q: "Why to choose MentorSala? How is it different from others?",
          a :"Unlike ordinary platforms, MentorSala provides structured guidance from highly qualified mentors who have cracked these exams themselves. We don't just give you a generic study plan; we continuously keep track of your individual progress, monitor your scores, and adapt your roadmap dynamically. You get a real, experienced mentor keeping you accountable at every single step."
        },
        {
          q: "Is it only for Jee Student?",
          a:"Not at all! While we offer top-tier guidance for JEE Main and JEE Advanced, MentorSala also provides dedicated mentorship programs for WBJEE aspirants as well as Class 9 to 12 school students preparing for their Board Examinations."
        },
        {
          q: "How frequently will I interact with my personal mentor?",
          a:"Your interaction frequency depends entirely on the specific plan you are enrolled in. However, regardless of your plan, each scheduled mentorship session is a dedicated 30-minute one-on-one call focused entirely on your strategy, progress tracking, and goal reviews."
        },
        {
          q: "Does MentorSala provide study materials or mock test series?",
          a:"We do not provide standard study materials, as our focus is entirely on personalized guidance and strategy. However, we do offer a comprehensive mock test series, including monthly All India Tests. These tests help you check exactly where you stand on a national level, and the top performers win exciting gifts!"
        }
      ].map((faq, idx) => (
        <details 
          key={idx} 
          className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
            <h3 className="text-lg font-bold tracking-wide transition-colors duration-200 group-hover:text-indigo-600">
              {faq.q}
            </h3>
            
            {/* Animated Custom Indicator Cross Arrow */}
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-open:bg-indigo-600/10 group-open:text-indigo-600 transition-colors duration-300">
              <svg
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </summary>

          <p className="mt-4 leading-7 text-slate-600 text-sm md:text-base border-t border-slate-100 pt-4">
            {faq.a}
          </p>
        </details>
      ))}
    </div>

  </div>
</section>

      
      <section>
        <Footer/>
      </section>
        
    </div>
  );
};

{/* ========================================================= */}
{/* SUB-COMPONENTS (DECLARED OUTSIDE MAIN COMPONENT) */}
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
  <div
    className="
      rounded-3xl
      border
      border-black
      bg-white/[0.03]
      p-8
      hover:border-indigo-500/30
      hover:-translate-y-1
      transition-all
      duration-300
    "
  >
    <div className="text-indigo-700">
      {icon}
    </div>
    <h3 className="mt-8 text-2xl font-bold">
      {title}
    </h3>
    <p className="mt-5 leading-8 text-slate-400">
      {description}
    </p>
  </div>
);

const ApproachCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div
    className="
      rounded-3xl
      border
      border-white/5
      bg-white/[0.03]
      p-8
    "
  >
    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
      {icon}
    </div>
    <h3 className="mt-8 text-2xl font-bold">
      {title}
    </h3>
    <p className="mt-5 text-slate-400 leading-8">
      {text}
    </p>
  </div>
);

export default About;