import { Router } from "express";
import { Role } from "@prisma/client";

import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "./admin.auth.controller";

import {
  protect,
  authorizeRoles,
} from "../auth/auth.middleware"; // adjust path if needed

import { getAllMentors } from "./admin.controller";

const router = Router();

// ==========================================
// LOGIN
// ==========================================

router.post(
  "/login",
  adminLogin
);

// ==========================================
// LOGOUT
// ==========================================

router.post(
  "/logout",
  protect,
  authorizeRoles(Role.ADMIN),
  adminLogout
);

// ==========================================
// PROFILE
// ==========================================

router.get(
  "/profile",
  protect,
  authorizeRoles(Role.ADMIN),
  getAdminProfile
);

router.get(
  "/mentors",
  protect,
  authorizeRoles(Role.ADMIN),
  getAllMentors
);

export default router;