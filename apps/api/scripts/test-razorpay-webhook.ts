import crypto from "crypto";

const webhookSecret =
  process.env.RAZORPAY_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error(
    "RAZORPAY_WEBHOOK_SECRET is missing."
  );
}

const payload = JSON.stringify({

  entity: "event",

  account_id: "acc_test",

  event: "payment.captured",

  contains: [
    "payment",
  ],

  payload: {

    payment: {

      entity: {

        id: "pay_test_123",

        order_id: "order_test_123",

        amount: 100000,

        currency: "INR",

        status: "captured",

        method: "card",

        email: "test@example.com",

        contact: "9999999999",

      },

    },

  },

});

const signature =
  crypto
    .createHmac(
      "sha256",
      webhookSecret
    )
    .update(payload)
    .digest("hex");

console.log(
  "Payload:"
);

console.log(payload);

console.log(
  "\nSignature:"
);

console.log(signature);