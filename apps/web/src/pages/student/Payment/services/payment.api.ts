import api from "../../../../api/axios";

import type {
  CreatePaymentOrderInput,
  CreatePaymentOrderResponse,
  VerifyPaymentInput,
  VerifyPaymentResponse,
  GetPaymentResponse,
} from "../types/payment.types";


// ======================================================
// CREATE PAYMENT ORDER
// ======================================================

export const createPaymentOrder = async (
  data: CreatePaymentOrderInput
): Promise<CreatePaymentOrderResponse> => {

  const response =
    await api.post<CreatePaymentOrderResponse>(
      "/student/payments/create-order",
      data
    );

  return response.data;
};


// ======================================================
// VERIFY PAYMENT
// ======================================================

export const verifyPayment = async (
  data: VerifyPaymentInput
): Promise<VerifyPaymentResponse> => {

  const response =
    await api.post<VerifyPaymentResponse>(
      "/student/payments/verify",
      data
    );

  return response.data;
};


// ======================================================
// GET PAYMENT BY ID
// ======================================================

export const getPaymentById = async (
  paymentId: string
): Promise<GetPaymentResponse> => {

  const response =
    await api.get<GetPaymentResponse>(
      `/student/payments/${paymentId}`
    );

  return response.data;
};