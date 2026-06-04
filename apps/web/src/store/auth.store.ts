import { create } from "zustand";

import api from "../lib/axios";

// ======================================================
// MENTOR PROFILE
// ======================================================

export interface MentorProfile {

  id: string;

  userId: string;

  status:
    | "NOT_STARTED"
    | "PENDING_APPROVAL"
    | "APPROVED"
    | "REJECTED";

  resumeUrl?: string | null;

  activationCode?: string | null;

  codeExpiresAt?: string | null;

  isVerified: boolean;

  verifiedAt?: string | null;

  rating: number;

  totalStudents: number;

  totalCourses: number;

  earnings: number;

}

// ======================================================
// USER
// ======================================================

export interface User {

  id: string;

  name: string;

  email: string;

  role:
    | "STUDENT"
    | "MENTOR"
    | "ADMIN";

  avatar?: string;

  onboardingCompleted?: boolean;

  streak: number;

  xp: number;

  level: string;

  targetExam?: string | null;

  mentorProfile?: MentorProfile | null;

  createdAt?: string;

  updatedAt?: string;

}

// ======================================================
// STORE STATE
// ======================================================

interface AuthState {

  user: User | null;

  loading: boolean;

  setUser: (
    user: User | null
  ) => void;

  fetchCurrentUser: () => Promise<void>;

  logout: () => Promise<void>;

}

// ======================================================
// AUTH STORE
// ======================================================

export const useAuthStore =
  create<AuthState>((set) => ({

    // ==================================================
    // INITIAL STATE
    // ==================================================

    user: null,

    loading: true,

    // ==================================================
    // SET USER
    // ==================================================

    setUser: (user) =>

      set({

        user,

      }),

    // ==================================================
    // FETCH CURRENT USER
    // ==================================================

    fetchCurrentUser:
      async () => {

        try {

          // ============================================
          // START LOADING
          // ============================================

          set({

            loading: true,

          });

          // ============================================
          // CHECK ACCESS TOKEN
          // ============================================

          const token =
            localStorage.getItem(
              "accessToken"
            );

          // ============================================
          // NO TOKEN
          // ============================================

          if (!token) {

            set({

              user: null,

              loading: false,

            });

            return;

          }

          // ============================================
          // FETCH USER
          // ============================================

          const res =
            await api.get(
              "/auth/me"
            );

          // ============================================
          // SAVE USER
          // ============================================

          set({

            user:
              res.data.user,

            loading: false,

          });

        } catch (error) {

          console.log(

            "Session restoration failed"

          );

          // ============================================
          // REMOVE INVALID TOKEN
          // ============================================

          localStorage.removeItem(
            "accessToken"
          );

          // ============================================
          // CLEAR USER
          // ============================================

          set({

            user: null,

            loading: false,

          });

        }

      },

    // ==================================================
    // LOGOUT
    // ==================================================

    logout: async () => {

      try {

        // ============================================
        // BACKEND LOGOUT
        // ============================================

        await api.post(
          "/auth/logout"
        );

      } catch (error) {

        console.error(

          "Logout failed:",

          error

        );

      } finally {

        // ============================================
        // REMOVE ACCESS TOKEN
        // ============================================

        localStorage.removeItem(
          "accessToken"
        );

        // ============================================
        // CLEAR STORE
        // ============================================

        set({

          user: null,

          loading: false,

        });

      }

    },

  }));