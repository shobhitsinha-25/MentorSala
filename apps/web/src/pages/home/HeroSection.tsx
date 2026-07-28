import React from "react";
import mentorsalalogo from "../../assets/logo1.png"
import { Link } from "react-router-dom";
import { 
  Play, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Bell, 
  Flame, 
  Bot, 
  Calendar, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  Video, 
  FileText, 
  LineChart, 
  LayoutDashboard,
  ExternalLink,
  MessageSquare,
  Send
} from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#F8F9FE] px-4 pt-28 pb-16 lg:px-8">
      {/* Dynamic Background Mesh Gradients & Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-300/30 blur-[140px]" />
        <div className="absolute top-1/3 -right-20 h-[600px] w-[600px] rounded-full bg-blue-400/20 blur-[160px]" />
        <div className="absolute bottom-10 left-10 h-[400px] w-[400px] rounded-full bg-indigo-300/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* TOP SECTION: Split Grid (Left Text/CTAs, Right Floating UI Mockup) */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Hero Copy & Actions */}
          <div className="flex flex-col items-start text-left lg:col-span-5">
            
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-3.5 py-1.5 shadow-sm">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80" alt="Student" />
                <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" alt="Student" />
                <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" alt="Student" />
              </div>
              <span className="text-xs font-semibold text-[#4F46E5] flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500 fill-amber-400" />
                Trusted by 3,000+ Students
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.08]">
              Every Rank <br />
              Has a <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                Mentor.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base text-slate-600 sm:text-lg leading-relaxed max-w-lg">
              AI-powered mentorship, personalized study plans, unlimited mock tests, and IIT mentor guidance to help you crack <strong>JEE, WBJEE & Boards</strong>.
            </p>

            {/* Primary Action CTAs */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
  {/* Inline Introductory Line */}
  <span className="text-sm font-semibold text-slate-600">
    Start your journey with <span className="text-[#5B46F6] font-bold">MentorSala</span>
  </span>

  {/* Button */}
  <Link
    to="/signup"
    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B46F6] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:bg-[#4C36E4] hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
  >
    Start Free
    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
  </Link>
</div>

            {/* Feature Checklist */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500 stroke-[3]" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500 stroke-[3]" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500 stroke-[3]" />
                <span>2-Min Setup</span>
              </div>
            </div>

            {/* Mini Stats Cards */}
            <div className="mt-10 grid w-full grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
                <p className="text-xl font-extrabold text-slate-900">3,000+</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500 leading-tight">Active Students and growing every day</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
                <p className="text-xl font-extrabold text-slate-900">10+</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500 leading-tight">IIT/NIT Selections from our mentorship</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
                <p className="text-xl font-extrabold text-slate-900">4.9/5</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500 leading-tight">Student Rating loved by aspirants</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Floating Dashboard Visualizer */}
          <div className="relative lg:col-span-7">
            <div className="relative w-full max-w-4xl mx-auto py-10 px-2 sm:px-6 flex justify-center items-center select-none [perspective:1400px]">
              
              {/* 3D FLOATING SPHERE ORBS */}
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.4),0_15px_25px_rgba(99,102,241,0.4)] animate-bounce duration-[3000ms] z-20" />
              <div className="absolute -bottom-8 -right-6 w-20 h-20 rounded-xl rotate-45 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 shadow-[0_20px_35px_rgba(79,70,229,0.5)] z-20 animate-pulse" />

              {/* MAIN 3D TILT CONTAINER */}
              <div className="relative w-full rounded-[36px] bg-gradient-to-tr from-[#6366F1] via-[#4F46E5] to-[#9333EA] p-3 sm:p-5 shadow-[0_35px_60px_-15px_rgba(79,70,229,0.45),0_0_40px_rgba(147,51,234,0.3)] transition-all duration-700 hover:scale-[1.01] [transform:rotateX(8deg)_rotateY(-6deg)_rotateZ(1deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)]">
                
                {/* INNER WHITE DASHBOARD CANVAS */}
                <div className="relative overflow-hidden rounded-[28px] bg-[#F8FAFC] p-4 sm:p-5 text-left shadow-inner border border-white/40">
                  
                  {/* HEADER BAR */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
  <img 
    src={mentorsalalogo} 
    alt="Mentor Sala Logo" 
    className="h-7 w-auto object-contain" 
  />
  
</div>
                      <span className="text-base font-black tracking-tight text-slate-900">
                        Mentor<span className="text-indigo-600">Sala</span>
                      </span>
                    </div>

                    {/* User Info & Actions */}
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex flex-col text-right">
                        <span className="text-xs font-bold text-slate-800">Hi, Arjun! 👋</span>
                        <span className="text-[10px] font-medium text-slate-400">Let's make today count.</span>
                      </div>

                      <button className="relative rounded-xl p-2 text-slate-400 hover:bg-slate-100 transition-colors">
                        <Bell size={16} />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                      </button>

                      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 px-3 shadow-sm">
                        <img 
                          className="h-7 w-7 rounded-full object-cover ring-2 ring-indigo-50" 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                          alt="Student Profile" 
                        />
                        <div className="text-left">
                          <p className="text-[10px] font-bold leading-tight text-slate-800">JEE 2026 Aspirant</p>
                          <p className="text-[9px] text-slate-400 leading-tight">4th Dropper</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DASHBOARD CONTENT GRID */}
                  <div className="mt-4 grid grid-cols-12 gap-3.5">
                    
                    {/* LEFT SIDEBAR */}
                    <div className="col-span-12 md:col-span-3 rounded-2xl bg-white p-3 shadow-sm border border-slate-100 flex flex-col justify-between gap-2 text-[11px] font-semibold text-slate-500">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5 rounded-xl bg-indigo-600 px-3 py-2 text-white shadow-md shadow-indigo-500/30">
                          <LayoutDashboard size={14} />
                          <span>Dashboard</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
                          <BookOpen size={14} />
                          <span>Study Plan</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
                          <FileText size={14} />
                          <span>Mock Tests</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
                          <Bot size={14} />
                          <span>AI Mentor</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
                          <LineChart size={14} />
                          <span>Performance</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
                          <HelpCircle size={14} />
                          <span>Doubts</span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
                          <Video size={14} />
                          <span>Mentor Calls</span>
                        </div>
                      </div>

                      {/* Study Streak Card */}
                      <div className="mt-2 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-3 text-white shadow-md">
                        <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">Study Streak</p>
                        <div className="mt-1 flex items-baseline justify-between">
                          <div>
                            <span className="text-2xl font-black">12</span>
                            <span className="text-[10px] text-slate-300 ml-1">days</span>
                          </div>
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400">
                            <Flame size={16} className="fill-orange-400 animate-pulse" />
                          </div>
                        </div>
                        <p className="mt-1 text-[8px] text-slate-400">Keep it up!</p>
                      </div>
                    </div>

                    {/* CENTER & RIGHT CONTENT AREA */}
                    <div className="col-span-12 md:col-span-9 space-y-3.5">
                      
                      {/* TOP ROW: Study Plan & AI Rank Prediction */}
                      <div className="grid grid-cols-12 gap-3.5">
                        
                        {/* Today's Study Plan */}
                        <div className="col-span-12 sm:col-span-7 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-900">Today's Study Plan</h4>
                            <a href="#plan" className="text-[10px] font-bold text-indigo-600 hover:underline">View full plan &rarr;</a>
                          </div>

                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-[10px]">
                              <div>
                                <p className="font-bold text-slate-800">Physics</p>
                                <p className="text-slate-400 text-[9px]">Rotational Motion</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                  <div className="h-full bg-indigo-600 w-[75%]" />
                                </div>
                                <span className="font-black text-indigo-600">75%</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-[10px]">
                              <div>
                                <p className="font-bold text-slate-800">Chemistry</p>
                                <p className="text-slate-400 text-[9px]">Organic Chemistry</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                  <div className="h-full bg-purple-600 w-[50%]" />
                                </div>
                                <span className="font-black text-purple-600">50%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* AI Rank Prediction Card */}
                        <div className="col-span-12 sm:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-3.5 text-white shadow-md border border-indigo-500/20 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold tracking-wide text-indigo-300 uppercase">AI Rank Prediction</span>
                              <ExternalLink size={12} className="text-slate-400" />
                            </div>
                            <p className="mt-1 text-[9px] text-slate-400">Your Predicted All India Rank</p>
                            <div className="mt-1 flex items-baseline gap-2">
                              <p className="text-3xl font-black text-white tracking-tight">2,458</p>
                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">Top 1.2%</span>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-800 pt-2">
                            <span>Based on your performance</span>
                            <span className="text-indigo-400 font-bold hover:underline cursor-pointer">View Details &rarr;</span>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM ROW: Mentor Session & Performance */}
                      <div className="grid grid-cols-12 gap-3.5">
                        
                        {/* Upcoming Mentor Session */}
                        <div className="col-span-12 sm:col-span-6 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex flex-col justify-between">
                          <span className="text-[10px] font-bold text-slate-900">Upcoming Mentor Session</span>
                          <div className="mt-2 flex items-center gap-3">
                            <img className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-50" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Mentor" />
                            <div>
                              <p className="text-xs font-bold text-slate-800">Aditya Pratap Singh</p>
                              <p className="text-[9px] font-semibold text-indigo-600">IIT Jammu</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600">
                              <Calendar size={12} className="text-indigo-600" />
                              <span>28 Jul, 8:00 PM</span>
                            </div>
                            <button className="rounded-xl bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-colors">
                              Join Session
                            </button>
                          </div>
                        </div>

                        {/* Test Performance Radial Gauge */}
                        <div className="col-span-12 sm:col-span-6 rounded-2xl bg-white p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-900">Test Performance</p>
                            <div>
                              <p className="text-[9px] text-slate-400">Top Score</p>
                              <p className="text-sm font-black text-slate-800">240 <span className="text-[10px] font-medium text-slate-400">/ 300</span></p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400">Tests Taken</p>
                              <p className="text-sm font-black text-slate-800">24</p>
                            </div>
                          </div>

                          {/* Circular Progress Meter */}
                          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-50 to-purple-50 p-2 shadow-inner">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md border-4 border-indigo-600 border-t-slate-200">
                              <span className="text-sm font-black text-slate-900">78%</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* AI FLOATING COMPANION BAR */}
                      <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 p-3 border border-indigo-100/80 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                            <Bot size={16} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-slate-900">AI Mentor</p>
                              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                              <span className="text-[9px] text-emerald-600 font-semibold">Online</span>
                            </div>
                            <p className="text-[10px] text-slate-500">Hi Arjun! I'm your AI study companion. How can I help today?</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-[10px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
                          <span>Ask Anything</span>
                          <Send size={10} />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: Trusted Institutes Ribbon */}
<div className="mt-20 rounded-3xl bg-white/70 backdrop-blur-md p-6 shadow-sm border border-slate-100">
  <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
    Trusted by Students from Top Institutes
  </p>
  <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-12 text-center">
    {[
      { 
        name: "IIT KHARAGPUR", 
        logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kharagpur_Logo.svg" 
      },
      { 
        name: "IIT BOMBAY", 
        logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg" 
      },
      { 
        name: "IIT DELHI", 
        // Fixed: Replaced Wikipedia page link with direct SVG URL
        logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/IIT_Delhi_logo.svg" 
      },
      { 
        name: "IIT (ISM) DHANBAD", 
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b0/IIT_ISM_Dhanbad_logo.svg" 
      },
      { 
        name: "NIT DURGAPUR", 
        logo: "https://upload.wikimedia.org/wikipedia/en/e/e5/National_Institute_of_Technology%2C_Durgapur_Logo.svg" 
      },
      { 
        name: "JADAVPUR UNIVERSITY", 
        logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Jadavpur_University_Logo.svg" 
      },
    ].map((inst) => (
      <div key={inst.name} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-100 p-2 shadow-2xl transition-all group-hover:border-indigo-200 group-hover:bg-indigo-50/50">
          <img 
            src={inst.logo} 
            alt={inst.name} 
            crossOrigin="anonymous"
            className="h-full w-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              const parent = img.parentNode as HTMLElement | null;
              if (parent) {
                parent.innerText = '🏛️';
              }
            }}
          />
        </div>
        <span className="mt-2 text-[10px] font-extrabold text-slate-700 tracking-tight group-hover:text-indigo-600 transition-colors">
          {inst.name}
        </span>
      </div>
    ))}

    {/* & Many More Badge */}
    <div className="flex items-center justify-center rounded-2xl bg-indigo-50/80 px-4 py-2.5 text-[11px] font-bold text-indigo-600 border border-indigo-100 shadow-sm hover:bg-indigo-100/80 transition-all cursor-pointer">
      & Many More
    </div>
  </div>
</div>

        {/* FEATURES GRID SECTION */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Everything You Need to <span className="text-indigo-600">Rank Higher</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-white p-5 text-left border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Calendar size={18} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">AI-Powered Study Plan</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Personalized daily plans that adapt to your performance and learning pace.
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-slate-50 p-2.5 text-[10px]">
                <p className="font-bold text-slate-700">Today's Plan</p>
                <div className="mt-1 flex justify-between text-slate-500">
                  <span>Physics</span>
                  <span className="font-bold text-indigo-600">75%</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-white p-5 text-left border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText size={18} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Unlimited Mock Tests</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Chapter-wise, full syllabus & previous year tests with real exam experience.
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-slate-50 p-2.5 text-[10px]">
                <p className="text-slate-400">Mock Test Score</p>
                <p className="text-sm font-extrabold text-slate-800">240 / 300 <span className="text-emerald-500 text-[10px] font-bold">↑ 24</span></p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-white p-5 text-left border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <LineChart size={18} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">AI Performance Analysis</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Detailed analysis of strengths, weaknesses and improvement areas.
                </p>
              </div>
              <div className="mt-6 flex justify-center">
  <div className="h-12 w-12 rounded-full border-2 border-black border-dashed animate-spin"></div>
</div>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl bg-white p-5 text-left border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Video size={18} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">IIT Mentor Guidance</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Learn from IITians who guide you, motivate you and keep you accountable.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-2">
                <img className="h-7 w-7 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Mentor" />
                <div className="text-[9px]">
                  <p className="font-bold text-slate-800">Aditya Pratap Singh</p>
                  <p className="text-slate-400">IIT Jammu</p>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl bg-white p-5 text-left border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MessageSquare size={18} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Doubt Solving 24x7</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Get instant solutions from AI or connect with mentors whenever you need.
                </p>
              </div>
              <div className="mt-6 rounded-xl bg-indigo-50/70 p-2 text-[9px] text-indigo-900">
                <p className="font-semibold">What is the formula for differential equations?</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR (Light Purple Glassmorphism Theme) */}
<div className="relative mt-16 overflow-hidden rounded-3xl border border-purple-200/60 bg-purple-100/40 p-8 shadow-lg shadow-purple-500/5 backdrop-blur-xl">
  
  {/* Subtle Ambient Glow inside Glass Container */}
  <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-purple-300/30 blur-2xl" />
  <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-indigo-300/30 blur-2xl" />

  <div className="relative z-10 grid grid-cols-2 gap-6 text-center md:grid-cols-4">
    <div className="flex flex-col items-center">
      <p className="text-3xl font-black text-purple-950 sm:text-4xl">100k+</p>
      <p className="mt-1 text-xs font-semibold text-purple-700/80">AI Doubts Solved</p>
    </div>

    <div className="flex flex-col items-center md:border-l md:border-purple-200/50">
      <p className="text-3xl font-black text-purple-950 sm:text-4xl">95%</p>
      <p className="mt-1 text-xs font-semibold text-purple-700/80">Students Improved</p>
    </div>

    <div className="flex flex-col items-center md:border-l md:border-purple-200/50">
      <p className="text-3xl font-black text-purple-950 sm:text-4xl">10K+</p>
      <p className="mt-1 text-xs font-semibold text-purple-700/80">Tests Attempted Daily</p>
    </div>

    <div className="flex flex-col items-center md:border-l md:border-purple-200/50">
      <p className="text-3xl font-black text-purple-950 sm:text-4xl">24/7</p>
      <p className="mt-1 text-xs font-semibold text-purple-700/80">AI Mentor Support</p>
    </div>
  </div>
</div>

        

      </div>
    </section>
  );
}