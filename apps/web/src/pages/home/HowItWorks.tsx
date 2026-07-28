export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 px-6 overflow-hidden bg-[#F8F9FE]"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-300/20 blur-[140px]" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">

        {/* Heading */}
        <div className="text-center mb-14">

          <div className="relative inline-flex items-center justify-center rounded-full mb-5">
            {/* The Ring Animation Layer */}
            <div className="absolute inset-0 rounded-full animate-pulse ring-2 ring-purple-400/50 bg-purple-200/40 blur-xs"></div>

            {/* Solid Glass Badge */}
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-md px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-purple-700 shadow-sm">
              HOW IT WORKS
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Three Steps To Your
            <br />
            Dream Rank
          </h2>

          <p className="mt-5 max-w-xl mx-auto text-base text-slate-600 leading-relaxed font-medium">
            A simple system designed to guide students
            from confusion to confidence.
          </p>

        </div>

        {/* Process */}
        <div className="relative grid md:grid-cols-3 gap-6">

          {/* Connector */}
          <div className="hidden md:block absolute top-[90px] left-[22%] w-[56%] h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-30" />

          {[
            {
              step: "STEP 01",
              icon: "🎯",
              title: "Choose Your Goal",
              desc:
                "Select your target exam and preparation path.",

              visual: (
                <div className="mt-6 rounded-2xl border border-purple-100/80 bg-purple-50/40 p-4 backdrop-blur-xs">

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
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                              : "bg-white border border-purple-100 text-slate-600"
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
                <div className="mt-6 rounded-2xl border border-purple-100/80 bg-purple-50/40 p-4 backdrop-blur-xs">

                  <div className="space-y-3">

                    {[
                      "Physics Revision",
                      "Mock Analysis",
                      "Organic Chemistry",
                    ].map((task) => (

                      <div
                        key={task}
                        className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-xs border border-purple-100/50"
                      >

                        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600" />

                        <span className="text-slate-800 font-semibold text-xs">

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
                <div className="mt-6 rounded-2xl border border-purple-100/80 bg-purple-50/40 p-4 backdrop-blur-xs">

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
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm"
                              : "bg-white shadow-xs border border-purple-100/50"
                          }
                        `}
                      >

                        <div className="flex items-center gap-2">

                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold
                              
                              ${
                                user.name === "You"
                                  ? "bg-white/20 text-white"
                                  : "bg-indigo-50 text-indigo-600"
                              }
                            `}
                          >

                            {index + 1}

                          </div>

                          <span
                            className={`font-semibold text-xs ${
                              user.name === "You"
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                          >

                            {user.name}

                          </span>

                        </div>

                        <span
                          className={`font-bold text-xs ${
                            user.name === "You"
                              ? "text-white"
                              : "text-slate-800"
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
              className="group relative rounded-[28px] border border-purple-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-lg shadow-purple-500/5 transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
            >

              {/* Step */}
              <div className="mb-5 inline-flex rounded-full bg-purple-100/80 border border-purple-200/50 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-purple-700">

                {item.step}

              </div>

              {/* Icon */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl shadow-md shadow-indigo-500/20">

                {item.icon}

              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-slate-900 leading-snug group-hover:text-purple-900 transition-colors">

                {item.title}

              </h3>

              {/* Description */}
              <p className="mt-4 text-slate-600 text-sm leading-relaxed font-medium">

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