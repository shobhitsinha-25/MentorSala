import { Router } from "express";

import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "./admin.auth.controller";

const router = Router();

router.post(
  "/login",
  adminLogin
);

router.post(
  "/logout",
  adminLogout
);

router.get(
  "/profile",
  getAdminProfile
);

export default router;