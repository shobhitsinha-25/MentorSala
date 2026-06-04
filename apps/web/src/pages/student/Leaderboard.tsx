import {

  Trophy,

  Search,

  ChevronUp,

  ChevronDown,

  Minus,

} from "lucide-react";

import { useState } from "react";

export default function Leaderboard() {

  const [activeTab, setActiveTab] =
    useState("Weekly");

  const leaderboard = [

    {

      rank: 1,

      name: "Aryan Gupta",

      exam: "JEE",

      xp: 5420,

      change: "up",

      avatar: "AG",

    },

    {

      rank: 2,

      name: "Priya Sharma",

      exam: "NEET",

      xp: 5170,

      change: "up",

      avatar: "PS",

    },

    {

      rank: 3,

      name: "Rohan Das",

      exam: "WBJEE",

      xp: 4980,

      change: "down",

      avatar: "RD",

    },

    {

      rank: 4,

      name: "Ananya Roy",

      exam: "JEE",

      xp: 4620,

      change: "up",

      avatar: "AR",

    },

    {

      rank: 5,

      name: "Vikram Sen",

      exam: "NEET",

      xp: 4510,

      change: "neutral",

      avatar: "VS",

    },

  ];

  const currentUser = {

    rank: 128,

    name: "Shobhit Sinha",

    exam: "JEE",

    xp: 820,

    change: "up",

    avatar: "SS",

  };

  const tabs = [

    "Weekly",

    "Global",

    "Exam-Specific",

    "Friends",

  ];

  return (

    <div className="space-y-8">

      {/* Header */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-8 text-white shadow-2xl">

        <div className="flex items-center gap-3 text-[#FBBF24]">

          <Trophy className="h-7 w-7" />

          <span className="text-sm font-bold uppercase tracking-[0.2em]">

            Competitive Rankings

          </span>

        </div>

        <h1 className="mt-5 text-5xl font-black leading-tight">

          Leaderboard
          <br />

          Arena

        </h1>

        <p className="mt-4 max-w-2xl text-lg text-white/70">

          Compete with top learners,
          climb rankings and maintain your streak.

        </p>

      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                activeTab === tab

                  ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-lg"

                  : "border border-[#E8E5F5] bg-white text-[#0F172A]"
              }`}
            >

              {tab}

            </button>

          ))}

        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#E8E5F5] bg-white px-4 py-3 shadow-sm">

          <Search className="h-5 w-5 text-[#64748B]" />

          <input
            type="text"
            placeholder="Search by exam or batch..."
            className="w-[250px] bg-transparent text-sm outline-none placeholder:text-[#94A3B8]"
          />

        </div>

      </div>

      {/* Podium */}
      <div className="rounded-[32px] border border-[#E8E5F5] bg-white p-8 shadow-sm">

        <div className="flex items-end justify-center gap-6">

          {/* 2nd */}
          <div className="flex flex-col items-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#CBD5E1] to-[#94A3B8] text-2xl font-black text-white shadow-lg">

              PS

            </div>

            <h3 className="mt-4 text-lg font-black text-[#0F172A]">

              Priya

            </h3>

            <p className="text-sm text-[#64748B]">

              5170 XP

            </p>

            <div className="mt-4 flex h-32 w-28 items-center justify-center rounded-t-[28px] bg-gradient-to-b from-[#CBD5E1] to-[#94A3B8] text-4xl font-black text-white">

              2

            </div>

          </div>

          {/* 1st */}
          <div className="flex flex-col items-center">

            <div className="rounded-full bg-[#F59E0B] px-4 py-1 text-xs font-black text-white shadow-lg">

              👑 TOP 1

            </div>

            <div className="mt-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] text-3xl font-black text-white shadow-2xl">

              AG

            </div>

            <h3 className="mt-4 text-xl font-black text-[#0F172A]">

              Aryan

            </h3>

            <p className="text-sm text-[#64748B]">

              5420 XP

            </p>

            <div className="mt-4 flex h-44 w-32 items-center justify-center rounded-t-[32px] bg-gradient-to-b from-[#F59E0B] to-[#FBBF24] text-5xl font-black text-white">

              1

            </div>

          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] text-2xl font-black text-white shadow-lg">

              RD

            </div>

            <h3 className="mt-4 text-lg font-black text-[#0F172A]">

              Rohan

            </h3>

            <p className="text-sm text-[#64748B]">

              4980 XP

            </p>

            <div className="mt-4 flex h-24 w-28 items-center justify-center rounded-t-[28px] bg-gradient-to-b from-[#F97316] to-[#FB923C] text-4xl font-black text-white">

              3

            </div>

          </div>

        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="rounded-[32px] border border-[#E8E5F5] bg-white p-6 shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-[#EEF2FF] text-left">

                <th className="pb-5 text-sm font-bold text-[#64748B]">

                  Rank

                </th>

                <th className="pb-5 text-sm font-bold text-[#64748B]">

                  Student

                </th>

                <th className="pb-5 text-sm font-bold text-[#64748B]">

                  Target Exam

                </th>

                <th className="pb-5 text-sm font-bold text-[#64748B]">

                  Weekly Change

                </th>

                <th className="pb-5 text-sm font-bold text-[#64748B]">

                  XP

                </th>

              </tr>

            </thead>

            <tbody>

              {leaderboard.map((user, index) => (

                <tr
                  key={index}
                  className="border-b border-[#F8FAFC]"
                >

                  {/* Rank */}
                  <td className="py-5">

                    <div className="flex items-center gap-2 text-lg font-black text-[#0F172A]">

                      {user.rank === 1 && "🥇"}

                      {user.rank === 2 && "🥈"}

                      {user.rank === 3 && "🥉"}

                      {user.rank > 3 &&
                        `#${user.rank}`}

                    </div>

                  </td>

                  {/* User */}
                  <td className="py-5">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-lg font-black text-white shadow-lg">

                        {user.avatar}

                      </div>

                      <div>

                        <h3 className="font-bold text-[#0F172A]">

                          {user.name}

                        </h3>

                        <p className="text-sm text-[#64748B]">

                          Active Learner

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Exam */}
                  <td className="py-5">

                    <span className="rounded-full bg-[#EEF2FF] px-4 py-2 text-xs font-bold text-[#2563EB]">

                      {user.exam}

                    </span>

                  </td>

                  {/* Change */}
                  <td className="py-5">

                    <div className="flex items-center gap-2">

                      {user.change === "up" && (

                        <>

                          <ChevronUp className="h-5 w-5 text-green-500" />

                          <span className="font-bold text-green-600">

                            +5

                          </span>

                        </>

                      )}

                      {user.change === "down" && (

                        <>

                          <ChevronDown className="h-5 w-5 text-red-500" />

                          <span className="font-bold text-red-600">

                            -2

                          </span>

                        </>

                      )}

                      {user.change === "neutral" && (

                        <>

                          <Minus className="h-5 w-5 text-gray-400" />

                          <span className="font-bold text-gray-500">

                            0

                          </span>

                        </>

                      )}

                    </div>

                  </td>

                  {/* XP */}
                  <td className="py-5">

                    <span className="text-lg font-black text-[#7C3AED]">

                      {user.xp}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Current User */}
      <div className="rounded-[32px] border-2 border-[#7C3AED] bg-gradient-to-r from-[#F5F3FF] to-[#EEF2FF] p-6 shadow-lg">

        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-xl font-black text-white shadow-xl">

              SS

            </div>

            <div>

              <div className="flex items-center gap-3">

                <h2 className="text-2xl font-black text-[#0F172A]">

                  Your Position

                </h2>

                <span className="rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-bold text-white">

                  YOU

                </span>

              </div>

              <p className="mt-1 text-[#64748B]">

                Keep pushing your consistency to climb higher.

              </p>

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-6">

            <div>

              <p className="text-sm text-[#64748B]">

                Rank

              </p>

              <h3 className="text-3xl font-black text-[#0F172A]">

                #128

              </h3>

            </div>

            <div>

              <p className="text-sm text-[#64748B]">

                XP

              </p>

              <h3 className="text-3xl font-black text-[#7C3AED]">

                820

              </h3>

            </div>

            <div className="flex items-center gap-2">

              <ChevronUp className="h-6 w-6 text-green-500" />

              <span className="text-xl font-black text-green-600">

                +12

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}