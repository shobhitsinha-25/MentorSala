import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut,
  Calendar,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "../../store/auth.store";

const MentorSidebar = () => {
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  // =====================================================
  // NAVIGATION ITEMS
  // =====================================================

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/mentor/dashboard",
    },
    {
      label: "Availability Management",
      icon: CalendarDays,
      path: "/mentor/availability",
    },
    {
  label: "Sessions",
  icon: Calendar,
  path: "/mentor/sessions",
},
    {
      label: "Profile",
      icon: User,
      path: "/mentor/profile",
    },
  ];

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "accessToken"
    );

    logout();

    window.location.href =
      "/login";
  };

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-[260px]
        bg-white
        border-r
        border-[#E2E8F0]
        flex
        flex-col
        justify-between
        z-50
        shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        select-none
      "
    >
      {/* ================================================= */}
      {/* TOP SECTION */}
      {/* ================================================= */}

      <div>
        {/* ================================================= */}
        {/* LOGO (PERFECT SYMMETRY GRID) */}
        {/* ================================================= */}

        <div
          className="
            h-20
            flex
            flex-col
            justify-center
            px-6
            border-b
            border-[#F1F5F9]
            shrink-0
          "
        >
          <h1
            className="
              text-xl
              font-black
              tracking-tight
              text-[#0F172A]
              leading-none
            "
          >
            Mentor
            <span
              className="
                bg-gradient-to-r
                from-[#7C3AED]
                to-[#2563EB]
                bg-clip-text
                text-transparent
              "
            >
              Sala
            </span>
          </h1>

          <p
            className="
              text-[9px]
              font-black
              text-[#94A3B8]
              uppercase
              tracking-widest
              mt-1.5
              leading-none
            "
          >
            Mentor Dashboard
          </p>
        </div>

        {/* ================================================= */}
        {/* USER CARD (WITH INTERACTIVE VERIFIED MEDALLION) */}
        {/* ================================================= */}

        <div
          className="
            px-5
            py-5
            border-b
            border-[#F1F5F9]
            bg-[#F8FAFC]
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-10
                w-10
                rounded-xl
                bg-gradient-to-br
                from-[#7C3AED]
                to-[#2563EB]
                flex
                items-center
                justify-center
                text-sm
                font-black
                text-white
                shadow-md
                shadow-indigo-500/20
                shrink-0
              "
            >
              {user?.name
                ?.charAt(0)
                .toUpperCase() || "M"}
            </div>

            <div className="min-w-0">
              <h2
                className="
                  text-sm
                  font-bold
                  text-[#0F172A]
                  truncate
                  pr-1
                "
              >
                {user?.name || "Mentor"}
              </h2>

              <div className="flex items-center gap-1 mt-1">
                <svg 
                  className="h-3.5 w-3.5 text-[#2563EB] shrink-0 filter drop-shadow-[0_1px_2px_rgba(37,99,235,0.15)]" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p
                  className="
                    text-[10px]
                    font-black
                    text-[#64748B]
                    uppercase
                    tracking-wider
                    leading-none
                  "
                >
                  Verified Mentor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* NAVIGATION (HIGH VISIBILITY & ACTIVE FOCUS NOTCH) */}
        {/* ================================================= */}

        <nav
          className="
            p-3
            space-y-1
            mt-4
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-2.5
                  rounded-xl
                  transition-all
                  duration-200
                  text-xs
                  font-bold
                  relative
                  group
                  ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF] shadow-sm"
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] border border-transparent"
                  }
                `}
              >
                {/* Active Focus Structural Left Indicator Notch */}
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] rounded-r-md bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
                )}

                <Icon 
                  size={16} 
                  className={
                    isActive 
                      ? "text-[#4F46E5]" 
                      : "text-[#94A3B8] group-hover:text-[#64748B] transition-colors"
                  } 
                />

                <span className="tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================================================= */}
      {/* LOGOUT (BALANCED SPACING ACTION TRIGGER) */}
      {/* ================================================= */}

      <div
        className="
          p-3
          border-t
          border-[#F1F5F9]
          bg-[#F8FAFC]
        "
      >
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-red-50
            border
            border-red-100
            hover:bg-red-100
            hover:border-red-200
            text-red-600
            py-2.5
            rounded-xl
            text-xs
            font-bold
            tracking-wide
            transition-all
            active:scale-[0.98]
            shadow-sm
          "
        >
          <LogOut size={14} />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
};

export default MentorSidebar;