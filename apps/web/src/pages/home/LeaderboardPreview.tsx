import { useEffect, useState } from "react";

import api from "../../api/axios";

export default function LeaderboardPreview() {

  const [users, setUsers] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchLeaderboard =
      async () => {

        try {

          const response =
            await api.get(
              "/users/leaderboard"
            );

          setUsers(response.data);

        } catch (error) {
          console.log(error);
        }
      };

    fetchLeaderboard();

  }, []);

  return (
    <section
      id="leaderboard"
      className="py-24 px-6"
    >

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">

          <div className="inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300 mb-6">
            GAMIFICATION
          </div>

          <h2 className="text-5xl font-black text-[#F0F4FF]">
            Compete. Learn. Climb.
          </h2>

        </div>

        <div className="rounded-[32px] border border-[#1E2640] bg-[#131829] p-8">

          <div className="space-y-5">

            {users.map((user, index) => (

              <div
                key={user.id}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0E1220] px-6 py-5"
              >

                <div className="flex items-center gap-5">

                  <div className="text-2xl font-black text-[#F7C94F]">
                    #{index + 1}
                  </div>

                  <img
                    src={
                      user.avatar ||
                      "https://i.pravatar.cc/150"
                    }
                    alt={user.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="font-bold text-[#F0F4FF]">
                      {user.name}
                    </h3>

                    <p className="text-sm text-[#7A85A8]">
                      {user.targetExam}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-xl font-black text-[#4F6EF7]">
                    {user.xp} XP
                  </div>

                  <div className="text-sm text-[#7A85A8]">
                    🔥 {user.streak} day streak
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}