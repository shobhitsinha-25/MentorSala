import { useState } from "react";
import { Star, Quote, Sparkles, Trophy, TrendingUp, Award } from "lucide-react";
import AboutNavbar from "../About/AboutNavbar";

interface Testimonial {
  name: string;
  journey: string;
  achievement: string;
  review: string;
  category?: string;
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
    journey: "",
    achievement: "",
    review:
      "MentorSala made me realize that preparation isn't only about studying long hours. It's about following the right strategy every day. My mentor kept me accountable, motivated, and focused on my goals. I became much more confident before the exam because I knew I had the right guidance.",
  },
  {
    name: "Aryan Gupta",
    journey: "",
    achievement: "",
    review:
      "I joined MentorSala because I needed someone to guide me personally. The one-to-one mentorship, performance reviews, and regular motivation helped me stay consistent throughout the year. I improved my mock-test scores significantly and entered the exam with confidence.",
  },
  {
    name: "Sneha Das",
    journey: "",
    achievement: "",
    review:
      "Whenever I lost motivation, my mentor was there to encourage me and help me get back on track. MentorSala's personalized guidance, planning, and continuous feedback made my preparation much more effective. It felt like having a senior who genuinely cared about my success.",
  },
  {
    name: "Radhika",
    journey: "Admitted to JGEC",
    achievement: "Jalpaiguri Government Engineering College",
    review:
      "MentorSala gave me the direction I was missing during my preparation. My mentor helped me create a realistic study plan, analyze my mock tests, and stay consistent even when my confidence dropped. The regular guidance and motivation made a huge difference in my performance. I'm grateful that with MentorSala's support, I secured admission to Jalpaiguri Government Engineering College. I highly recommend MentorSala to every student looking for personalized mentorship.",
  },
];

const categories = [
  { id: "all", label: "All Stories" },
  { id: "iit", label: "IITs & Top Colleges" },
  { id: "percentile", label: "Percentile Jump" },
];

export default function SuccessStories() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTestimonials = testimonials.filter((student) => {
    if (activeFilter === "percentile") return student.journey.includes("Percentile");
    if (activeFilter === "iit")
      return (
        student.achievement.includes("IIT") ||
        student.achievement.includes("IIM") ||
        student.achievement.includes("Jadavpur") ||
        student.achievement.includes("JGEC")
      );
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Navigation */}
      <AboutNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          

          <h1 className="mt-6 text-4xl sm:text-6xl font-black tracking-tight text-white">
            Success Stories
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Every student's journey is unique. At MentorSala, we believe that
            personalized mentorship, consistency, and the right strategy can
            transform dreams into achievements.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-800">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Personalized Support</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">30%+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Avg Percentile Boost</div>
            </div>
            <div className="col-span-2 md:col-span-1 p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">Top 1%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Mentors from Premier Institutes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 sm:py-16 w-full">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white border border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-100/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((student, idx) => {
            const initials = student.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={student.name + idx}
                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                        {initials}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {student.name}
                        </h3>

                        {student.journey ? (
                          <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                            <TrendingUp size={12} />
                            {student.journey}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">Student</span>
                        )}
                      </div>
                    </div>

                    <Quote size={28} className="text-slate-200 group-hover:text-indigo-200 transition-colors shrink-0" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 leading-relaxed text-sm">
                    "{student.review}"
                  </p>
                </div>

                {/* Card Footer (Achievement Tag) */}
                {student.achievement && (
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1">
                      <Award size={13} className="text-slate-400" />
                      Achievement
                    </span>

                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-lg border border-indigo-100/60">
                      {student.achievement}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}