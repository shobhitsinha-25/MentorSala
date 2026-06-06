export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 px-6 overflow-hidden bg-[#F7F5FF]"
    >

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="relative inline-flex items-center justify-center rounded-full mb-5">
  {/* The Ring Animation Layer (Stays behind, text won't fade) */}
  <div className="absolute inset-0 rounded-full animate-pulse ring-3 ring-[#4d4dff] bg-[#ccccff]"></div>

  {/* Your Original Div Layer (Text and background remain completely solid) */}
  <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[#D9D4FF] bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#7C3AED] shadow-sm">
    HOW IT WORKS
  </div>
</div>

          <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">

            Three Steps To Your
            <br />

            Dream Rank

          </h2>

          <p className="mt-5 max-w-xl mx-auto text-base text-[#64748B] leading-relaxed">

            A simple system designed to guide students
            from confusion to confidence.

          </p>

        </div>

        {/* Process */}
        <div className="relative grid md:grid-cols-3 gap-6">

          {/* Connector */}
          <div className="hidden md:block absolute top-[90px] left-[22%] w-[56%] h-[2px] bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#06B6D4] opacity-20" />

          {[
            {
              step: "STEP 01",
              icon: "🎯",
              title: "Choose Your Goal",
              desc:
                "Select your target exam and preparation path.",

              visual: (
                <div className="mt-6 rounded-2xl border border-[#EEF0F7] bg-[#FAFBFF] p-4">

                  <div className="flex flex-wrap justify-center gap-2">

                    {[
                      "JEE",
                      "WBJEE",
                      "BOARD",
                    ].map((exam) => (

                      <div
                        key={exam}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold
                          
                          ${
                            exam === "JEE"
                              ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white"
                              : "bg-white border border-[#E8E5F5] text-[#64748B]"
                          }
                        `}
                      >

                        {exam}

                      </div>

                    ))}

                  </div>

                </div>
              ),
            },

            {
              step: "STEP 02",
              icon: "🧠",
              title: "AI Builds Your Plan",
              desc:
                "Daily schedule personalised for your weak areas.",

              visual: (
                <div className="mt-6 rounded-2xl border border-[#EEF0F7] bg-[#FAFBFF] p-4">

                  <div className="space-y-3">

                    {[
                      "Physics Revision",
                      "Mock Analysis",
                      "Organic Chemistry",
                    ].map((task) => (

                      <div
                        key={task}
                        className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm"
                      >

                        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB]" />

                        <span className="text-[#0F172A] font-medium text-xs">

                          {task}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>
              ),
            },

            {
              step: "STEP 03",
              icon: "🏆",
              title: "Learn & Compete",
              desc:
                "Attend classes, solve tests, and earn XP rewards.",

              visual: (
                <div className="mt-6 rounded-2xl border border-[#EEF0F7] bg-[#FAFBFF] p-4">

                  <div className="space-y-3">

                    {[
                      {
                        name: "Rahul",
                        xp: "4280",
                      },

                      {
                        name: "Priya",
                        xp: "3950",
                        className: "text-black",
                      },

                      {
                        name: "You",
                        xp: "2840",
                        className: "text-black",
                      },
                    ].map((user, index) => (

                      <div
                        key={user.name}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm
                          
                          ${
                            user.name === "You"
                              ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white"
                              : "bg-white shadow-sm"
                          }
                        `}
                      >

                        <div className="flex items-center gap-2">

                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold
                              
                              ${
                                user.name === "You"
                                  ? "bg-white/20 text-white"
                                  : "bg-[#EEF2FF] text-[#2563EB]"
                              }
                            `}
                          >

                            {index + 1}

                          </div>

                          <span
                              className={`font-medium text-xs ${
                                user.name === "You"
                                  ? "text-white"
                                  : "text-[#0F172A]"
                              }`}
                            >

                              {user.name}

                            </span>

                        </div>

                                                      <span
                                className={`font-bold text-xs ${
                                  user.name === "You"
                                    ? "text-white"
                                    : "text-[#0F172A]"
                                }`}
                              >

                                {user.xp} XP

                              </span>

                      </div>

                    ))}

                  </div>

                </div>
              ),
            },
          ].map((item) => (

            <div
              key={item.step}
              className="group relative rounded-[28px] border border-[#E8E5F5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(124,58,237,0.08)]"
            >

              {/* Step */}
              <div className="mb-5 inline-flex rounded-full bg-[#F3F0FF] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#7C3AED]">

                {item.step}

              </div>

              {/* Icon */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-3xl shadow-lg shadow-blue-500/10">

                {item.icon}

              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-[#0F172A] leading-snug">

                {item.title}

              </h3>

              {/* Description */}
              <p className="mt-4 text-[#64748B] text-sm leading-relaxed">

                {item.desc}

              </p>

              {/* Visual */}
              {item.visual}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}