export default function GamificationSection() {

  return (

    <section
      id="gamification"
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
    GAMIFICATION SYSTEM
  </div>
</div>

          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">

            Learning that feels
            <br />

            like a game

          </h2>

          <p className="mt-5 text-[#64748B] text-lg">

            Earn XP, maintain streaks,
            climb leaderboards and stay motivated daily.

          </p>

        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left */}
          <div className="rounded-[30px] border border-[#1E293B] bg-[#0B1120] p-8 shadow-[0_0_30px_rgba(59,130,246,0.08)]">

            <div className="mb-8">

              <h3 className="text-3xl font-black text-white">

                Earn XP Daily

              </h3>

              <p className="mt-3 text-[#94A3B8]">

                Every productive action
                moves you closer to the top ranks.

              </p>

            </div>

            {/* XP Actions */}
            <div className="space-y-4">

              {[
                {
                  action: "Watch Lecture",
                  xp: "+50 XP",
                  icon: "🎥",
                },

                {
                  action: "Complete Quiz",
                  xp: "+75 XP",
                  icon: "📝",
                },

                {
                  action: "Daily Login",
                  xp: "+20 XP",
                  icon: "🔥",
                },

                {
                  action: "Finish Assignment",
                  xp: "+100 XP",
                  icon: "📚",
                },

                {
                  action: "Solve Doubt",
                  xp: "+30 XP",
                  icon: "💡",
                },
              ].map((item) => (

                <div
                  key={item.action}
                  className="flex items-center justify-between rounded-2xl border border-[#1E293B] bg-[#111827] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E293B] text-2xl">

                      {item.icon}

                    </div>

                    <div>

                      <h4 className="text-lg font-bold text-white">

                        {item.action}

                      </h4>

                    </div>

                  </div>

                  <div className="text-lg font-black text-[#60A5FA]">

                    {item.xp}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Right */}
          <div className="rounded-[30px] border border-[#1E293B] bg-[#0B1120] p-8 shadow-[0_0_30px_rgba(59,130,246,0.08)]">

            <div className="mb-8 flex items-center justify-between">

              <div>

                <h3 className="text-3xl font-black text-white">

                  Live Leaderboard

                </h3>

                <p className="mt-2 text-[#94A3B8]">

                  Compete with top aspirants nationwide.

                </p>

              </div>

              <div className="rounded-full bg-[#1D4ED8]/20 px-4 py-2 text-xs font-semibold text-[#60A5FA]">

                LIVE

              </div>

            </div>

            {/* Leaderboard */}
            <div className="space-y-4">

              {[
                {
                  rank: "🥇",
                  name: "Rahul Sharma",
                  exam: "JEE 2026",
                  change: "▲ 2",
                  xp: "4280 XP",
                },

                {
                  rank: "🥈",
                  name: "Priya Verma",
                  exam: "NEET 2027",
                  change: "▲ 1",
                  xp: "4010 XP",
                },

                {
                  rank: "🥉",
                  name: "Arjun Das",
                  exam: "WBJEE 2026",
                  change: "▼ 1",
                  xp: "3890 XP",
                },

                {
                  rank: "4️⃣",
                  name: "Sneha Roy",
                  exam: "JEE 2027",
                  change: "▲ 3",
                  xp: "3700 XP",
                },

                {
                  rank: "5️⃣",
                  name: "Aman Gupta",
                  exam: "NEET 2026",
                  change: "▲ 1",
                  xp: "3520 XP",
                },
              ].map((item) => (

                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-[#1E293B] bg-[#111827] px-5 py-4 transition-all duration-300 hover:border-[#3B82F6]"
                >

                  <div className="flex items-center gap-4">

                    <div className="text-2xl">

                      {item.rank}

                    </div>

                    <div>

                      <h4 className="font-bold text-white">

                        {item.name}

                      </h4>

                      <p className="text-sm text-[#94A3B8]">

                        {item.exam}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <div className="text-sm font-semibold text-green-400">

                      {item.change}

                    </div>

                    <div className="text-lg font-black text-[#60A5FA]">

                      {item.xp}

                    </div>

                  </div>

                </div>

              ))}

              {/* YOU */}
              <div className="flex items-center justify-between rounded-2xl border border-[#3B82F6] bg-[#1D4ED8]/10 px-5 py-4 shadow-[0_0_20px_rgba(59,130,246,0.18)]">

                <div className="flex items-center gap-4">

                  <div className="text-2xl">

                    ⭐

                  </div>

                  <div>

                    <h4 className="font-bold text-white">

                      You

                    </h4>

                    <p className="text-sm text-[#94A3B8]">

                      JEE 2027

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-sm font-semibold text-green-400">

                    ▲ 12

                  </div>

                  <div className="text-lg font-black text-[#60A5FA]">

                    2840 XP

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}