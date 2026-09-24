import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Loader2,
} from "lucide-react";

import PaymentStatus from "../components/PaymentStatus";

import {
  getPaymentById,
} from "../services/payment.api";

import type {
  Payment,
  UserSubscription,
  PaymentStatus as BackendPaymentStatus,
} from "../types/payment.types";


// ======================================================
// LOCATION STATE
// ======================================================

interface PaymentResultState {

  paymentId?: string;

  message?: string;
}


// ======================================================
// PAYMENT RESULT
// ======================================================

const PaymentResult = () => {
const navigate =
  useNavigate();

const location =
  useLocation();

const { paymentId } =
  useParams<{ paymentId: string }>();


  // ====================================================
  // STATE
  // ====================================================

  const [payment, setPayment] =
    useState<Payment | null>(null);

  const [subscription, setSubscription] =
    useState<UserSubscription | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  // ====================================================
  // LOCATION STATE
  // ====================================================

 const state =
  location.state as
    | PaymentResultState
    | null;


  // ====================================================
  // FETCH PAYMENT
  // ====================================================

  useEffect(() => {

    let mounted = true;


    const fetchPayment =
      async () => {

        // ==============================================
        // PAYMENT ID NOT PROVIDED
        // ==============================================

        if (!paymentId) {

          if (mounted) {

            setError(
              "Payment information could not be found."
            );

            setLoading(false);

          }

          return;
        }


        try {

          setLoading(true);

          setError(null);


          // ============================================
          // GET PAYMENT FROM BACKEND
          // ============================================

          const response =
            await getPaymentById(
              paymentId
            );


          if (!mounted) {
            return;
          }


          // ============================================
          // SAVE PAYMENT
          // ============================================

          setPayment(
            response.payment
          );


          // ============================================
          // SAVE SUBSCRIPTION
          // ============================================

          setSubscription(
            response.subscription ?? null
          );

        } catch (err: any) {

          console.error(
            "Failed to load payment:",
            err
          );


          if (!mounted) {
            return;
          }


          setError(
            err?.response?.data?.message ||
            "Unable to load payment information."
          );

        } finally {

          if (mounted) {

            setLoading(false);

          }

        }

      };


    fetchPayment();


    return () => {

      mounted = false;

    };

  }, [paymentId]);


  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-10
        "
      >

        <div
          className="
            mx-auto
            flex
            min-h-[60vh]
            max-w-2xl
            items-center
            justify-center
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              gap-3
              text-center
            "
          >

            <Loader2
              size={32}
              className="
                animate-spin
                text-indigo-600
              "
            />

            <p
              className="
                text-sm
                font-medium
                text-gray-600
              "
            >
              Loading payment details...
            </p>

          </div>

        </div>

      </div>

    );

  }


  // ====================================================
  // ERROR / PAYMENT NOT FOUND
  // ====================================================

  if (
    error ||
    !payment
  ) {

    return (

      <div
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-10
        "
      >

        <div
          className="
            mx-auto
            max-w-2xl
          "
        >

          {/* ==========================================
              BACK
          =========================================== */}

          <button
            type="button"
            onClick={() =>
              navigate("/student/plans")
            }
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:text-gray-900
            "
          >

            <ArrowLeft
              size={17}
            />

            Back to Plans

          </button>


          {/* ==========================================
              ERROR
          =========================================== */}

          <PaymentStatus
            status="FAILED"
            title="Payment Result Not Found"
            message={
              error ||
              "We could not find the payment information."
            }
            actionLabel="Back to Plans"
            onAction={() =>
              navigate("/student/plans")
            }
          />

        </div>

      </div>

    );

  }


  // ====================================================
  // PAYMENT STATUS
  // ====================================================

  const paymentStatus:
    BackendPaymentStatus =
      payment.status;


  // ====================================================
  // SUCCESS
  // ====================================================

  if (
    paymentStatus === "CAPTURED" &&
    subscription
  ) {

    const startsAt =
      new Date(
        subscription.startsAt
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );


    const expiresAt =
      new Date(
        subscription.expiresAt
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );


    return (

      <div
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-10
        "
      >

        <div
          className="
            mx-auto
            max-w-2xl
          "
        >

          {/* ========================================
              BACK
          ========================================= */}

          <button
            type="button"
            onClick={() =>
              navigate("/student/plans")
            }
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:text-gray-900
            "
          >

            <ArrowLeft
              size={17}
            />

            Back to Plans

          </button>


          {/* ========================================
              SUCCESS
          ========================================= */}

          <PaymentStatus
            status="SUCCESS"
            title="Payment Successful"
            message={
              state?.message ||
              "Your payment has been verified successfully and your subscription is now active."
            }
            actionLabel="Go to Dashboard"
            onAction={() =>
              navigate("/student/dashboard")
            }
          />


          {/* ========================================
              SUBSCRIPTION DETAILS
          ========================================= */}

          <div
            className="
              mt-6
              rounded-xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
            "
          >

            <h3
              className="
                text-base
                font-semibold
                text-gray-900
              "
            >
              Subscription Details
            </h3>


            <div
              className="
                mt-5
                divide-y
                divide-gray-100
              "
            >

              {/* ====================================
                  PAYMENT ID
              ===================================== */}

              {payment.razorpayPaymentId && (

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    py-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <CreditCard
                      size={18}
                      className="text-gray-400"
                    />

                    <span
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Payment ID
                    </span>

                  </div>


                  <span
                    title={
                      payment.razorpayPaymentId
                    }
                    className="
                      max-w-[220px]
                      truncate
                      text-right
                      text-sm
                      font-medium
                      text-gray-900
                    "
                  >
                    {
                      payment.razorpayPaymentId
                    }
                  </span>

                </div>

              )}


              {/* ====================================
                  ORDER ID
              ===================================== */}

              {payment.razorpayOrderId && (

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    py-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <CreditCard
                      size={18}
                      className="text-gray-400"
                    />

                    <span
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Order ID
                    </span>

                  </div>


                  <span
                    title={
                      payment.razorpayOrderId
                    }
                    className="
                      max-w-[220px]
                      truncate
                      text-right
                      text-sm
                      font-medium
                      text-gray-900
                    "
                  >
                    {
                      payment.razorpayOrderId
                    }
                  </span>

                </div>

              )}


              {/* ====================================
                  AMOUNT
              ===================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-3
                "
              >

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Amount
                </span>


                <span
                  className="
                    text-sm
                    font-semibold
                    text-gray-900
                  "
                >
                  ₹
                  {(
                    payment.amount / 100
                  ).toFixed(2)}
                </span>

              </div>


              {/* ====================================
                  START DATE
              ===================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <CalendarDays
                    size={18}
                    className="text-gray-400"
                  />

                  <span
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Starts
                  </span>

                </div>


                <span
                  className="
                    text-sm
                    font-medium
                    text-gray-900
                  "
                >
                  {startsAt}
                </span>

              </div>


              {/* ====================================
                  EXPIRY DATE
              ===================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <CalendarDays
                    size={18}
                    className="text-gray-400"
                  />

                  <span
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Expires
                  </span>

                </div>


                <span
                  className="
                    text-sm
                    font-medium
                    text-gray-900
                  "
                >
                  {expiresAt}
                </span>

              </div>


              {/* ====================================
                  REMAINING SESSIONS
              ===================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-3
                "
              >

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Remaining Sessions
                </span>


                <span
                  className="
                    text-sm
                    font-semibold
                    text-gray-900
                  "
                >
                  {
                    subscription.remainingSessions
                  }
                </span>

              </div>

            </div>

          </div>


          {/* ========================================
              SECONDARY ACTION
          ========================================= */}

          <div
            className="
              mt-4
              text-center
            "
          >

            <button
              type="button"
              onClick={() =>
                navigate("/student/plans")
              }
              className="
                text-sm
                font-medium
                text-indigo-600
                hover:text-indigo-700
              "
            >
              View Other Plans
            </button>

          </div>

        </div>

      </div>

    );

  }


  // ====================================================
  // FAILED / REFUNDED
  // ====================================================

  if (
    paymentStatus === "FAILED" ||
    paymentStatus === "REFUNDED" ||
    paymentStatus ===
      "PARTIALLY_REFUNDED"
  ) {

    let title =
      "Payment Failed";


    if (
      paymentStatus ===
      "REFUNDED"
    ) {

      title =
        "Payment Refunded";

    }


    if (
      paymentStatus ===
      "PARTIALLY_REFUNDED"
    ) {

      title =
        "Payment Partially Refunded";

    }


    return (

      <div
        className="
          min-h-screen
          bg-gray-50
          px-4
          py-10
        "
      >

        <div
          className="
            mx-auto
            max-w-2xl
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate("/student/plans")
            }
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:text-gray-900
            "
          >

            <ArrowLeft
              size={17}
            />

            Back to Plans

          </button>


          <PaymentStatus
            status="FAILED"
            title={title}
            message={
              state?.message ||
              "We could not complete your subscription. If money was deducted, please contact support."
            }
            actionLabel="Try Again"
            onAction={() =>
              navigate("/student/plans")
            }
          />

        </div>

      </div>

    );

  }


  // ====================================================
  // PENDING / CREATED / AUTHORIZED
  // ====================================================

  return (

    <div
      className="
        min-h-screen
        bg-gray-50
        px-4
        py-10
      "
    >

      <div
        className="
          mx-auto
          max-w-2xl
        "
      >

        <button
          type="button"
          onClick={() =>
            navigate("/student/plans")
          }
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-gray-600
            transition
            hover:text-gray-900
          "
        >

          <ArrowLeft
            size={17}
          />

          Back to Plans

        </button>


        <PaymentStatus
          status="PENDING"
          title="Payment Processing"
          message={
            state?.message ||
            "Your payment is still being processed. Please wait while we confirm the transaction."
          }
          actionLabel="Back to Plans"
          onAction={() =>
            navigate("/student/plans")
          }
        />

      </div>

    </div>

  );
};


export default PaymentResult;