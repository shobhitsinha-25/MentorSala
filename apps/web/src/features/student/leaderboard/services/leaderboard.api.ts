import api from "../../../../lib/axios";


// ======================================================
// TYPES
// ======================================================

export interface LeaderboardStudent {

  rank: number;

  id: string;

  name: string;

  avatar: string | null;

  xp: number;

  level: string;

}


export interface StudentLeaderboardResponse {

  success: boolean;

  leaderboard:
    LeaderboardStudent[];

  currentUser:
    LeaderboardStudent;

}


// ======================================================
// GET DASHBOARD LEADERBOARD
// ======================================================

export const getStudentLeaderboard =
  async (): Promise<StudentLeaderboardResponse> => {

    const response =
      await api.get(
        "/leaderboard"
      );

    return response.data;

  };


// ======================================================
// GET TOP 100 LEADERBOARD
// ======================================================

export const getTop100StudentLeaderboard =
  async (): Promise<StudentLeaderboardResponse> => {

    const response =
      await api.get(
        "/leaderboard/all"
      );

    return response.data;

  };