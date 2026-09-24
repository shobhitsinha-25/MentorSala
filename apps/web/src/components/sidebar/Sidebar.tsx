import {
  LayoutDashboard,
  Trophy,
  Users,
  ChevronRight,
  ChevronDown,
  UserRound,
  Flame,
  LogOut,
  Calendar,
  CreditCard,
  FileText,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuthStore } from "../../store/auth.store";
import mentorsalalogo from "../../assets/logo1.png";

// ==========================================
// SMOOTH ORGANIC LIQUID WAVE CANVAS (WHITE, PURPLE & DEEP BLUE)
// ==========================================

function SidebarLiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent?.clientWidth || 300;
      height = parent?.clientHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let step = 0;

    // Harmonized smooth wave layers blending rich royal deep blue with royal purple & clean highlights
    const waves = [
      {
        speed: 0.0035,
        wavelength: 0.0045,
        amplitude: 40,
        baseY: 0.44,
        colorStart: "rgba(147, 51, 234, 0.45)", // purple-600
        colorEnd: "rgba(30, 58, 138, 0.75)",    // deep blue (blue-900)
      },
      {
        speed: 0.0048,
        wavelength: 0.0062,
        amplitude: 34,
        baseY: 0.52,
        colorStart: "rgba(168, 85, 247, 0.35)", // purple-500
        colorEnd: "rgba(29, 78, 216, 0.60)",    // blue-700
      },
      {
        speed: 0.0028,
        wavelength: 0.0036,
        amplitude: 48,
        baseY: 0.60,
        colorStart: "rgba(126, 34, 206, 0.55)", // purple-700
        colorEnd: "rgba(15, 23, 42, 0.85)",     // deep slate/midnight blue
      },
      {
        speed: 0.0042,
        wavelength: 0.0075,
        amplitude: 26,
        baseY: 0.68,
        colorStart: "rgba(216, 180, 254, 0.30)", // purple-300
        colorEnd: "rgba(30, 64, 175, 0.70)",    // blue-800
      },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        const stepX = 6;
        for (let x = 0; x <= width + stepX; x += stepX) {
          const mainWave =
            Math.sin(
              x * wave.wavelength +
              step * wave.speed +
              i * 1.8
            ) * wave.amplitude;

          const harmonic =
            Math.cos(
              x * (wave.wavelength * 0.55) +
              step * (wave.speed * 0.75)
            ) * (wave.amplitude * 0.45);

          const y = height * wave.baseY + mainWave + harmonic;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(
          0,
          height * (wave.baseY - 0.2),
          width,
          height
        );
        grad.addColorStop(0, wave.colorStart);
        grad.addColorStop(1, wave.colorEnd);

        ctx.fillStyle = grad;
        ctx.fill();
      });

      step += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 h-full w-full opacity-85 filter blur-[32px]"
    />
  );
}

// ==========================================
// XP LEVEL CONFIGURATION
// ==========================================

const XP_LEVELS = [
  {
    name: "Rookie",
    minXP: 0,
    maxXP: 500,
  },
  {
    name: "Learner",
    minXP: 501,
    maxXP: 1500,
  },
  {
    name: "Scholar",
    minXP: 1501,
    maxXP: 3000,
  },
  {
    name: "Gold Scholar",
    minXP: 3001,
    maxXP: 6000,
  },
  {
    name: "Expert",
    minXP: 6001,
    maxXP: 10000,
  },
  {
    name: "Champion",
    minXP: 10001,
    maxXP: 18000,
  },
  {
    name: "Grandmaster",
    minXP: 18001,
    maxXP: 30000,
  },
  {
    name: "Legend",
    minXP: 30001,
    maxXP: Infinity,
  },
];

// ==========================================
// GET XP PROGRESS
// ==========================================

const getXPProgress = (xp: number) => {
  const currentXP = Math.max(0, xp);

  const currentLevel =
    XP_LEVELS.find(
      (level) =>
        currentXP >= level.minXP &&
        currentXP <= level.maxXP
    ) || XP_LEVELS[XP_LEVELS.length - 1];

  if (currentLevel.name === "Legend") {
    return {
      currentXP,
      currentLevel: currentLevel.name,
      levelStartXP: currentLevel.minXP,
      levelEndXP: null,
      progressXP: currentXP - currentLevel.minXP,
      requiredXP: null,
      progressPercentage: 100,
      isMaxLevel: true,
    };
  }

  const progressXP = currentXP - currentLevel.minXP;
  const requiredXP = currentLevel.maxXP - currentLevel.minXP + 1;
  const progressPercentage = Math.min(
    100,
    Math.max(0, Math.round((progressXP / requiredXP) * 100))
  );

  return {
    currentXP,
    currentLevel: currentLevel.name,
    levelStartXP: currentLevel.minXP,
    levelEndXP: currentLevel.maxXP,
    progressXP,
    requiredXP,
    progressPercentage,
    isMaxLevel: false,
  };
};

// ==========================================
// MAIN SIDEBAR
// ==========================================

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showAllNav, setShowAllNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) {
      setCollapsed(saved === "true");
    }
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
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
      label: "Dashboard",
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
      label: "Profile",
      icon: UserRound,
      path: "/student/profile",
    },
    {
      label: "Plans",
      icon: CreditCard,
      path: "/student/plans",
    },
  ];

  const visibleNavItems = showAllNav ? navItems : navItems.slice(0, 5);
  const totalPoints = user?.xp ?? 0;
  const xpProgress = getXPProgress(totalPoints);

  const handleLogoutAction = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* ===========================
          MOBILE TOP NAVBAR TRIGGER
      ============================ */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-indigo-100 bg-white/95 px-4 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2.5">
          <img
            src={mentorsalalogo}
            alt="MentorSala Logo"
            className="h-6 w-6 rounded-full object-cover shadow-xs"
          />
          <h1 className="text-base font-black tracking-tight text-slate-900">
            Mentor
            <span className="bg-gradient-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent">
              Sala
            </span>
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-200 bg-purple-50/60 text-indigo-950 active:scale-95"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ===========================
          MOBILE BACKDROP OVERLAY
      ============================ */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-45 bg-[#0b1329]/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ===========================
          RESPONSIVE ASIDE SIDEBAR
      ============================ */}
      <aside
        className={`
          fixed md:relative
          top-0 bottom-0 right-0 md:right-auto md:left-0
          z-50 md:z-30
          flex
          h-full
          max-h-screen
          shrink-0
          flex-col
          overflow-visible
          border-l md:border-l-0 md:border-r
          border-indigo-900/40
          bg-[#0d162d]/90
          backdrop-blur-3xl
          shadow-2xl
          select-none
          transition-all
          duration-300
          ease-in-out
          group/sidebar
          ${
            mobileOpen
              ? "translate-x-0 w-[280px] p-4 pt-6"
              : "translate-x-full md:translate-x-0"
          }
          ${
            collapsed
              ? "md:w-[76px] lg:w-[80px] md:px-2.5 lg:px-3 md:py-4 lg:py-5"
              : "md:w-[260px] lg:w-[300px] md:px-4 lg:px-5 md:py-4 lg:py-5"
          }
        `}
      >
        {/* ===========================
            WHITE, PURPLE & DEEP BLUE GRADIENT CANVAS
        ============================ */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-white/95 via-[#131d3d]/90 to-[#090e21]">
          <SidebarLiquidBackground />

          <div className="absolute -top-14 -left-14 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 -right-16 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl animate-pulse"
            style={{
              animationDuration: "5s",
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute -bottom-12 left-1/4 h-72 w-72 rounded-full bg-purple-700/35 blur-3xl animate-pulse"
            style={{
              animationDuration: "7s",
              animationDelay: "2s",
            }}
          />
        </div>

        {/* ===========================
            SIDEBAR TOGGLE
        ============================ */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="
            hidden md:flex
            absolute
            -right-3.5
            top-1/2
            -translate-y-1/2
            z-40
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-purple-400/40
            bg-[#101a3b]
            text-purple-200
            shadow-lg
            shadow-purple-950/40
            transition-all
            duration-300
            ease-out
            hover:bg-gradient-to-r
            hover:from-purple-600
            hover:to-blue-700
            hover:text-white
            hover:border-purple-300
            hover:scale-110
            hover:shadow-purple-500/30
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
            collapsed ? "justify-center" : "justify-between"
          } px-1 flex-shrink-0`}
        >
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <img
                src={mentorsalalogo}
                alt="MentorSala Logo"
                className="h-6 w-6 lg:h-7 lg:w-7 shrink-0 object-contain drop-shadow-sm"
              />
              <div>
                <h1 className="text-lg lg:text-xl font-black tracking-tight text-slate-950 drop-shadow-xs">
                  Mentor
                  <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                    Sala
                  </span>
                </h1>
                <p className="mt-0.5 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  AI Powered Learning Platform
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <img
                src={mentorsalalogo}
                alt="MentorSala Logo"
                className="h-7 w-7 lg:h-8 lg:w-8 rounded-full object-cover drop-shadow-xs"
              />
            </div>
          )}
        </div>

        {/* ===========================
              PROFILE CARD
        ============================ */}
        <div
          className={`mt-3 lg:mt-4 rounded-2xl border border-white/15 bg-[#121c3b]/85 backdrop-blur-xl shadow-xl shadow-black/30 flex-shrink-0 transition-all duration-300 ${
            collapsed ? "p-1.5 lg:p-2" : "p-2.5 lg:p-3"
          }`}
        >
          <div
            className={`flex ${
              collapsed ? "justify-center" : "items-center gap-2.5"
            }`}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-8 w-8 lg:h-10 lg:w-10 shrink-0 rounded-xl object-cover ring-2 ring-purple-400/40 shadow-sm transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-8 w-8 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-[10px] lg:text-xs font-black text-white shadow-sm ring-1 ring-white/20 transition-transform duration-300 hover:scale-105">
                {getInitials(user?.name || "Student")}
              </div>
            )}

            {!collapsed && (
              <div className="min-w-0 flex-1 overflow-hidden">
                <h2 className="truncate text-xs font-bold text-white leading-tight">
                  {user?.name || "Loading Profile..."}
                </h2>
                <p className="mt-0.5 truncate text-[9px] lg:text-[10px] font-medium uppercase tracking-wider text-purple-200/80">
                  {user?.targetExam
                    ? `${user.targetExam.split("_")[0]} Aspirant`
                    : "Aspirant"}
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <>
              {/* =====================================
                  XP / LEVEL
              ====================================== */}
              <div className="mt-2 lg:mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 lg:pt-2.5 text-[9px] lg:text-[10px] font-bold">
                <div className="rounded-md bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 text-purple-200 uppercase tracking-wide">
                  {xpProgress.currentLevel}
                </div>
                <span className="text-blue-100/90 font-medium">
                  {xpProgress.isMaxLevel
                    ? `${xpProgress.currentXP} XP`
                    : `${xpProgress.progressXP}/${xpProgress.requiredXP} XP`}
                </span>
              </div>

              {/* =====================================
                  XP PROGRESS BAR
              ====================================== */}
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0a1126] border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transition-all duration-500 shadow-sm"
                  style={{
                    width: `${xpProgress.progressPercentage}%`,
                  }}
                />
              </div>

              {/* =====================================
                  STREAK + EXAM
              ====================================== */}
              <div className="mt-2 lg:mt-2.5 grid grid-cols-2 gap-1.5 lg:gap-2 text-[10px] lg:text-[11px] font-semibold text-white">
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#0c1533]/80 p-1 lg:p-1.5 shadow-xs transition-transform duration-200 hover:scale-[1.02]">
                  <Flame className="h-3.5 w-3.5 fill-orange-400 text-orange-400 shrink-0 drop-shadow-xs" />
                  <span className="truncate text-slate-200">
                    {user?.streak || 0} Days
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#0c1533]/80 p-1 lg:p-1.5 shadow-xs transition-transform duration-200 hover:scale-[1.02]">
                  <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0 drop-shadow-xs" />
                  <span className="truncate uppercase text-slate-200">
                    {user?.targetExam
                      ? user.targetExam.split("_")[0]
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
            my-2 lg:my-3
            pr-1
            space-y-0.5
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-transparent
            group-hover/sidebar:[&::-webkit-scrollbar-thumb]:bg-white/20
            hover:[&::-webkit-scrollbar-thumb]:!bg-white/40
            transition-all
            duration-300
          "
        >
          <nav className="flex flex-col gap-1 pr-0.5">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                title={collapsed ? item.label : ""}
                className={({ isActive }) => `
                  group
                  flex
                  items-center
                  ${
                    collapsed
                      ? "justify-center px-2 py-2.5 lg:py-3"
                      : "justify-between px-2.5 lg:px-3 py-2 lg:py-2.5"
                  }
                  rounded-xl
                  transition-all
                  duration-200
                  active:scale-[0.98]
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 text-white font-bold shadow-lg shadow-purple-950/50 border border-purple-300/40"
                      : "text-slate-200 hover:bg-white/10 hover:text-white hover:border-white/15 border border-transparent hover:translate-x-0.5"
                  }
                `}
              >
                <div
                  className={`flex items-center ${
                    collapsed ? "" : "gap-2.5"
                  }`}
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/15
                      bg-white/10
                      text-purple-200
                      transition-all
                      duration-300
                      group-hover:rotate-6
                      group-hover:bg-purple-600/30
                      group-hover:border-purple-300/40
                      group-hover:text-white
                      group-[.active]:bg-white/25
                      group-[.active]:border-white/40
                      group-[.active]:text-white
                    "
                  >
                    <item.icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
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
                      group-[.active]:opacity-90
                      group-[.active]:translate-x-0
                      transition-all
                      duration-200
                    "
                  />
                )}
              </NavLink>
            ))}

            {/* ========================================
                EXPAND / COLLAPSE
            ======================================== */}
            {navItems.length > 5 && (
              <div className="flex w-full items-center justify-center py-1">
                <button
                  type="button"
                  onClick={() => setShowAllNav((prev) => !prev)}
                  aria-label={
                    showAllNav ? "Collapse options" : "Expand options"
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-purple-200 hover:bg-purple-500/25 hover:text-white hover:border-purple-300/40 active:scale-95 transition-all duration-200 backdrop-blur-md shadow-xs"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      showAllNav ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
            )}

            {/* ========================================
                LOGOUT
            ======================================== */}
            <button
              onClick={handleLogoutAction}
              title={collapsed ? "Logout" : ""}
              className={`
                w-full
                group
                mt-1.5 lg:mt-2
                flex
                items-center
                ${
                  collapsed
                    ? "justify-center px-2 py-2.5 lg:py-3"
                    : "justify-between px-2.5 lg:px-3 py-2 lg:py-2.5"
                }
                rounded-xl
                text-rose-300
                hover:text-white
                hover:bg-rose-500/20
                border
                border-transparent
                hover:border-rose-400/30
                active:scale-[0.98]
                transition-all
                duration-150
              `}
            >
              <div
                className={`flex items-center ${
                  collapsed ? "" : "gap-2.5"
                }`}
              >
                <div
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-rose-500/15
                    border
                    border-rose-400/20
                    group-hover:bg-rose-500
                    group-hover:text-white
                    transition-all
                    duration-300
                    group-hover:rotate-12
                  "
                >
                  <LogOut className="h-3.5 w-3.5 text-rose-400 group-hover:text-white transition-transform group-hover:rotate-6" />
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
                    group-hover:opacity-75
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
      </aside>
    </>
  );
}