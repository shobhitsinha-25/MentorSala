import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Brain,
  CreditCard,
  BookOpen,
  FolderTree,
  FileText,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../../lib/axios";

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

  const navigate = useNavigate();

const handleLogout = async () => {

  try {

    await api.post("/admin-auth/logout");

    toast.success("Logged out successfully");

    navigate("/admin/login", {
      replace: true,
    });

  } catch {

    toast.error("Logout failed");

  }

};
  return (
    /* 
      FIX: Sidebar uses 'h-full' to stretch matching the locked parent window framework layout matrix context. 
      Added 'overflow-y-auto' as a safety constraint in case nav items exceed small monitor bounds.
    */
    <aside className="w-72 bg-[#020617] border-r border-white/[0.05] h-full overflow-y-auto flex flex-col justify-between select-none shrink-0 relative z-20">
      {/* PRE-RENDERED GLOW EFFECT */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

      <div>
        {/* BRAND IDENTITY BANNER */}
        <div className="px-1 flex-shrink-0 ml-3 mt-2">
        <h1 className="text-xl font-black tracking-tight text-white">
          Mentor
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
            Sala
          </span>
        </h1>
        <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mt-0.5">
          AI Powered Learning Platform
        </p>
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

      {/* FOOTER */}
      <div className="p-6 space-y-4 relative z-10">

        {/* Server Status */}

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

        {/* Logout */}

        <button

          onClick={handleLogout}

          className="w-full h-12 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-red-400 font-bold"

        >

          <LogOut size={18} />

          Logout

        </button>

      </div>
    </aside>
  );
};

export default AdminSidebar;