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

  avatar?: string | null;

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
// XP REWARD
// ======================================================

interface XPReward {
  amount: number;

  id: number;
}

// ======================================================
// STORE STATE
// ======================================================

interface AuthState {
  user: User | null;

  loading: boolean;

  xpReward: XPReward | null;

  setUser: (
    user: User | null
  ) => void;

  fetchCurrentUser: () => Promise<void>;

  // Update XP immediately after an activity
  updateXP: (
    xp: number,
    level: string,
    amount: number
  ) => void;

  // Show XP popup
  showXPReward: (
    amount: number
  ) => void;

  // Hide XP popup
  clearXPReward: () => void;

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

    xpReward: null,

    // ==================================================
    // SET USER
    // ==================================================

    setUser: (user) => {

      set({
        user,
      });

    },

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
          // FETCH CURRENT USER
          // ============================================

          const res =
            await api.get(
              "/auth/me"
            );

          // ============================================
          // GET USER FROM BACKEND
          // ============================================

          const currentUser =
            res.data.user as User;

          // ============================================
          // SAVE CURRENT USER
          //
          // XP + LEVEL COME DIRECTLY FROM BACKEND
          // ============================================

          set({
            user: currentUser,

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
    // UPDATE XP
    //
    // Used after:
    // Daily Problem
    // Chapter Test
    // Subject Test
    // Mock Test
    // PYQ
    // Practice
    // Daily Login
    // ==================================================

    updateXP:
      (
        xp,
        level,
        amount
      ) => {

        set((state) => {

          // ==========================================
          // USER NOT AVAILABLE
          // ==========================================

          if (!state.user) {

            return state;

          }

          // ==========================================
          // UPDATE USER XP + LEVEL
          // ==========================================

          const updatedUser: User = {

            ...state.user,

            xp,

            level,

          };

          // ==========================================
          // SHOW XP POPUP
          // ==========================================

          if (amount > 0) {

            return {

              user: updatedUser,

              xpReward: {

                amount,

                id: Date.now(),

              },

            };

          }

          // ==========================================
          // XP WAS NOT AWARDED
          // ==========================================

          return {

            user: updatedUser,

          };

        });

      },

    // ==================================================
    // SHOW XP REWARD
    // ==================================================

    showXPReward:
      (amount) => {

        if (amount <= 0) {

          return;

        }

        set({

          xpReward: {

            amount,

            id: Date.now(),

          },

        });

      },

    // ==================================================
    // CLEAR XP REWARD
    // ==================================================

    clearXPReward:
      () => {

        set({

          xpReward: null,

        });

      },

    // ==================================================
    // LOGOUT
    // ==================================================

    logout:
      async () => {

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

            xpReward: null,

          });

        }

      },

  }));