import { Router } from "express";

import {
  handleRazorpayWebhookController,
} from "./razorpay.webhook.controller";

const router = Router();

router.post(
  "/",
  handleRazorpayWebhookController
);

export default router;