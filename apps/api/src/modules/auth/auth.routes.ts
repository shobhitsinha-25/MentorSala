import { Router } from "express";

// Controller Function Imports
import {
  signup,
  login,
  getCurrentUser,
  refreshAccessToken,
  logout,
  adminRoute,
} from "./auth.controller";

import { googleAuth } from "./auth.google.controller";

// Middleware Imports
// ✅ FIXED: Standardized relative lookup paths to prevent system load failures
import { protect } from "../auth/auth.middleware"; 
import { authorizeRoles } from "../../middleware/role.middleware";

const router = Router();

// ==========================================
// 🔐 PUBLIC AUTHENTICATION GATEWAYS
// ==========================================

// Standard Form Authentication Entries
router.post("/signup", signup);
router.post("/login", login);

// Google Single Sign-On Identity Token Handshake
router.post("/google", googleAuth);

// Asynchronous Background Session Token Rotation Engine
router.post("/refresh-token", refreshAccessToken);

// ==========================================
// 🛡️ PROTECTED & SECURED PRIVILEGE LANES
// ==========================================

// Profile Hydration Session Checkpoint (Called on page refreshes)
router.get("/me", protect, getCurrentUser);

// Secure Session Signout Execution Node
router.post("/logout", protect, logout); // Added 'protect' guard to prevent unauthenticated server calls

// Administrative Access Only Route
router.get(
  "/admin",
  protect,
  authorizeRoles("ADMIN"),
  adminRoute
);

export default router;