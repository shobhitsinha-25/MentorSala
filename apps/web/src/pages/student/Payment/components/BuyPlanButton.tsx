import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

import {
  createPaymentOrder,
  verifyPayment,
} from "../services/payment.api";

import {
  loadRazorpay,
} from "../utils/razorpay";

import type {
  VerifyPaymentResponse,
} from "../types/payment.types";

// ======================================================
// PROPS
// ======================================================

interface BuyPlanButtonProps {
  planId: string;

  planTitle: string;

  studentName?: string;

  studentEmail?: string;

  isSubscribed?: boolean;

  studentContact?: string;

  onSuccess?: (
    result: VerifyPaymentResponse
  ) => void;

  onError?: (
    message: string
  ) => void;
}

// ======================================================
// COMPONENT
// ======================================================

const BuyPlanButton = ({
  planId,
  planTitle,
  studentName,
  studentEmail,
  isSubscribed = false,
  studentContact,
  onSuccess,
  onError,
}: BuyPlanButtonProps) => {

  const [processing, setProcessing] =
    useState(false);


  // ====================================================
  // HIDE BUY BUTTON FOR CURRENT PLAN
  // ====================================================

  if (isSubscribed) {
    return null;
  }


  // ====================================================
  // ERROR HANDLER
  // ====================================================

  const handleError = (
    message: string
  ) => {

    setProcessing(false);

    onError?.(message);
  };


  // ====================================================
  // BUY PLAN
  // ====================================================

  const handleBuyPlan = async () => {

    if (processing) {
      return;
    }

    try {

      setProcessing(true);


      // ================================================
      // LOAD RAZORPAY
      // ================================================

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {

        handleError(
          "Unable to load payment gateway. Please try again."
        );

        return;
      }


      // ================================================
      // IDEMPOTENCY KEY
      // ================================================

      const idempotencyKey =
        crypto.randomUUID();


      // ================================================
      // CREATE PAYMENT ORDER
      // ================================================

      const orderResponse =
        await createPaymentOrder({

          planId,

          idempotencyKey,

        });


      // ================================================
      // VALIDATE ORDER
      // ================================================

      if (
        !orderResponse.razorpayOrder
      ) {

        handleError(
          "Unable to create payment order."
        );

        return;
      }


      if (
        !orderResponse.keyId
      ) {

        handleError(
          "Payment gateway configuration is missing."
        );

        return;
      }


      const {
        razorpayOrder,
        keyId,
      } = orderResponse;

      if (razorpayOrder.currency !== "INR") {
  handleError(
    "Invalid payment currency."
  );

  return;
}


      // ================================================
      // OPEN RAZORPAY CHECKOUT
      // ================================================

      const razorpay =
        new window.Razorpay({

          key:
            keyId,

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          name:
            "MentorSala",

          description:
            `${planTitle} subscription`,

          order_id:
            razorpayOrder.id,

          prefill: {

            name:
              studentName,

            email:
              studentEmail,

            contact:
              studentContact,

          },

          theme: {

            color:
              "#4f46e5",

          },


          // ==========================================
          // PAYMENT SUCCESS
          // ==========================================

          handler:
            async (
              razorpayResponse
            ) => {

              try {

                const verification =
                  await verifyPayment({

                    razorpay_order_id:
                      razorpayResponse
                        .razorpay_order_id,

                    razorpay_payment_id:
                      razorpayResponse
                        .razorpay_payment_id,

                    razorpay_signature:
                      razorpayResponse
                        .razorpay_signature,

                  });


                // ==================================
                // VERIFIED
                // ==================================

                if (
                  verification.success &&
                  verification.payment
                ) {

                  setProcessing(false);

                  onSuccess?.(
                    verification
                  );

                  return;
                }


                // ==================================
                // VERIFICATION FAILED
                // ==================================

                handleError(
                  "Payment verification failed."
                );

              } catch (
                error: any
              ) {

                console.error(
                  "Payment verification failed:",
                  error
                );

                handleError(
                  error?.response?.data?.message ||
                  "Payment verification failed. Please contact support."
                );

              }

            },


          // ==========================================
          // CHECKOUT DISMISSED
          // ==========================================

          modal: {

            ondismiss: () => {

              setProcessing(false);

            },

          },

        });


      // ================================================
      // OPEN CHECKOUT
      // ================================================

      razorpay.open();

    } catch (
      error: any
    ) {

      console.error(
        "Payment initialization failed:",
        error
      );

      handleError(
        error?.response?.data?.message ||
        "Unable to start payment. Please try again."
      );

    }

  };


  // ====================================================
  // UI
  // ====================================================

  return (

    <button
      type="button"
      onClick={handleBuyPlan}
      disabled={processing}
      className="
        inline-flex
        min-w-[180px]
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-indigo-600
        px-6
        py-3
        text-sm
        font-semibold
        text-white
        shadow-sm
        transition-all
        hover:bg-indigo-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500
        focus:ring-offset-2
      "
    >

      {processing ? (

        <>
          <Loader2
            size={18}
            className="animate-spin"
          />

          Processing...
        </>

      ) : (

        <>
          <CreditCard
            size={18}
          />

          Buy Plan
        </>

      )}

    </button>

  );
};

export default BuyPlanButton;