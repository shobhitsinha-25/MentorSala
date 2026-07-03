import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Brain,
  CreditCard,
  BookOpen,
  FolderTree,
  FileText,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

const items = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },

  // ===========================
  // ACADEMIC
  // ===========================

  {
    label: "Subjects",
    icon: BookOpen,
    path: "/admin/subjects",
  },

  {
    label: "Chapters",
    icon: FolderTree,
    path: "/admin/chapters",
  },

  // ===========================
  // QUESTION BANK
  // ===========================

  {
    label: "Question Bank",
    icon: Brain,
    path: "/admin/questions",
  },

  // ===========================
  // TESTS
  // ===========================

  {
    label: "Tests",
    icon: FileText,
    path: "/admin/tests",
  },

  // ===========================
  // USERS
  // ===========================

  {
    label: "Mentors",
    icon: GraduationCap,
    path: "/admin/mentors",
  },

  {
    label: "Students",
    icon: Users,
    path: "/admin/students",
  },

  // ===========================
  // SUBSCRIPTION
  // ===========================

  {
    label: "Plans",
    icon: CreditCard,
    path: "/admin/plans",
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-72 bg-[#020617] border-r border-white/[0.05] h-screen flex flex-col justify-between select-none shrink-0 relative z-20">
      {/* PRE-RENDERED GLOW EFFECT */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

      <div>
        {/* BRAND IDENTITY BANNER */}
        <div className="p-8 relative z-10">
          <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white text-lg">M</span>
            </div>
            MentorSala
          </h1>
          <div className="inline-flex items-center mt-4 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            <div className="w-1 h-1 rounded-full bg-rose-500 mr-2 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.1em] text-rose-400 uppercase">
              Admin Control
            </span>
          </div>
        </div>

        {/* NAVIGATION TRACK RACK */}
        <nav className="px-4 mt-2 space-y-1.5 relative z-10">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 h-12 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 group relative
                  ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-400 shadow-[inset_0_0_20px_rgba(79,70,229,0.05)] border border-indigo-500/20"
                      : "text-slate-500 border border-transparent hover:text-slate-200 hover:bg-white/[0.03] hover:border-white/[0.05]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* ACTIVE INDICATOR GLOW */}
                    {isActive && (
                      <div className="absolute -left-4 w-1.5 h-6 rounded-r-full bg-indigo-500 shadow-[4px_0_15px_rgba(79,70,229,0.4)]" />
                    )}
                    
                    <Icon 
                      size={18} 
                      className={`shrink-0 transition-all duration-300 
                        ${isActive ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]" : "group-hover:text-indigo-400"}`} 
                    />
                    
                    <span className="truncate">{item.label}</span>
                    
                    {/* HOVER TOOLTIP EFFECT (OPTIONAL) */}
                    {!isActive && (
                      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-1 h-1 rounded-full bg-indigo-500" />
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* FOOTER SYSTEM STATUS */}
      <div className="p-6">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block">
                Server Status
              </span>
              <span className="text-[11px] font-black text-slate-200">
                Operational
              </span>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-3 h-3 bg-emerald-500/20 rounded-full animate-ping" />
              <div className="relative w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;