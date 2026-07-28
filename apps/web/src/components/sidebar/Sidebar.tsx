import {
  LayoutDashboard,
  Trophy,
  Users,
  ChevronRight,
  UserRound,
  Flame,
  LogOut,
  Calendar,
  CreditCard,
  FileText,
  Sparkles,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { useAuthStore } from "../../store/auth.store";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");

    if (saved) {
      setCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const next = !collapsed;

    setCollapsed(next);

    localStorage.setItem(
      "sidebar-collapsed",
      String(next)
    );
  };

  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

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
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: "/student/dashboard",
    },
    {
      label: "Book Session",
      icon: Users,
      path: "/student/book-session",
    },
    {
      label: "My Sessions",
      icon: Calendar,
      path: "/student/my-sessions",
    },
    {
      label: "Tests",
      icon: FileText,
      path: "/student/tests",
    },
    {
      label: "Subscriptions",
      icon: CreditCard,
      path: "/student/subscriptions",
    },
    {
      label: "Profile",
      icon: UserRound,
      path: "/student/profile",
    },
  ];

  const totalPoints = user?.xp || 0;

  const pointsPerLevelThreshold = 1000;

  const currentLevelXpProgress =
    totalPoints % pointsPerLevelThreshold;

  const calculatedProgressPercentage = Math.round(
    (currentLevelXpProgress /
      pointsPerLevelThreshold) *
      100
  );

  const handleLogoutAction = async () => {
    await logoutUser();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside
      className={`
        flex
        h-full
        max-h-screen
        shrink-0
        flex-col
        overflow-visible
        border-r
        border-[#E2E8F0]
        bg-white
        text-[#0F172A]
        select-none
        transition-all
        duration-300
        ease-in-out
        relative
        z-30
        group/sidebar
        ${
          collapsed
            ? "w-[80px] px-3 py-5"
            : "w-[300px] px-5 py-5"
        }
      `}
    >
      {/* ===========================
            ANIMATED FLOATING TOGGLE BUTTON
      ============================ */}

      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="
          absolute
          -right-3.5
          top-1/2
          -translate-y-1/2
          z-40
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          border-[#E2E8F0]
          bg-white
          text-[#64748B]
          shadow-md
          transition-all
          duration-300
          ease-out
          hover:bg-[#F8FAFC]
          hover:text-[#0F172A]
          hover:scale-115
          hover:shadow-lg
          active:scale-90
          cursor-pointer
          group/toggle
        "
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-300 ease-in-out group-hover/toggle:scale-110 ${
            collapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* ===========================
            HEADER / LOGO
      ============================ */}

      <div
        className={`flex items-start ${
          collapsed
            ? "justify-center"
            : "justify-between"
        } px-1 flex-shrink-0`}
      >
        {!collapsed ? (
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#0F172A]">
              Mentor
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                Sala
              </span>
            </h1>

            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
              AI Powered Learning Platform
            </p>
          </div>
        ) : (
          <div className="text-xl font-black">
            <span className="bg-gradient-to-r from-[#000000] to-[#8080ff] bg-clip-text text-transparent">
              MS
            </span>
          </div>
        )}
      </div>

      {/* ===========================
            PROFILE CARD
      ============================ */}

      <div
        className={`mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-xs flex-shrink-0 transition-all duration-300 ${
          collapsed ? "p-2" : "p-3"
        }`}
      >
        <div
          className={`flex ${
            collapsed
              ? "justify-center"
              : "items-center gap-2.5"
          }`}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-10 w-10 shrink-0 rounded-lg object-cover ring-2 ring-[#7C3AED]/10 shadow-xs transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-xs font-black text-white shadow-xs transition-transform duration-300 hover:scale-105">
              {getInitials(
                user?.name || "Student"
              )}
            </div>
          )}

          {!collapsed && (
            <div className="min-w-0 flex-1 overflow-hidden">
              <h2 className="truncate text-xs font-black text-[#0F172A] leading-tight">
                {user?.name ||
                  "Loading Profile..."}
              </h2>

              <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                {user?.targetExam
                  ? `${user.targetExam.split("_")[0]} Aspirant`
                  : "Aspirant"}
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <>
            <div className="mt-2.5 flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 text-[10px] font-bold">
              <div className="rounded-md bg-[#7C3AED]/10 px-2 py-0.5 text-[#7C3AED] uppercase">
                {user?.level || "Rookie"}
              </div>

              <span className="text-[#0F172A]">
                {currentLevelXpProgress}/{pointsPerLevelThreshold} XP
              </span>
            </div>

            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] transition-all duration-500"
                style={{
                  width: `${calculatedProgressPercentage}%`,
                }}
              />
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] font-bold text-[#0F172A]">
              <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white p-1.5 shadow-xs transition-transform duration-200 hover:scale-[1.02]">
                <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500 shrink-0" />
                <span className="truncate">
                  {user?.streak || 0} Days
                </span>
              </div>

              <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white p-1.5 shadow-xs transition-transform duration-200 hover:scale-[1.02]">
                <Trophy className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
                <span className="truncate uppercase">
                  {user?.targetExam
                    ? user.targetExam.split(
                        "_"
                      )[0]
                    : "JEE"}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===========================
            NAVIGATION SCROLL ZONE
      ============================ */}

      <div
        className="
          flex-1
          overflow-y-auto
          my-3
          pr-1
          space-y-0.5
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-transparent
          group-hover/sidebar:[&::-webkit-scrollbar-thumb]:bg-slate-200
          hover:[&::-webkit-scrollbar-thumb]:!bg-slate-300
          transition-all
          duration-300
        "
      >
        <nav className="flex flex-col gap-1 pr-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              title={collapsed ? item.label : ""}
              className={({ isActive }) =>
                `
                group
                flex
                items-center
                ${
                  collapsed
                    ? "justify-center px-2 py-3"
                    : "justify-between px-3 py-2.5"
                }
                rounded-xl
                transition-all
                duration-200
                active:scale-[0.98]
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white font-bold shadow-md shadow-indigo-500/10"
                    : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] hover:translate-x-0.5"
                }
              `
              }
            >
              <div
                className={`flex items-center ${
                  collapsed
                    ? ""
                    : "gap-2.5"
                }`}
              >
                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-md
                    bg-[#F8FAFC]
                    border
                    border-[#E2E8F0]
                    transition-all
                    duration-300
                    group-hover:rotate-6
                    group-hover:rounded-lg
                    group-[.active]:bg-white/10
                    group-[.active]:border-transparent
                    group-hover:bg-white
                    group-hover:border-slate-300
                    group-hover:shadow-xs
                    group-[.active]:group-hover:bg-white/10
                    group-[.active]:group-hover:border-transparent
                    group-[.active]:group-hover:shadow-none
                  "
                >
                  <item.icon
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110"
                  />
                </div>

                {!collapsed && (
                  <span className="text-xs font-semibold tracking-tight">
                    {item.label}
                  </span>
                )}
              </div>

              {!collapsed && (
                <ChevronRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    -translate-x-1
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    group-[.active]:opacity-80
                    group-[.active]:translate-x-0
                    transition-all
                    duration-200
                  "
                />
              )}
            </NavLink>
          ))}

          {/* Logout Button */}

          <button
            onClick={handleLogoutAction}
            title={collapsed ? "Logout" : ""}
            className={`
              w-full
              group
              mt-2
              flex
              items-center
              ${
                collapsed
                  ? "justify-center px-2 py-3"
                  : "justify-between px-3 py-2.5"
              }
              rounded-xl
              text-red-500
              hover:bg-red-50/60
              border
              border-transparent
              hover:border-red-100
              active:scale-[0.98]
              transition-all
              duration-150
            `}
          >
            <div
              className={`flex items-center ${
                collapsed
                  ? ""
                  : "gap-2.5"
              }`}
            >
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-md
                  bg-red-50
                  border
                  border-red-100
                  group-hover:bg-white
                  transition-all
                  duration-300
                  group-hover:rotate-12
                  group-hover:rounded-lg
                "
              >
                <LogOut className="h-3.5 w-3.5 text-red-500 transition-transform group-hover:rotate-6" />
              </div>

              {!collapsed && (
                <span className="text-xs font-bold tracking-tight">
                  Logout
                </span>
              )}
            </div>

            {!collapsed && (
              <ChevronRight
                className="
                  h-3
                  w-3
                  opacity-0
                  -translate-x-1
                  group-hover:opacity-60
                  group-hover:translate-x-0
                  transition-all
                  duration-200
                "
              />
            )}
          </button>
        </nav>
      </div>

      <div className="flex-shrink-0 h-2" />

      {/* ==================================
            PREMIUM CARD
      ================================== */}

      {!collapsed && (
        <div className="rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-4 text-white shadow-xl relative overflow-hidden flex-shrink-0">
          <div className="absolute -right-4 -bottom-4 w-14 h-14 bg-white/[0.02] rounded-full blur-xl pointer-events-none" />

          <div className="inline-flex rounded-md bg-white/10 px-2 py-0.5 text-[8px] font-black tracking-widest uppercase border border-white/5 items-center gap-1">
            <Sparkles size={10} className="text-indigo-400 animate-pulse" />
            PREMIUM
          </div>

          <h3 className="mt-2 text-xs font-black leading-tight text-white tracking-tight">
            Unlock AI Mentor & Deep Analytics
          </h3>

          <p className="mt-1 text-[10px] text-slate-400 leading-normal">
            Access advanced rank projections, AI mentor guidance and personalised revision maps.
          </p>

          <button
            className="
              mt-3
              w-full
              rounded-lg
              bg-gradient-to-r
              from-[#7C3AED]
              to-[#2563EB]
              py-2
              text-xs
              font-bold
              text-white
              shadow-md
              transition-all
              duration-200
              hover:opacity-95
              hover:shadow-indigo-500/20
              hover:scale-[1.01]
              active:scale-[0.99]
            "
          >
            Upgrade Plan
          </button>
        </div>
      )}
    </aside>
  );
}