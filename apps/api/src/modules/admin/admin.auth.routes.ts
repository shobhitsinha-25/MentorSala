import { Router } from "express";
import {
  adminProtect,
} from "./admin.auth.middleware";

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
  adminProtect,
  adminLogout
);

router.get(
  "/profile",
  adminProtect,
  getAdminProfile
);



export default router;