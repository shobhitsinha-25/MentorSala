export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="py-20 px-6 bg-[#F7F5FF]"
    >

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="relative inline-flex items-center justify-center rounded-full mb-5">
  {/* The Ring Animation Layer (Stays behind, text won't fade) */}
  <div className="absolute inset-0 rounded-full animate-pulse ring-3 ring-[#4d4dff] bg-[#ccccff]"></div>

  {/* Your Original Div Layer (Text and background remain completely solid) */}
  <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#7C3AED] shadow-sm">
    PLATFORM FEATURES
  </div>
</div>

          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">

            Everything You Need
            <br />

            To Crack Your Exam

          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base text-[#64748B] leading-relaxed">

            Smart tools, live mentorship, analytics,
            and gamified systems designed for modern aspirants.

          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {[
            {
              icon: "🤖",
              title: "AI-Powered Learning",
              desc:
                "Personalised plans adapting to strengths and weak areas in real time.",
              iconBg:
                "bg-blue-100",
              iconColor:
                "text-blue-600",
              border:
                "hover:border-blue-400",
              shadow:
                "hover:shadow-blue-100",
            },

            {
              icon: "📡",
              title: "Live Interactive Classes",
              desc:
                "Join live sessions, ask doubts, and get instant mentor guidance.",
              iconBg:
                "bg-purple-100",
              iconColor:
                "text-purple-600",
              border:
                "hover:border-purple-400",
              shadow:
                "hover:shadow-purple-100",
            },

            {
              icon: "🎮",
              title: "Gamified Progress",
              desc:
                "Earn XP, unlock achievements, and climb leaderboards daily.",
              iconBg:
                "bg-yellow-100",
              iconColor:
                "text-yellow-600",
              border:
                "hover:border-yellow-400",
              shadow:
                "hover:shadow-yellow-100",
            },

            {
              icon: "📊",
              title: "Deep Analytics",
              desc:
                "Track performance, identify weak areas, and predict ranks.",
              iconBg:
                "bg-green-100",
              iconColor:
                "text-green-600",
              border:
                "hover:border-green-400",
              shadow:
                "hover:shadow-green-100",
            },

            {
              icon: "💬",
              title: "Peer Community",
              desc:
                "50,000+ students discussing problems and sharing resources.",
              iconBg:
                "bg-cyan-100",
              iconColor:
                "text-cyan-600",
              border:
                "hover:border-cyan-400",
              shadow:
                "hover:shadow-cyan-100",
            },

            {
              icon: "🧑‍🏫",
              title: "Expert Mentors",
              desc:
                "1-on-1 mentorship from IIT and AIIMS alumni mentors.",
              iconBg:
                "bg-red-100",
              iconColor:
                "text-red-600",
              border:
                "hover:border-red-400",
              shadow:
                "hover:shadow-red-100",
            },
          ].map((feature) => (

            <div
              key={feature.title}
              className={`group rounded-[26px] border border-[#E8E5F5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.border} ${feature.shadow}`}
            >

              {/* Icon */}
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.iconBg} ${feature.iconColor}`}
              >

                {feature.icon}

              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-[#0F172A] leading-snug mb-4">

                {feature.title}

              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#64748B]">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}