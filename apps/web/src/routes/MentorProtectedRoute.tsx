import type {
  ReactNode,
} from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuthStore,
} from "../store/auth.store";

interface Props {

  children:
    ReactNode;

}

export default function MentorProtectedRoute({

  children,

}: Props) {

  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const loading =
    useAuthStore(
      (state) =>
        state.loading
    );

  const location =
    useLocation();

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-slate-400">

        Loading MentorSala...

      </div>

    );

  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!user) {

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }

  // ==========================================
  // NOT A MENTOR
  // ==========================================

  if (
    user.role !==
    "MENTOR"
  ) {

    return (

      <Navigate
        to="/"
        replace
      />

    );

  }

  const status =
    user
      ?.mentorProfile
      ?.status;

  // ==========================================
  // NOT STARTED
  // ==========================================

  if (

    status ===
      "NOT_STARTED" &&

    location.pathname !==
      "/mentor/onboarding"

  ) {

    return (

      <Navigate
        to="/mentor/onboarding"
        replace
      />

    );

  }

  // ==========================================
  // PENDING APPROVAL
  // ==========================================

  if (

    status ===
      "PENDING_APPROVAL" &&

    location.pathname !==
      "/mentor/under-review"

  ) {

    return (

      <Navigate
        to="/mentor/under-review"
        replace
      />

    );

  }

  // ==========================================
  // REJECTED
  // ==========================================

  if (

    status ===
      "REJECTED" &&

    location.pathname !==
      "/mentor/rejected"

  ) {

    return (

      <Navigate
        to="/mentor/rejected"
        replace
      />

    );

  }

  // ==========================================
  // APPROVED
  // ==========================================

  if (
    status ===
    "APPROVED"
  ) {

    return <>{children}</>;

  }

  // ==========================================
  // FALLBACK
  // ==========================================

  return <>{children}</>;

}