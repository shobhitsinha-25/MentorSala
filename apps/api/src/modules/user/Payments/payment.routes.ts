import {
  Router,
} from "express";

import {
  protect,
} from "../../auth/auth.middleware";

import {
  createPaymentOrderController,
  getPaymentByIdController,
  verifyPaymentController,
} from "./student.payment.controller";


const router =
  Router();


// ======================================================
// CREATE RAZORPAY PAYMENT ORDER
// ======================================================

router.post(

  "/create-order",

  protect,

  createPaymentOrderController

);

router.post(
  "/verify",
  protect,
  verifyPaymentController
);

router.get(
  "/:paymentId",
  protect,
  getPaymentByIdController
);


export default router;