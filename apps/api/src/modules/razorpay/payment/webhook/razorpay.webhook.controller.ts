import type {
  Request,
  Response,
} from "express";

import {
  handleRazorpayWebhook,
} from "./razorpay.webhook.service";

export const handleRazorpayWebhookController = async (
  req: Request,
  res: Response
) => {

  try {

    const result =
      await handleRazorpayWebhook({

        rawBody:
          req.body as Buffer,

        signature:
          req.header(
            "X-Razorpay-Signature"
          ) ?? "",

        eventId:
          req.header(
            "x-razorpay-event-id"
          ) ?? null,

      });

    return res.status(200).json({

      success: true,

      message:
        "Webhook processed successfully.",

      ...result,

    });

  } catch (error) {

    console.error(
      "Razorpay webhook error:",
      error
    );

    return res.status(400).json({

      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Webhook processing failed.",

    });

  }

};