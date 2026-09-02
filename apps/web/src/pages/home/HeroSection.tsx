import React, { useState, useEffect } from "react";
import mentorsalalogo from "../../assets/logo1.png";
import iitdelhilogo from "../../assets/iit delhi.png";
import iitismlogo from "../../assets/iit ism.jpg";
import nitdurgapurlogo from "../../assets/nit durgapur.jpg";
import jadhavpurlogo from "../../assets/jadhavpur university.png";
import botlogo from "../../assets/botlogo.png";
import mentorlogo from "../../assets/m1.jpeg";
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
  const words = ["Mentor", "Guide", "Strategy"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 120);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 60);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#F8F9FE] px-4 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:px-8">
      {/* Dynamic Background Mesh Gradients & Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[300px] sm:h-[400px] lg:h-[500px] w-[300px] sm:w-[400px] lg:w-[500px] rounded-full bg-purple-300/30 blur-[100px] sm:blur-[140px]" />
        <div className="absolute top-1/3 -right-20 h-[350px] sm:h-[500px] lg:h-[600px] w-[350px] sm:w-[500px] lg:w-[600px] rounded-full bg-blue-400/20 blur-[120px] sm:blur-[160px]" />
        <div className="absolute bottom-10 left-10 h-[250px] sm:h-[350px] lg:h-[400px] w-[250px] sm:w-[350px] lg:w-[400px] rounded-full bg-indigo-300/25 blur-[90px] sm:blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* RESPONSIVE LAYOUT: Stacked on Mobile/Tablet, 5/7 Grid on Large Desktops */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
          
          {/* LEFT COLUMN: Hero Copy & Actions */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Trusted Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-purple-200 bg-white px-3 py-1 sm:px-3.5 shadow-sm">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80" alt="Student" />
                <img className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" alt="Student" />
                <img className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" alt="Student" />
              </div>
              <span className="text-xs sm:text-xs font-semibold text-[#4F46E5] flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500 fill-amber-400" />
                3,000+ Students
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Every Rank <br />
              Has a <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
                {displayText}
                <span className="animate-pulse">_</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
              AI-powered mentorship, personalized study plans, unlimited mock tests, and IIT mentor guidance to help you crack <strong>JEE, WBJEE & Boards</strong>.
            </p>

            {/* Primary Action CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-semibold text-slate-600 text-center">
                Start your journey with <span className="text-[#5B46F6] font-bold">MentorSala</span>
              </span>

              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B46F6] px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-indigo-500/25 transition-all duration-300 hover:bg-[#4C36E4] hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                Start Free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 sm:w-[18px] sm:h-[18px]" />
              </Link>
            </div>

            {/* Feature Checklist */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-xs font-medium text-slate-500">
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
            <div className="mt-6 sm:mt-10 grid w-full grid-cols-3 gap-2.5 sm:gap-3 max-w-lg lg:max-w-none">
              <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-2.5 sm:p-3.5 shadow-sm text-center lg:text-left">
                <p className="text-base sm:text-xl font-extrabold text-slate-900">3,000+</p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">Active Students</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-2.5 sm:p-3.5 shadow-sm text-center lg:text-left">
                <p className="text-base sm:text-xl font-extrabold text-slate-900">10+</p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">IIT/NIT Mentors</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-2.5 sm:p-3.5 shadow-sm text-center lg:text-left">
                <p className="text-base sm:text-xl font-extrabold text-slate-900">4.9/5</p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight">Student Rating</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Dashboard Visualizer */}
          <div className="col-span-1 lg:col-span-7 relative w-full">
            <div className="relative w-full max-w-2xl lg:max-w-4xl mx-auto py-2 sm:py-6 lg:py-10 px-0 sm:px-4 flex justify-center items-center select-none lg:[perspective:1400px]">
              
              {/* 3D FLOATING SPHERE ORBS */}
              <div className="hidden sm:block absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-400 shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.4),0_15px_25px_rgba(99,102,241,0.4)] animate-bounce duration-[3000ms] z-20" />
              <div className="hidden sm:block absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-14 sm:w-20 h-14 sm:h-20 rounded-xl rotate-45 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 shadow-[0_20px_35px_rgba(79,70,229,0.5)] z-20 animate-pulse" />

              {/* MAIN 3D TILT CONTAINER */}
              <div className="relative w-full rounded-2xl sm:rounded-[28px] lg:rounded-[36px] bg-gradient-to-tr from-[#6366F1] via-[#4F46E5] to-[#9333EA] p-2 sm:p-3.5 lg:p-5 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.35)] sm:shadow-[0_35px_60px_-15px_rgba(79,70,229,0.45)] transition-all duration-700 hover:scale-[1.01] lg:[transform:rotateX(8deg)_rotateY(-6deg)_rotateZ(1deg)] hover:lg:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)]">
                
                {/* INNER WHITE DASHBOARD CANVAS */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-[22px] lg:rounded-[28px] bg-[#F8FAFC] p-2.5 sm:p-4 lg:p-5 text-left shadow-inner border border-white/40">
                  
                  {/* HEADER BAR */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 sm:pb-3">
                    
                    {/* Logo */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <img 
                        src={mentorsalalogo} 
                        alt="Mentor Sala Logo" 
                        className="h-5 sm:h-7 w-auto object-contain" 
                      />
                      <span className="text-xs sm:text-base font-black tracking-tight text-slate-900">
                        Mentor<span className="text-indigo-600">Sala</span>
                      </span>
                    </div>

                    {/* User Info & Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-3">
                      <div className="hidden md:flex flex-col text-right">
                        <span className="text-xs font-bold text-slate-800">Hi, Arjun! 👋</span>
                        <span className="text-[10px] font-medium text-slate-400">Let's make today count.</span>
                      </div>

                      <button className="relative rounded-xl p-1.5 sm:p-2 text-slate-400 hover:bg-slate-100 transition-colors">
                        <Bell size={14} className="sm:w-4 sm:h-4" />
                        <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                      </button>

                      <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-slate-200 bg-white py-1 px-2 sm:px-3 shadow-xs">
                        <img 
                          className="h-5 w-5 sm:h-7 sm:w-7 rounded-full object-cover ring-1 ring-indigo-50" 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                          alt="Student Profile" 
                        />
                        <div className="text-left hidden sm:block">
                          <p className="text-[10px] font-bold leading-tight text-slate-800">JEE 2026 Aspirant</p>
                          <p className="text-[9px] text-slate-400 leading-tight">4th Dropper</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DASHBOARD CONTENT GRID */}
                  <div className="mt-2.5 sm:mt-4 grid grid-cols-12 gap-2 sm:gap-3.5">
                    
                    {/* LEFT SIDEBAR */}
                    <div className="col-span-4 lg:col-span-3 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3 shadow-xs border border-slate-100 flex flex-col justify-between gap-1 text-[9px] sm:text-[11px] font-semibold text-slate-500">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl bg-indigo-600 px-2 sm:px-3 py-1.5 sm:py-2 text-white shadow-xs">
                          <LayoutDashboard size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">Dashboard</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-50 transition-colors cursor-pointer">
                          <BookOpen size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">Study Plan</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-50 transition-colors cursor-pointer">
                          <FileText size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">Mock Tests</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-50 transition-colors cursor-pointer">
                          <Bot size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">AI Mentor</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-50 transition-colors cursor-pointer">
                          <LineChart size={12} className="sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">Performance</span>
                        </div>
                      </div>

                      {/* Study Streak Card */}
                      <div className="mt-1 sm:mt-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-1.5 sm:p-3 text-white shadow-xs">
                        <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase">Streak</p>
                        <div className="mt-0.5 flex items-baseline justify-between">
                          <div>
                            <span className="text-sm sm:text-2xl font-black">12</span>
                            <span className="text-[9px] sm:text-[10px] text-slate-300 ml-0.5">d</span>
                          </div>
                          <Flame size={12} className="text-orange-400 fill-orange-400 sm:w-4 sm:h-4" />
                        </div>
                      </div>
                    </div>

                    {/* CENTER & RIGHT CONTENT AREA */}
                    <div className="col-span-8 lg:col-span-9 space-y-2 sm:space-y-3.5">
                      
                      {/* TOP ROW: Study Plan & AI Rank Prediction */}
                      <div className="grid grid-cols-12 gap-2 sm:gap-3.5">
                        
                        {/* Today's Study Plan */}
                        <div className="col-span-12 sm:col-span-7 rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3.5 shadow-xs border border-slate-100 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[10px] sm:text-xs font-bold text-slate-900">Study Plan</h4>
                            <span className="text-[8px] sm:text-[10px] font-bold text-indigo-600">View &rarr;</span>
                          </div>

                          <div className="mt-1.5 sm:mt-3 space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between rounded-lg sm:rounded-xl bg-slate-50 p-1.5 sm:p-2.5 text-[9px] sm:text-[10px]">
                              <div>
                                <p className="font-bold text-slate-800">Physics</p>
                                <p className="text-slate-400 text-[8px] sm:text-[9px]">Rotational</p>
                              </div>
                              <span className="font-black text-indigo-600">75%</span>
                            </div>

                            <div className="flex items-center justify-between rounded-lg sm:rounded-xl bg-slate-50 p-1.5 sm:p-2.5 text-[9px] sm:text-[10px]">
                              <div>
                                <p className="font-bold text-slate-800">Chemistry</p>
                                <p className="text-slate-400 text-[8px] sm:text-[9px]">Organic</p>
                              </div>
                              <span className="font-black text-purple-600">50%</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Rank Prediction Card */}
                        <div className="col-span-12 sm:col-span-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-2.5 sm:p-3.5 text-white shadow-xs border border-indigo-500/20 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] sm:text-[10px] font-bold text-indigo-300 uppercase">Predicted AIR</span>
                              <ExternalLink size={10} className="text-slate-400 sm:w-3 sm:h-3" />
                            </div>
                            <p className="mt-1 text-base sm:text-3xl font-black text-white tracking-tight">2,458</p>
                            <span className="inline-block mt-1 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-400">Top 1.2%</span>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM ROW: Mentor Session & Performance */}
                      <div className="grid grid-cols-12 gap-2 sm:gap-3.5">
                        
                        {/* Upcoming Mentor Session */}
                        <div className="col-span-12 sm:col-span-6 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3.5 shadow-xs border border-slate-100 flex flex-col justify-between">
                          <span className="text-[9px] sm:text-[10px] font-bold text-slate-900">Next Session</span>
                          <div className="mt-1.5 flex items-center gap-2 sm:gap-3">
                            <img className="h-7 w-7 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl object-cover shrink-0" src={mentorlogo} alt="Mentor" />
                            <div className="overflow-hidden">
                              <p className="text-[9px] sm:text-xs font-bold text-slate-800 truncate">Aditya P.</p>
                              <p className="text-[8px] sm:text-[9px] text-indigo-600 truncate">IIT Jammu</p>
                            </div>
                          </div>
                        </div>

                        {/* Test Performance Radial Gauge */}
                        <div className="col-span-12 sm:col-span-6 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3.5 shadow-xs border border-slate-100 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-900">Performance</p>
                            <p className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5">Top Score</p>
                            <p className="text-xs sm:text-sm font-black text-slate-800">240/300</p>
                          </div>

                          <div className="relative flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-indigo-50 shrink-0">
                            <span className="text-[9px] sm:text-xs font-black text-slate-900">78%</span>
                          </div>
                        </div>

                      </div>

                      {/* AI FLOATING COMPANION BAR */}
                      <div className="flex items-center justify-between rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 p-2 sm:p-3 border border-indigo-100/80 shadow-xs">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-600 text-white shrink-0">
                            <Bot size={12} className="sm:w-4 sm:h-4" />
                          </div>
                          <div>
                            <p className="text-[9px] sm:text-xs font-bold text-slate-900">AI Mentor</p>
                            <p className="text-[8px] sm:text-[10px] text-slate-500 truncate max-w-[120px] sm:max-w-none">How can I help today?</p>
                          </div>
                        </div>
                        <button className="rounded-lg sm:rounded-xl bg-indigo-600 px-2.5 sm:px-3.5 py-1 text-[8px] sm:text-[10px] font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors">
                          Ask
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
        <div className="mt-14 sm:mt-16 lg:mt-20 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-md p-4 sm:p-6 shadow-sm border border-slate-100">
          <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
            Trusted by Students from Top Institutes
          </p>
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12 text-center">
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
                logo: iitdelhilogo 
              },
              { 
                name: "IIT (ISM) DHANBAD", 
                logo: iitismlogo 
              },
              { 
                name: "NIT DURGAPUR", 
                logo: nitdurgapurlogo 
              },
              { 
                name: "JADAVPUR UNIVERSITY", 
                logo: jadhavpurlogo 
              },
            ].map((inst) => (
              <div key={inst.name} className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-105">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-50 border border-slate-100 p-2 shadow-sm sm:shadow-md transition-all group-hover:border-indigo-200 group-hover:bg-indigo-50/50">
                  <img 
                    src={inst.logo} 
                    alt={inst.name} 
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
                <span className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-extrabold text-slate-700 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {inst.name}
                </span>
              </div>
            ))}

            {/* & Many More Badge */}
            <div className="flex items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-50/80 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-bold text-indigo-600 border border-indigo-100 shadow-sm hover:bg-indigo-100/80 transition-all cursor-pointer">
              & Many More
            </div>
          </div>
        </div>

        {/* FEATURES GRID SECTION */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 px-2">
            Everything You Need to <span className="text-indigo-600">Rank Higher</span>
          </h2>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
                <img 
                  src={botlogo} 
                  alt="AI Bot Logo" 
                  className="h-12 w-12 object-contain rounded-full shadow-sm" 
                />
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
            <div className="rounded-2xl bg-white p-5 text-left border border-slate-100 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
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
        <div className="relative mt-12 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-200/60 bg-purple-100/40 p-5 sm:p-8 shadow-lg shadow-purple-500/5 backdrop-blur-xl">
          
          {/* Subtle Ambient Glow inside Glass Container */}
          <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-purple-300/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-indigo-300/30 blur-2xl" />

          <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 text-center md:grid-cols-4">
            <div className="flex flex-col items-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-950">100k+</p>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold text-purple-700/80">AI Doubts Solved</p>
            </div>

            <div className="flex flex-col items-center border-l border-purple-200/50">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-950">95%</p>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold text-purple-700/80">Students Improved</p>
            </div>

            <div className="flex flex-col items-center border-t border-purple-200/50 pt-4 sm:pt-0 sm:border-t-0 md:border-l">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-950">10K+</p>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold text-purple-700/80">Tests Attempted Daily</p>
            </div>

            <div className="flex flex-col items-center border-t border-l border-purple-200/50 pt-4 sm:pt-0 sm:border-t-0">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-950">24/7</p>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold text-purple-700/80">AI Mentor Support</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}