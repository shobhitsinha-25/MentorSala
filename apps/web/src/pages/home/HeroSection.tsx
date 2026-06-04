import { Link } from "react-router-dom";

// Configuration Reference (for your Header Navigation links map context):
// {
//   label: "Success Stories",
//   href: "#hero",
// }

export default function HeroSection() {
  return (
    <section 
      id="hero" // Fixed: Removed the "#" character prefix from the id string attribute
      className="relative overflow-hidden bg-[#F7F5FF] px-6 pt-28 pb-24"
    >
      {/* Background Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-[-80px] h-[420px] w-[420px] rounded-full bg-purple-400/20 blur-[120px] animate-pulse" />
        <div className="absolute top-[120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-120px] left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px] animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white/80 px-5 py-2 text-sm font-medium text-[#5B5BD6] shadow-sm backdrop-blur-xl">
            ✨ India's #1 AI EdTech Platform
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-[#0F172A]">
            India's Smartest
            <br />
            Mentorship Platform
            <br />
            <span className="bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
              for Competitive Exams
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-[#64748B]">
            AI-powered mentorship, structured preparation, and gamified learning for students preparing for JEE, WBJEE & Boards.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <a
              href="#courses"
              className="inline-flex items-center justify-center rounded-2xl border border-[#D9D4FF] bg-white px-8 py-4 text-lg font-semibold text-[#0F172A] shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:bg-[#F8FAFF]"
            >
              <span className="text-[#0F172A]">
                Explore Courses
              </span>
            </a>
          </div>

          {/* Dashboard Visualizer */}
          <div className="relative mt-24 max-w-5xl mx-auto overflow-visible">
            
            {/* Floating Card Left */}
            <div className="absolute -left-20 top-16 z-30 hidden xl:flex items-center gap-4 rounded-2xl border border-[#E9E5FF] bg-white px-5 py-4 shadow-2xl animate-[float_4s_ease-in-out_infinite]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                🏆
              </div>
              <div className="text-left">
                <p className="text-sm text-[#64748B]">
                  Achievement Unlocked
                </p>
                <h4 className="font-bold text-[#0F172A]">
                  7-Day Study Streak
                </h4>
              </div>
            </div>

            {/* Floating Card Right */}
            <div className="absolute -right-20 top-36 z-30 hidden xl:flex items-center gap-4 rounded-2xl border border-[#E9E5FF] bg-white px-5 py-4 shadow-2xl animate-[float_5s_ease-in-out_infinite]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                📈
              </div>
              <div className="text-left">
                <p className="text-sm text-[#64748B]">
                  Mock Test Result
                </p>
                <h4 className="font-bold text-[#0F172A]">
                  AIR Prediction: 3,200
                </h4>
              </div>
            </div>

            {/* Main Dashboard Card */}
            <div className="relative z-10 rounded-[36px] border border-[#E8E5F5] bg-white/90 p-8 shadow-[0_20px_80px_rgba(124,58,237,0.08)] backdrop-blur-xl">
              {/* Profile Bar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-2xl font-bold text-white shadow-lg">
                    RK
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-[#0F172A]">
                      Rahul Kumar
                    </h3>
                    <p className="text-[#64748B]">
                      JEE Advanced Aspirant
                    </p>
                  </div>
                </div>

                {/* Score Counter */}
                <div className="text-center">
                  <p className="text-sm text-[#64748B] mb-1">
                    Global Rank
                  </p>
                  <h2 className="text-5xl font-black text-[#7C3AED]">
                    #847
                  </h2>
                </div>
              </div>

              {/* Core Metrics Grid */}
              <div className="mt-10 grid md:grid-cols-3 gap-5">
                {[
                  {
                    label: "XP This Week",
                    value: "2,840",
                  },
                  {
                    label: "Current Streak",
                    value: "14 Days",
                  },
                  {
                    label: "Completion",
                    value: "78%",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#EEF0F7] bg-[#FAFBFF] p-6 text-center"
                  >
                    <p className="text-sm text-[#64748B] mb-2">
                      {item.label}
                    </p>
                    <h3 className="text-3xl font-black text-[#0F172A]">
                      {item.value}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Subject Performance Bars */}
              <div className="mt-10 space-y-6">
                {[
                  {
                    subject: "Physics",
                    value: "78%",
                    width: "78%",
                    color: "from-blue-500 to-cyan-400",
                  },
                  {
                    subject: "Chemistry",
                    value: "86%",
                    width: "86%",
                    color: "from-purple-500 to-pink-400",
                  },
                  {
                    subject: "Mathematics",
                    value: "69%",
                    width: "69%",
                    color: "from-yellow-400 to-orange-400",
                  },
                ].map((item) => (
                  <div key={item.subject}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-[#0F172A]">
                        {item.subject}
                      </span>
                      <span className="text-[#64748B]">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-[#EEF0F7] overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        style={{
                          width: item.width,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Platform Performance Statistics Row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "3K+",
                label: "Students",
              },
              {
                value: "90%",
                label: "Success Rate",
              },
              {
                value: "10+",
                label: "Mentors",
              },
              {
                value: "100k+",
                label: "Problems Solved",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-[#E8E5F5] bg-white/70 px-6 py-8 shadow-sm backdrop-blur-xl"
              >
                <h3 className="text-4xl font-black text-[#0F172A]">
                  {item.value}
                </h3>
                <p className="mt-2 text-[#64748B] text-lg">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}