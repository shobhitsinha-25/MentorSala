import {

  TrendingUp,

  Brain,

  AlertTriangle,

  Trophy,

} from "lucide-react";

export default function Analytics() {

  const chapterData = [

    {

      chapter:
        "Kinematics",

      accuracy: 92,

      color:
        "bg-green-500",

    },

    {

      chapter:
        "Organic Chemistry",

      accuracy: 61,

      color:
        "bg-orange-400",

    },

    {

      chapter:
        "Electrostatics",

      accuracy: 48,

      color:
        "bg-red-500",

    },

    {

      chapter:
        "Matrices",

      accuracy: 81,

      color:
        "bg-green-500",

    },

  ];

  const mockScores = [

    52,

    61,

    68,

    74,

    81,

    86,

  ];

  const heatmap = Array.from({
    length: 42,
  });

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-8 text-white shadow-2xl">

        <div className="flex items-center gap-3 text-[#60A5FA]">

          <TrendingUp className="h-7 w-7" />

          <span className="text-sm font-bold uppercase tracking-[0.2em]">

            Performance Analytics

          </span>

        </div>

        <h1 className="mt-5 text-5xl font-black leading-tight">

          Deep Insights Into
          <br />

          Your Preparation

        </h1>

        <p className="mt-4 max-w-2xl text-lg text-white/70">

          AI-powered analysis of your tests,
          study patterns, strengths and weak areas.

        </p>

      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Rank Card */}
        <div className="rounded-[30px] bg-gradient-to-br from-[#7C3AED] to-[#2563EB] p-6 text-white shadow-xl">

          <div className="flex items-center gap-3">

            <Trophy className="h-7 w-7" />

            <span className="text-sm font-bold uppercase tracking-[0.2em]">

              Predicted Rank

            </span>

          </div>

          <h2 className="mt-6 text-5xl font-black">

            AIR 850

          </h2>

          <p className="mt-3 text-white/80">

            Estimated range:
            AIR 850 - 1100
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-4">

            <p className="text-sm text-white/80">

              Based on:
              mock scores,
              consistency,
              accuracy trends and study hours.

            </p>

          </div>

        </div>

        {/* Comparison Widget */}
        <div className="rounded-[30px] border border-[#E8E5F5] bg-white p-6 xl:col-span-2">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-black text-[#0F172A]">

              Percentile Comparison

            </h2>

            <div className="rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-bold text-[#2563EB]">

              Top Performer

            </div>

          </div>

          <div className="mt-8 space-y-6">

            {[
              {
                label: "You",
                value: "91%",
                width: "91%",
                color:
                  "from-[#7C3AED] to-[#2563EB]",
              },

              {
                label: "Class Average",
                value: "72%",
                width: "72%",
                color:
                  "from-[#0EA5E9] to-[#38BDF8]",
              },

              {
                label: "Top 10%",
                value: "96%",
                width: "96%",
                color:
                  "from-[#16A34A] to-[#4ADE80]",
              },

            ].map((item, index) => (

              <div key={index}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="font-semibold text-[#0F172A]">

                    {item.label}

                  </span>

                  <span className="text-sm font-bold text-[#2563EB]">

                    {item.value}

                  </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-[#EEF2FF]">

                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{
                      width: item.width,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Accuracy + Time Distribution */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Chapter Accuracy */}
        <div className="rounded-[30px] border border-[#E8E5F5] bg-white p-6">

          <h2 className="text-2xl font-black text-[#0F172A]">

            Chapter-wise Accuracy

          </h2>

          <div className="mt-8 space-y-6">

            {chapterData.map((item, index) => (

              <div key={index}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="font-semibold text-[#0F172A]">

                    {item.chapter}

                  </span>

                  <span className="text-sm font-bold text-[#2563EB]">

                    {item.accuracy}%

                  </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-[#EEF2FF]">

                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width: `${item.accuracy}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Pie Chart */}
        <div className="rounded-[30px] border border-[#E8E5F5] bg-white p-6">

          <h2 className="text-2xl font-black text-[#0F172A]">

            Study Time Distribution

          </h2>

          <div className="mt-10 flex items-center justify-center">

            <div className="relative h-64 w-64 rounded-full bg-[conic-gradient(#7C3AED_0%_35%,#2563EB_35%_60%,#16A34A_60%_82%,#F59E0B_82%_100%)] shadow-xl">

              <div className="absolute inset-10 rounded-full bg-white" />

            </div>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">

            {[
              {
                label: "Physics",
                color:
                  "bg-[#7C3AED]",
              },

              {
                label: "Chemistry",
                color:
                  "bg-[#2563EB]",
              },

              {
                label: "Mathematics",
                color:
                  "bg-[#16A34A]",
              },

              {
                label: "Tests",
                color:
                  "bg-[#F59E0B]",
              },

            ].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <div
                  className={`h-4 w-4 rounded-full ${item.color}`}
                />

                <span className="font-medium text-[#0F172A]">

                  {item.label}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Mock Performance */}
      <div className="rounded-[30px] border border-[#E8E5F5] bg-white p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-black text-[#0F172A]">

            Mock Test Performance

          </h2>

          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">

            Improving Trend

          </div>

        </div>

        <div className="mt-10 flex items-end justify-between gap-4 h-[260px]">

          {mockScores.map((score, index) => (

            <div
              key={index}
              className="flex flex-1 flex-col items-center"
            >

              <div
                className="w-full rounded-t-3xl bg-gradient-to-t from-[#7C3AED] to-[#2563EB]"
                style={{
                  height: `${score * 2.2}px`,
                }}
              />

              <span className="mt-3 text-sm font-bold text-[#0F172A]">

                Test {index + 1}

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Weak Topics + Heatmap */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Weak Topics */}
        <div className="rounded-[30px] border border-[#E8E5F5] bg-white p-6">

          <div className="flex items-center gap-3">

            <AlertTriangle className="h-7 w-7 text-[#F59E0B]" />

            <h2 className="text-2xl font-black text-[#0F172A]">

              Weak Topics Identified

            </h2>

          </div>

          <div className="mt-8 space-y-5">

            {[
              {
                topic:
                  "Electrostatics",
                hours:
                  "8h Recommended",
              },

              {
                topic:
                  "Organic Reactions",
                hours:
                  "5h Recommended",
              },

              {
                topic:
                  "Probability",
                hours:
                  "4h Recommended",
              },

            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-[#FEF3C7] bg-[#FFF7ED] p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-bold text-[#0F172A]">

                      {item.topic}

                    </h3>

                    <p className="mt-1 text-sm text-[#92400E]">

                      AI recommends focused revision

                    </p>

                  </div>

                  <div className="rounded-full bg-[#F59E0B] px-4 py-2 text-xs font-bold text-white">

                    {item.hours}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Heatmap */}
        <div className="rounded-[30px] border border-[#E8E5F5] bg-white p-6">

          <div className="flex items-center gap-3">

            <Brain className="h-7 w-7 text-[#7C3AED]" />

            <h2 className="text-2xl font-black text-[#0F172A]">

              Study Heatmap

            </h2>

          </div>

          <p className="mt-2 text-sm text-[#64748B]">

            Daily study intensity over the last 6 weeks

          </p>

          <div className="mt-8 grid grid-cols-7 gap-2">

            {heatmap.map((_, index) => {

              const intensity =
                Math.floor(
                  Math.random() * 4
                );

              const colors = [

                "bg-[#E2E8F0]",

                "bg-[#C4B5FD]",

                "bg-[#8B5CF6]",

                "bg-[#6D28D9]",

              ];

              return (

                <div
                  key={index}
                  className={`h-8 rounded-lg ${colors[intensity]}`}
                />

              );

            })}

          </div>

        </div>

      </div>

    </div>

  );

}