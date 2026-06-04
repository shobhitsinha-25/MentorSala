import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { useAuthStore }
from "../store/auth.store";

interface RoleProtectedRouteProps {

  children: ReactNode;

  allowedRole:
    | "STUDENT"
     | "MENTOR"
    | "ADMIN";

}

export default function RoleProtectedRoute({

  children,

  allowedRole,

}: RoleProtectedRouteProps) {

  const user =
    useAuthStore(
      (state) => state.user
    );

  const loading =
    useAuthStore(
      (state) => state.loading
    );

  // Loading state
  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-3 select-none text-slate-400 font-medium">

        <div className="h-6 w-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />

        <span className="text-sm tracking-wide">

          Loading MentorSala...

        </span>

      </div>

    );

  }

  // Not authenticated
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  // Wrong role
  if (
    user.role !== allowedRole
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  // Authorized
  return <>{children}</>;

}