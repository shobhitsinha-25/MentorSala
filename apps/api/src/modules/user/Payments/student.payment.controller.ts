import type {
  Request,
  Response,
} from "express";

import {
  asyncHandler,
} from "../../../utils/asyncHandler";

import {
  createPaymentOrderSchema,verifyPaymentSchema
} from "./payment.validation";

import {
  createPaymentOrder,
  verifyPayment,getPaymentById
} from "./student.payment.service";

// ======================================================
// CREATE PAYMENT ORDER
// ======================================================

export const createPaymentOrderController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // VALIDATE REQUEST BODY
      // ================================================

      const data =
        createPaymentOrderSchema.parse(
          req.body
        );

      // ================================================
      // CREATE PAYMENT ORDER
      // ================================================

      const result =
        await createPaymentOrder({

          userId:
            req.user!.userId,

          planId:
            data.planId,

          idempotencyKey:
            data.idempotencyKey,

        });

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        message:
          result.alreadyExists
            ? "Existing payment order returned."
            : "Payment order created successfully.",

        ...result,

      });

    }

  );

  export const verifyPaymentController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const data =
        verifyPaymentSchema.parse(
          req.body
        );

      const result =
        await verifyPayment({
          userId:
            req.user!.userId,

          ...data,
        });

      return res.status(200).json({
        success: true,

        message:
          result.alreadyVerified
            ? "Payment already verified."
            : "Payment verified successfully.",

        ...result,
      });
    }
  );

 // ======================================================
// GET PAYMENT BY ID
// ======================================================

export const getPaymentByIdController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // GET PAYMENT ID
      // ================================================

      const paymentId =
        req.params.paymentId;

      // ================================================
      // VALIDATE PAYMENT ID
      // ================================================

      if (
        typeof paymentId !== "string" ||
        !paymentId.trim()
      ) {

        throw new Error(
          "Invalid payment ID."
        );

      }

      // ================================================
      // GET PAYMENT
      // ================================================

      const payment =
        await getPaymentById(
          req.user!.userId,
          paymentId
        );

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        payment,

        subscription:
          payment.subscription,

      });

    }
  );