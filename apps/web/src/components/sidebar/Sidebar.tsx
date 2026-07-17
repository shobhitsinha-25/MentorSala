import {
  LayoutDashboard,
  Trophy,
  Users,
  ChevronRight,
  UserRoundXIcon,
  Flame,
  LogOut,
  Calendar,
  Brain,
  CreditCard,
  FileText, 
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom"; // ◄── NEW: Added useNavigate to route users away
import { useAuthStore } from "../../store/auth.store";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout); // ◄── NEW: Pull the clean logout action method
  const navigate = useNavigate(); // ◄── NEW: Initialize router link navigator helper

  const getInitials = (fullName: string) => {
    if (!fullName) return "ST";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Book Session",icon: Users,path: "/student/book-session",},
    { label: "My Sessions", icon: Calendar,path: "/student/my-sessions",},
    {label: "Tests",icon: FileText,path: "/student/tests",},
    {label: "Subscriptions",icon: CreditCard,path: "/student/subscriptions",},
    {label:"Profile",icon:UserRoundXIcon,path:"/student/profile"}
    
  ];

  const totalPoints = user?.xp || 0;
  const pointsPerLevelThreshold = 1000;
  const currentLevelXpProgress = totalPoints % pointsPerLevelThreshold;
  const calculatedProgressPercentage = Math.round((currentLevelXpProgress / pointsPerLevelThreshold) * 100);

  // ✅ HANDLER FUNCTION TO DE-AUTH USER INSTANTLY
  const handleLogoutAction = async () => {
    await logoutUser(); // Run cleanup parameters
    navigate("/login", { replace: true }); // Boot them instantly back down to login screen safely
  };

  return (
    <aside className="flex w-[300px] h-full max-h-screen shrink-0 border-r border-[#E2E8F0] bg-white flex-col px-5 py-5 overflow-hidden select-none text-[#0F172A] z-30 relative group/sidebar">
      
      {/* Logo Header */}
      <div className="px-1 flex-shrink-0">
        <h1 className="text-xl font-black tracking-tight text-[#0F172A]">
          Mentor
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
            Sala
          </span>
        </h1>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">
          AI Powered Learning Platform
        </p>
      </div>

      {/* Profile Card Widget */}
      <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2.5">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 shrink-0 rounded-lg object-cover ring-2 ring-[#7C3AED]/10 shadow-sm"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-xs font-black text-white shadow-sm">
              {getInitials(user?.name || "Student")}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-black text-[#0F172A] truncate leading-tight">
              {user?.name || "Loading Profile..."}
            </h2>
            <p className="text-[10px] text-[#64748B] font-bold truncate mt-0.5 uppercase tracking-wide">
              {user?.targetExam ? `${user.targetExam.split("_")[0]} Aspirant` : "Aspirant"}
            </p>
          </div>
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-bold">
          <div className="rounded-md bg-[#7C3AED]/10 px-2 py-0.5 text-[#7C3AED] uppercase">
            {user?.level || "Rookie"}
          </div>
          <span className="text-[#0F172A]">{currentLevelXpProgress}/{pointsPerLevelThreshold} XP</span>
        </div>

        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] transition-all duration-500"
            style={{ width: `${calculatedProgressPercentage}%` }}
          />
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] font-bold text-[#0F172A]">
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-lg p-1.5 shadow-sm justify-center">
            <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500 shrink-0" />
            <span className="truncate">{user?.streak || 0} Days</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-lg p-1.5 shadow-sm justify-center">
            <Trophy className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
            <span className="truncate uppercase">{user?.targetExam ? user.targetExam.split("_")[0] : "JEE"}</span>
          </div>
        </div>
      </div>

      {/* FIXED SCROLL ZONE CONTAINER */}
      <div 
        className="flex-1 overflow-y-auto my-3 pr-1 space-y-0.5
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-transparent
          group-hover/sidebar:[&::-webkit-scrollbar-thumb]:bg-slate-200
          hover:[&::-webkit-scrollbar-thumb]:!bg-slate-300
          transition-all duration-300"
      >
        <nav className="flex flex-col gap-1 pr-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold shadow-md shadow-indigo-500/10"
                    : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] hover:translate-x-0.5"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F8FAFC] border border-[#E2E8F0] group-[.active]:bg-white/10 group-[.active]:border-transparent group-hover:bg-white group-hover:border-slate-300 group-hover:shadow-sm group-[.active]:group-hover:bg-white/10 group-[.active]:group-hover:border-transparent group-[.active]:group-hover:shadow-none transition-all duration-200">
                  <item.icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="text-xs font-semibold tracking-tight">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-[.active]:opacity-80 group-[.active]:translate-x-0 transition-all duration-200" />
            </NavLink>
          ))}

          {/* ✅ NEW: PREMIUM USER EXPERIENCE LOGOUT BUTTON ROW */}
          <button
            onClick={handleLogoutAction}
            className="w-full group mt-2 flex items-center justify-between rounded-xl px-3 py-2.5 text-red-500 hover:bg-red-50/60 active:scale-[0.98] transition-all duration-150 border border-transparent hover:border-red-100"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 border border-red-100 group-hover:bg-white transition-all">
                <LogOut className="h-3.5 w-3.5 text-red-500 transition-transform group-hover:rotate-6" />
              </div>
              <span className="text-xs font-bold tracking-tight">
                Logout 
              </span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
          </button>
        </nav>
      </div>

      <div className="flex-shrink-0 h-2" />

      {/* Premium Conversion Loop Action Block */}
      <div className="rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-4 text-white shadow-xl relative overflow-hidden flex-shrink-0">
        <div className="absolute -right-4 -bottom-4 w-14 h-14 bg-white/[0.02] rounded-full blur-xl pointer-events-none" />
        
        <div className="inline-flex rounded-md bg-white/10 px-2 py-0.5 text-[8px] font-black tracking-widest uppercase border border-white/5">
          PREMIUM
        </div>
        <h3 className="mt-2 text-xs font-black leading-tight text-white tracking-tight">
          Unlock AI Mentor & Deep Analytics
        </h3>
        <p className="mt-1 text-[10px] text-slate-400 leading-normal">
          Access advanced rank projections and automated revision maps.
        </p>
        <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#2563EB] py-2 text-xs font-bold text-white shadow-md transition-transform active:scale-[0.99] hover:opacity-95">
          Upgrade Plan
        </button>
      </div>

    </aside>
  );
}