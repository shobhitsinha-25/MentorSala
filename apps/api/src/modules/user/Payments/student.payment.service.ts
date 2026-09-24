import prisma from "../../../config/prisma";
import razorpay from "../../../config/razorpay";
import crypto from "crypto";
import { fulfillCapturedPayment } from "./payment.fulfillment.service";

import type {
  CreatePaymentOrderInput,
} from "./payment.types";


// ======================================================
// CREATE PAYMENT ORDER
// ======================================================

export const createPaymentOrder = async (
  data: CreatePaymentOrderInput
) => {

  // ====================================================
  // IDEMPOTENCY CHECK
  // ====================================================

  const existingPayment =
    await prisma.payment.findUnique({
      where: {
        idempotencyKey:
          data.idempotencyKey,
      },
    });

  if (existingPayment) {

    return {
      payment:
        existingPayment,

      alreadyExists:
        true,

      razorpayOrder: {
        id:
          existingPayment.razorpayOrderId,

        amount:
          existingPayment.amount,

        currency:
          existingPayment.currency,
      },

      keyId:
        process.env.RAZORPAY_KEY_ID,
    };
  }


  // ====================================================
  // GET STUDENT
  // ====================================================

  const student =
    await prisma.user.findUnique({
      where: {
        id: data.userId,
      },

      select: {
        id: true,

        email: true,

        targetExam: true,

        isDeleted: true,
      },
    });

  if (
    !student ||
    student.isDeleted
  ) {

    throw new Error(
      "Student not found."
    );
  }


  if (!student.targetExam) {

    throw new Error(
      "Target exam is not set."
    );
  }


  // ====================================================
  // GET TARGET PLAN
  // ====================================================

  const plan =
    await prisma.subscriptionPlan.findFirst({
      where: {
        id:
          data.planId,

        isActive:
          true,

        examType:
          student.targetExam,
      },
    });

  if (!plan) {

    throw new Error(
      "Plan not found or not available for your exam."
    );
  }


  // ====================================================
  // TRIAL PLAN CANNOT BE PURCHASED
  // ====================================================
  //
  // Trial plans are assigned automatically through the
  // free-trial flow. They must never be purchased through
  // Razorpay.
  //

  if (plan.isTrial) {

    throw new Error(
      "Trial plans cannot be purchased."
    );
  }


  // ====================================================
  // GET CURRENT ACTIVE PAID SUBSCRIPTION
  // ====================================================
  //
  // IMPORTANT:
  //
  // Trial subscriptions are deliberately excluded.
  //
  // If the student has:
  //
  //   Trial only
  //       ↓
  //   full paid plan price
  //
  // If the student has:
  //
  //   Paid subscription
  //       ↓
  //   existing upgrade rules apply
  //
  // This prevents the trial price/level from affecting
  // paid-plan upgrade calculations.
  //

  const currentSubscription =
    await prisma.userSubscription.findFirst({
      where: {
        userId:
          student.id,

        isTrial:
          false,

        status:
          "ACTIVE",

        startsAt: {
          lte:
            new Date(),
        },

        expiresAt: {
          gt:
            new Date(),
        },
      },

      include: {
        plan: {
          select: {
            id: true,

            title: true,

            level: true,

            price: true,
          },
        },
      },

      orderBy: {
        expiresAt:
          "desc",
      },
    });


  // ====================================================
  // CALCULATE PAYABLE AMOUNT
  // ====================================================

  let payablePrice: number;

  let isUpgrade = false;


  // ====================================================
  // NORMAL PURCHASE
  // ====================================================
  //
  // This includes:
  //
  // 1. No subscription
  // 2. Active trial only
  //
  // Trial is NOT treated as an upgrade.
  //

  if (!currentSubscription) {

    payablePrice =
      plan.price;
  }


  // ====================================================
  // UPGRADE PURCHASE
  // ====================================================
  //
  // This block executes only when the student has an
  // ACTIVE PAID subscription.
  //

  else {

    const currentPlan =
      currentSubscription.plan;


    // --------------------------------------------------
    // SAME PLAN
    // --------------------------------------------------

    if (
      currentPlan.id ===
      plan.id
    ) {

      throw new Error(
        "You already have an active subscription for this plan."
      );
    }


    // --------------------------------------------------
    // DOWNGRADE / SAME LEVEL
    // --------------------------------------------------

    if (
      plan.level <=
      currentPlan.level
    ) {

      throw new Error(
        "You can only upgrade to a higher-level plan. Downgrading is not supported."
      );
    }


    // --------------------------------------------------
    // CALCULATE UPGRADE PRICE
    // --------------------------------------------------

    payablePrice =
      plan.price -
      currentPlan.price;


    // --------------------------------------------------
    // INVALID PRICE CONFIGURATION
    // --------------------------------------------------

    if (
      payablePrice <= 0
    ) {

      throw new Error(
        `Invalid pricing configuration for plan "${plan.title}". ` +
        `A higher-level plan must have a higher price than the current plan.`
      );
    }


    isUpgrade = true;
  }


  // ====================================================
  // CONVERT RUPEES → PAISE
  // ====================================================

  const amount =
    Math.round(
      payablePrice * 100
    );


  if (
    amount <= 0
  ) {

    throw new Error(
      "Payment amount must be greater than zero."
    );
  }


  // ====================================================
  // CREATE RAZORPAY ORDER
  // ====================================================

  const razorpayOrder =
    await razorpay.orders.create({

      amount,

      currency:
        "INR",

      receipt:
        `ms_${Date.now()}`,

      notes: {
        userId:
          student.id,

        planId:
          plan.id,

        paymentType:
          isUpgrade
            ? "UPGRADE"
            : "NEW_SUBSCRIPTION",
      },
    });


  // ====================================================
  // CREATE LOCAL PAYMENT
  // ====================================================

  const payment =
    await prisma.payment.create({
      data: {
        userId:
          student.id,

        planId:
          plan.id,

        idempotencyKey:
          data.idempotencyKey,

        razorpayOrderId:
          razorpayOrder.id,

        amount,

        currency:
          "INR",

        status:
          "CREATED",

        email:
          student.email,

        description:
          isUpgrade
            ? `${plan.title} plan upgrade`
            : `${plan.title} subscription`,
      },
    });


  // ====================================================
  // RESPONSE
  // ====================================================

  return {
    payment,

    alreadyExists:
      false,

    razorpayOrder: {
      id:
        razorpayOrder.id,

      amount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,
    },

    keyId:
      process.env.RAZORPAY_KEY_ID,
  };
};


// ======================================================
// VERIFY PAYMENT
// ======================================================

export const verifyPayment = async ({
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: {
  userId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {

  // ====================================================
  // FIND PAYMENT ORDER
  // ====================================================

  const payment =
    await prisma.payment.findUnique({
      where: {
        razorpayOrderId:
          razorpay_order_id,
      },
    });

  if (!payment) {

    throw new Error(
      "Payment order not found."
    );
  }


  // ====================================================
  // VERIFY PAYMENT OWNERSHIP
  // ====================================================

  if (
    payment.userId !==
    userId
  ) {

    throw new Error(
      "Unauthorized payment."
    );
  }


  // ====================================================
  // ALREADY CAPTURED
  // ====================================================

  if (
    payment.status ===
    "CAPTURED"
  ) {

    const subscription =
      await prisma.userSubscription.findUnique({
        where: {
          paymentId:
            payment.id,
        },
      });

    if (!subscription) {

      throw new Error(
        "Payment is captured but subscription was not created."
      );
    }

    return {
      alreadyVerified:
        true,

      payment,

      subscription,
    };
  }


  // ====================================================
  // VERIFY RAZORPAY SIGNATURE
  // ====================================================

  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");


  // ====================================================
  // CONSTANT-TIME SIGNATURE COMPARISON
  // ====================================================

  const generatedBuffer =
    Buffer.from(
      generatedSignature,
      "utf8"
    );

  const receivedBuffer =
    Buffer.from(
      razorpay_signature,
      "utf8"
    );


  if (
    generatedBuffer.length !==
      receivedBuffer.length ||
    !crypto.timingSafeEqual(
      generatedBuffer,
      receivedBuffer
    )
  ) {

    throw new Error(
      "Invalid payment signature."
    );
  }


  // ====================================================
  // FETCH PAYMENT FROM RAZORPAY
  // ====================================================

  const razorpayPayment =
    await razorpay.payments.fetch(
      razorpay_payment_id
    );


  // ====================================================
  // VERIFY ORDER ID
  // ====================================================

  if (
    razorpayPayment.order_id !==
    razorpay_order_id
  ) {

    throw new Error(
      "Payment does not belong to this order."
    );
  }


  // ====================================================
  // VERIFY PAYMENT STATUS
  // ====================================================

  if (
    razorpayPayment.status !==
    "captured"
  ) {

    throw new Error(
      "Payment has not been captured."
    );
  }


  // ====================================================
  // VERIFY PAYMENT AMOUNT
  // ====================================================

  if (
    razorpayPayment.amount !==
    payment.amount
  ) {

    throw new Error(
      "Payment amount mismatch."
    );
  }

  


  // ====================================================
  // FULFILL CAPTURED PAYMENT
  // ====================================================

  const result =
    await fulfillCapturedPayment({
      paymentId:
        payment.id,

      razorpayPaymentId:
        razorpay_payment_id,

      method:
        razorpayPayment.method,

      email:
        razorpayPayment.email,

      contact:
        razorpayPayment.contact,
    });


  // ====================================================
  // RESPONSE
  // ====================================================

  return {
    alreadyVerified:
      result.alreadyProcessed,

    payment:
      result.payment,

    subscription:
      result.subscription,
  };
};


// ======================================================
// GET PAYMENT BY ID
// ======================================================

export const getPaymentById = async (
  userId: string,
  paymentId: string
) => {

  const payment =
    await prisma.payment.findFirst({
      where: {
        id:
          paymentId,

        userId,
      },

      include: {
        plan: true,

        subscription: true,
      },
    });


  // ====================================================
  // PAYMENT NOT FOUND
  // ====================================================

  if (!payment) {

    throw new Error(
      "Payment not found."
    );
  }


  return payment;
};