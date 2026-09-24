import crypto from "crypto";

import prisma from "../../../../config/prisma";

import {
  fulfillCapturedPayment,
} from "../../../../modules/user/Payments/payment.fulfillment.service";

type RazorpayWebhookInput = {
  rawBody: Buffer;
  signature: string;
  eventId: string | null;
};

type RazorpayWebhookPayload = {
  event: string;

  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        currency?: string;
        status?: string;
        method?: string;
        email?: string;
        contact?: string;

        error_code?: string;
        error_description?: string;
      };
    };

    order?: {
      entity?: {
        id?: string;
        amount?: number;
        currency?: string;
        status?: string;
      };
    };
  };
};

export const handleRazorpayWebhook = async (
  data: RazorpayWebhookInput
) => {
  // ====================================================
  // 1. VALIDATE RAW BODY
  // ====================================================

  if (
    !data.rawBody ||
    !Buffer.isBuffer(data.rawBody)
  ) {
    throw new Error("Invalid webhook body.");
  }

  // ====================================================
  // 2. VALIDATE SIGNATURE
  // ====================================================

  if (!data.signature) {
    throw new Error(
      "Missing Razorpay webhook signature."
    );
  }

  const webhookSecret =
    process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "RAZORPAY_WEBHOOK_SECRET is not configured."
    );
  }

  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        webhookSecret
      )
      .update(data.rawBody)
      .digest("hex");

  const expectedBuffer =
    Buffer.from(
      expectedSignature,
      "utf8"
    );

  const receivedBuffer =
    Buffer.from(
      data.signature,
      "utf8"
    );

  if (
    expectedBuffer.length !==
      receivedBuffer.length ||
    !crypto.timingSafeEqual(
      expectedBuffer,
      receivedBuffer
    )
  ) {
    throw new Error(
      "Invalid Razorpay webhook signature."
    );
  }

  // ====================================================
  // 3. PARSE BODY
  // ====================================================

  let payload: RazorpayWebhookPayload;

  try {
    payload =
      JSON.parse(
        data.rawBody.toString("utf8")
      );
  } catch {
    throw new Error(
      "Invalid webhook JSON."
    );
  }

  // ====================================================
  // 4. VALIDATE EVENT
  // ====================================================

  const event =
    payload.event;

  if (!event) {
    throw new Error(
      "Webhook event is missing."
    );
  }

  // ====================================================
  // 5. VALIDATE EVENT ID
  // ====================================================

  const eventId =
    data.eventId;

  if (!eventId) {
    throw new Error(
      "Missing Razorpay webhook event ID."
    );
  }

  console.log(
    `Razorpay webhook received: ${event} (eventId: ${eventId})`
  );

  // ====================================================
  // 6. IDEMPOTENCY CHECK
  // ====================================================

  let webhookEvent =
    await prisma.razorpayWebhookEvent.findUnique({
      where: {
        eventId,
      },
    });

  // ----------------------------------------------------
  // EVENT ALREADY EXISTS
  // ----------------------------------------------------

  if (webhookEvent) {
    // -----------------------------------------------
    // Already successfully processed
    // -----------------------------------------------

    if (webhookEvent.processed) {
      console.log(
        `Razorpay webhook already processed: ${eventId}`
      );

      return {
        processed: true,
        alreadyProcessed: true,
        eventId,
        event,
      };
    }

    // -----------------------------------------------
    // Exists but was not successfully processed
    //
    // This can happen when a previous attempt failed.
    // We intentionally process it again.
    // -----------------------------------------------

    console.log(
      `Retrying previously failed Razorpay webhook: ${eventId}`
    );
  }

  // ----------------------------------------------------
  // CREATE EVENT RECORD
  // ----------------------------------------------------

  if (!webhookEvent) {
    try {
      webhookEvent =
        await prisma.razorpayWebhookEvent.create({
          data: {
            eventId,
            event,
            processed: false,
            payload,
          },
        });
    } catch (error: any) {
      // ------------------------------------------------
      // Another concurrent request may have created
      // the same event between findUnique() and create().
      // ------------------------------------------------

      if (
        error?.code === "P2002"
      ) {
        webhookEvent =
          await prisma.razorpayWebhookEvent.findUnique({
            where: {
              eventId,
            },
          });

        if (!webhookEvent) {
          throw error;
        }

        // If the concurrent request already processed it,
        // don't process it again.
        if (webhookEvent.processed) {
          return {
            processed: true,
            alreadyProcessed: true,
            eventId,
            event,
          };
        }
      } else {
        throw error;
      }
    }
  }

  // ====================================================
  // 7. PAYMENT CAPTURED
  // ====================================================

  if (
    event ===
    "payment.captured"
  ) {
    const paymentEntity =
      payload.payload
        ?.payment
        ?.entity;

    // -----------------------------------------------
    // Validate Razorpay payment ID
    // -----------------------------------------------

    if (!paymentEntity?.id) {
      throw new Error(
        "Payment ID missing from webhook."
      );
    }

    // -----------------------------------------------
    // Validate Razorpay order ID
    // -----------------------------------------------

    if (!paymentEntity.order_id) {
      throw new Error(
        "Order ID missing from webhook."
      );
    }

    // -----------------------------------------------
    // Find local payment
    // -----------------------------------------------

    const payment =
      await prisma.payment.findUnique({
        where: {
          razorpayOrderId:
            paymentEntity.order_id,
        },
      });

    // -----------------------------------------------
    // IMPORTANT:
    //
    // Do NOT return HTTP 200 when local payment
    // is missing.
    //
    // Throwing makes the controller return 400,
    // allowing Razorpay to retry the webhook.
    // -----------------------------------------------

    if (!payment) {
      console.warn(
        "No local payment found for Razorpay order:",
        paymentEntity.order_id
      );

      throw new Error(
        `Local payment not found for Razorpay order: ${paymentEntity.order_id}`
      );
    }

    // -----------------------------------------------
    // Verify order ownership/match
    // -----------------------------------------------

    if (
      payment.razorpayOrderId !==
      paymentEntity.order_id
    ) {
      throw new Error(
        "Webhook payment does not belong to the local order."
      );
    }

    // -----------------------------------------------
    // Verify amount
    // -----------------------------------------------

    if (
      typeof paymentEntity.amount ===
        "number" &&
      paymentEntity.amount !==
        payment.amount
    ) {
      throw new Error(
        "Webhook payment amount mismatch."
      );
    }

    if (
  paymentEntity.currency &&
  paymentEntity.currency !== payment.currency
) {
  throw new Error(
    "Webhook payment currency mismatch."
  );
}

    // -----------------------------------------------
    // Fulfill captured payment
    // -----------------------------------------------

    const result =
      await fulfillCapturedPayment({
        paymentId:
          payment.id,

        razorpayPaymentId:
          paymentEntity.id,

        method:
          paymentEntity.method,

        email:
          paymentEntity.email,

        contact:
          paymentEntity.contact,
      });

    // -----------------------------------------------
    // Mark webhook as successfully processed
    //
    // IMPORTANT:
    // This happens ONLY after fulfillment succeeds.
    // -----------------------------------------------

    await prisma.razorpayWebhookEvent.update({
      where: {
        eventId,
      },

      data: {
        processed: true,
        processedAt: new Date(),
      },
    });

    return {
      processed: true,
      alreadyProcessed:
        result.alreadyProcessed,
      eventId,
      event,
      paymentId:
        result.payment.id,
      subscriptionId:
        result.subscription.id,
    };
  }

  // ====================================================
  // 8. PAYMENT AUTHORIZED
  // ====================================================

  if (
    event ===
    "payment.authorized"
  ) {
    const paymentEntity =
      payload.payload
        ?.payment
        ?.entity;

    if (!paymentEntity?.id) {
      throw new Error(
        "Payment ID missing from authorized payment webhook."
      );
    }

    // -----------------------------------------------
    // Find payment using order ID first
    // -----------------------------------------------

    let payment =
      paymentEntity.order_id
        ? await prisma.payment.findUnique({
            where: {
              razorpayOrderId:
                paymentEntity.order_id,
            },
          })
        : null;

    // -----------------------------------------------
    // Fallback: find by Razorpay payment ID
    // -----------------------------------------------

    if (!payment) {
      payment =
        await prisma.payment.findUnique({
          where: {
            razorpayPaymentId:
              paymentEntity.id,
          },
        });
    }

    // -----------------------------------------------
    // Missing local payment
    // -----------------------------------------------

    if (!payment) {
      throw new Error(
        `Local payment not found for authorized Razorpay payment: ${paymentEntity.id}`
      );
    }

    // -----------------------------------------------
    // Update CREATED -> AUTHORIZED
    // -----------------------------------------------

    if (
      payment.status ===
      "CREATED"
    ) {
      await prisma.payment.update({
        where: {
          id: payment.id,
        },

        data: {
          status: "AUTHORIZED",
        },
      });
    }

    // -----------------------------------------------
    // Mark webhook processed
    // -----------------------------------------------

    await prisma.razorpayWebhookEvent.update({
      where: {
        eventId,
      },

      data: {
        processed: true,
        processedAt: new Date(),
      },
    });

    return {
      processed: true,
      eventId,
      event,
      paymentId:
        payment.id,
    };
  }

  // ====================================================
  // 9. PAYMENT FAILED
  // ====================================================

  if (
    event ===
    "payment.failed"
  ) {
    const paymentEntity =
      payload.payload
        ?.payment
        ?.entity;

    if (!paymentEntity?.id) {
      throw new Error(
        "Payment ID missing from failed payment webhook."
      );
    }

    // -----------------------------------------------
    // Find by order ID first
    // -----------------------------------------------

    let payment =
      paymentEntity.order_id
        ? await prisma.payment.findUnique({
            where: {
              razorpayOrderId:
                paymentEntity.order_id,
            },
          })
        : null;

    // -----------------------------------------------
    // Fallback: Razorpay payment ID
    // -----------------------------------------------

    if (!payment) {
      payment =
        await prisma.payment.findUnique({
          where: {
            razorpayPaymentId:
              paymentEntity.id,
          },
        });
    }

    // -----------------------------------------------
    // Missing local payment
    // -----------------------------------------------

    if (!payment) {
      throw new Error(
        `Local payment not found for failed Razorpay payment: ${paymentEntity.id}`
      );
    }

    // -----------------------------------------------
    // NEVER change CAPTURED -> FAILED
    // -----------------------------------------------

    if (
      payment.status ===
      "CAPTURED"
    ) {
      await prisma.razorpayWebhookEvent.update({
        where: {
          eventId,
        },

        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      return {
        processed: true,
        alreadyProcessed: true,
        eventId,
        event,
        paymentId:
          payment.id,
      };
    }

    // -----------------------------------------------
    // Update payment to FAILED
    // -----------------------------------------------

    await prisma.payment.update({
      where: {
        id: payment.id,
      },

      data: {
        status: "FAILED",
        failedAt: new Date(),
        errorCode:
          paymentEntity.error_code,
        errorDescription:
          paymentEntity.error_description,
      },
    });

    // -----------------------------------------------
    // Mark webhook processed
    // -----------------------------------------------

    await prisma.razorpayWebhookEvent.update({
      where: {
        eventId,
      },

      data: {
        processed: true,
        processedAt: new Date(),
      },
    });

    return {
      processed: true,
      eventId,
      event,
      paymentId:
        payment.id,
    };
  }

  // ====================================================
  // 10. ORDER PAID
  // ====================================================

  if (
    event ===
    "order.paid"
  ) {
    /*
     * payment.captured is our primary fulfillment
     * event.
     *
     * We acknowledge order.paid here so it is not
     * processed twice.
     */

    await prisma.razorpayWebhookEvent.update({
      where: {
        eventId,
      },

      data: {
        processed: true,
        processedAt: new Date(),
      },
    });

    return {
      processed: true,
      ignored: true,
      eventId,
      event,
      reason:
        "Order paid acknowledged; payment.captured handles fulfillment.",
    };
  }

  // ====================================================
  // 11. UNKNOWN EVENT
  // ====================================================

  /*
   * Unknown events are intentionally marked as processed.
   *
   * We successfully received and validated the webhook;
   * we simply don't have business logic for this event.
   */

  await prisma.razorpayWebhookEvent.update({
    where: {
      eventId,
    },

    data: {
      processed: true,
      processedAt: new Date(),
    },
  });

  return {
    processed: true,
    ignored: true,
    eventId,
    event,
    reason:
      `Event "${event}" is not handled.`,
  };
};