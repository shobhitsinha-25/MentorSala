export type PaymentStatus =
  | "CREATED"
  | "AUTHORIZED"
  | "CAPTURED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

  export type PaymentStatusType =
  | "SUCCESS"
  | "FAILED"
  | "PENDING";

// ======================================================
// CREATE PAYMENT ORDER INPUT
// ======================================================

export interface CreatePaymentOrderInput {
  planId: string;
  idempotencyKey: string;
}


// ======================================================
// RAZORPAY ORDER
// ======================================================

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}


// ======================================================
// PAYMENT
// ======================================================

export interface Payment {
  id: string;

  userId: string;

  planId: string;

  idempotencyKey: string;

  razorpayOrderId: string;

  razorpayPaymentId: string | null;

  amount: number;

  currency: string;

  status: PaymentStatus;

  method: string | null;

  email: string | null;

  contact: string | null;

  description: string | null;

  capturedAt: string | null;

  failedAt: string | null;

  createdAt: string;

  updatedAt: string;
}


// ======================================================
// CREATE PAYMENT ORDER RESPONSE
// ======================================================

export interface CreatePaymentOrderResponse {
  success: boolean;

  message: string;

  payment: Payment;

  alreadyExists: boolean;

  razorpayOrder?: RazorpayOrder;

  keyId?: string;
}


// ======================================================
// VERIFY PAYMENT INPUT
// ======================================================

export interface VerifyPaymentInput {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}


// ======================================================
// USER SUBSCRIPTION
// ======================================================

export interface UserSubscription {
  id: string;

  userId: string;

  planId: string;

  paymentId: string;

  remainingSessions: number;

  startsAt: string;

  expiresAt: string;

  status: string;

  createdAt?: string;

  updatedAt?: string;
}


// ======================================================
// VERIFY PAYMENT RESPONSE
// ======================================================

export interface VerifyPaymentResponse {
  success: boolean;

  message: string;

  alreadyVerified: boolean;

  payment: Payment;

  subscription: UserSubscription;
}

export interface GetPaymentResponse {
  success: boolean;

  payment: Payment;

  subscription: UserSubscription | null;
}