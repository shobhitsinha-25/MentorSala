import { Router } from "express";

import {
  getTwilioIceServers,
} from "./twilio.controller";

import { protect } from "../../auth/auth.middleware";

const router = Router();

// ======================================================
// TWILIO NETWORK TRAVERSAL
// ======================================================

router.get(
  "/ice-servers",
  protect,
  getTwilioIceServers
);

export default router;