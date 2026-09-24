export type CreatePaymentOrderInput = {
  userId: string;
  planId: string;
  idempotencyKey: string;
};