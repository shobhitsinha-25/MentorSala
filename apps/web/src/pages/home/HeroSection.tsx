// Configuration Reference (for your Header Navigation links map context):
// {
//   label: "Success Stories",
//   href: "#hero",
// }

import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Trophy, 
  Atom, 
  FlaskConical, 
  Calculator, 
  Users, 
  Target, 
  Star, 
  GraduationCap 
} from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="hero" 
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
          <div className="relative inline-flex items-center justify-center rounded-full">
  {/* The Ring Animation Layer (Stays behind, text won't fade) */}
  <div className="absolute inset-0 rounded-full animate-pulse ring-3 ring-[#4d4dff] bg-[#ccccff]"></div>

  {/* Your Original Div Layer (Text and background remain completely solid) */}
  <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white/80 px-5 py-2 text-sm font-medium text-[#5B5BD6] shadow-sm backdrop-blur-xl">
    ✨ India's #1 AI EdTech Platform
  </div>
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

          {/* Dashboard Visualizer Layout Mesh workspace */}
          <div className="relative mt-24 max-w-5xl mx-auto overflow-visible">
            
            {/* Main Dashboard Card */}
            <div className="relative z-10 rounded-[32px] border border-[#E8E5F5]/60 bg-white p-8 shadow-[0_20px_60px_rgba(124,58,237,0.04)] text-left">
              
              {/* Profile Bar */}
              <div className="flex flex-row items-center justify-between border-b border-[#F1F3F9] pb-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#2563EB] text-xl font-bold text-white shadow-md">
                    AV
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0A0E25]">
                      Achal Vidhu
                    </h3>
                    <p className="text-sm font-medium text-[#8F9CAE] mt-0.5">
                      JEE Advanced Aspirant
                    </p>
                  </div>
                </div>

                {/* Score Counter / Global Rank Display elements */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">Global Rank</p>
                    <h4 className="text-3xl font-black text-[#5046E5] mt-0.5">#600</h4>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0EEFF] text-[#6366F1]">
                    <Trophy size={20} />
                  </div>
                </div>
              </div>

              {/* Core Metrics Grid Workspace */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "XP This Week",
                    value: "1,005",
                    icon: <TrendingUp size={20} className="text-[#6366F1]" />,
                    iconBg: "bg-[#F3F0FF]",
                    cardStyles: "bg-[#F8F7FF] text-[#5046E5]"
                  },
                  {
                    label: "Current Streak",
                    value: "6 Days",
                    icon: <Calendar size={20} className="text-[#10B981]" />,
                    iconBg: "bg-[#E6F9F3]",
                    cardStyles: "bg-[#F4FBF9] text-[#10B981]"
                  },
                  {
                    label: "Completion",
                    value: "82%",
                    icon: <Clock size={20} className="text-[#EA580C]" />,
                    iconBg: "bg-[#FFF4ED]",
                    cardStyles: "bg-[#FFF9F5] text-[#EA580C]"
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl p-5 flex items-center gap-4 ${item.cardStyles}`}
                  >
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#8C9BAE]">
                        {item.label}
                      </p>
                      <h3 className="text-2xl font-black mt-0.5">
                        {item.value}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subject Performance Component Box List */}
              <div className="mt-6 rounded-2xl border border-[#ECEFF6] p-6 space-y-6 bg-white">
                {[
                  {
                    subject: "Physics",
                    value: "78%",
                    width: "78%",
                    color: "bg-[#2563EB]",
                    icon: <Atom size={18} className="text-[#2563EB]" />,
                    iconBg: "bg-[#EBF2FF]",
                    textColor: "text-[#2563EB]"
                  },
                  {
                    subject: "Chemistry",
                    value: "86%",
                    width: "86%",
                    color: "bg-[#D946EF]",
                    icon: <FlaskConical size={18} className="text-[#D946EF]" />,
                    iconBg: "bg-[#FDF2FF]",
                    textColor: "text-[#D946EF]"
                  },
                  {
                    subject: "Mathematics",
                    value: "69%",
                    width: "69%",
                    color: "bg-[#EA580C]",
                    icon: <Calculator size={18} className="text-[#EA580C]" />,
                    iconBg: "bg-[#FFF4ED]",
                    textColor: "text-[#EA580C]"
                  },
                ].map((item) => (
                  <div key={item.subject} className="flex items-center gap-4">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-bold text-[#0F172A]">
                          {item.subject}
                        </span>
                        <span className={`font-bold ${item.textColor}`}>
                          {item.value}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F1F3F9] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Platform Performance Statistics Row Component Workspace */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-4 rounded-3xl border border-[#E8E5F5]/60 bg-white p-2 shadow-[0_12px_40px_rgba(124,58,237,0.03)]">
              {[
                {
                  value: "3K+",
                  label: "Students Mentored",
                  icon: <Users size={18} className="text-[#6366F1]" />,
                  iconBg: "bg-[#EEF2FF]",
                },
                {
                  value: "90%",
                  label: "Success Rate",
                  icon: <Target size={18} className="text-[#10B981]" />,
                  iconBg: "bg-[#E6F9F3]",
                },
                {
                  value: "10+",
                  label: "Years of Mentorship",
                  icon: <Star size={18} className="text-[#F59E0B]" />,
                  iconBg: "bg-[#FEF3C7]",
                },
                {
                  value: "100k+",
                  label: "Hours of Teaching",
                  icon: <GraduationCap size={18} className="text-[#2563EB]" />,
                  iconBg: "bg-[#EFF6FF]",
                },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-4 px-6 py-5 text-left ${
                    index !== 0 ? "md:border-l border-[#F1F3F9]" : ""
                  }`}
                >
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#0F172A] leading-none">
                      {item.value}
                    </h3>
                    <p className="mt-1.5 text-[#8E9CAE] text-xs font-semibold whitespace-nowrap">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}