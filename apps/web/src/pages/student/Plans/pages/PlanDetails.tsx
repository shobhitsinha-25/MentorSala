import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  RefreshCw,
  Users,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PlanFeatures from "../components/PlanFeatures";
import PlanTestLimits from "../components/PlanTestLimits";

import {
  getStudentPlanById,
} from "../services/plan.api";

import type {
  StudentSubscriptionPlan,
} from "../types/plan.types";

import BuyPlanButton from "../../Payment/components/BuyPlanButton";

import {
  useAuthStore,
} from "../../../../store/auth.store";


// ======================================================
// ERROR HANDLER
// ======================================================

const getUserFriendlyError = (
  error: unknown
): string => {

  // ====================================================
  // AXIOS RESPONSE ERROR
  // ====================================================

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {

    const response = (
      error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    const status =
      response?.status;

    // ==================================================
    // BACKEND MESSAGE
    // ==================================================
    //
    // If the backend sends a meaningful business error,
    // show that exact message to the user.
    //

    const backendMessage =
      response?.data?.message;

    if (
      typeof backendMessage === "string" &&
      backendMessage.trim().length > 0
    ) {
      return backendMessage;
    }

    // ==================================================
    // FALLBACK BY HTTP STATUS
    // ==================================================

    switch (status) {

      case 400:
        return "The request could not be completed. Please check the details and try again.";

      case 401:
        return "Your session has expired. Please log in again.";

      case 403:
        return "You are not allowed to access this plan.";

      case 404:
        return "This subscription plan could not be found or is no longer available.";

      case 409:
        return "This plan is currently unavailable. Please try again.";

      case 422:
        return "The selected plan could not be processed. Please try again.";

      case 429:
        return "Too many requests. Please wait a moment and try again.";

      case 500:
      case 502:
      case 503:
      case 504:
        return "Something went wrong on our side. Please try again shortly.";

      default:
        return "Failed to load this plan. Please try again.";
    }
  }

  // ====================================================
  // NETWORK ERROR
  // ====================================================

  if (
    typeof error === "object" &&
    error !== null &&
    "request" in error
  ) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // ====================================================
  // FALLBACK
  // ====================================================

  return "Failed to load this plan. Please try again.";
};


// ======================================================
// COMPONENT
// ======================================================

const PlanDetails = () => {

  const navigate = useNavigate();

  const {
    planId,
  } = useParams<{
    planId: string;
  }>();

  const user =
    useAuthStore(
      (state) => state.user
    );


  // ====================================================
  // STATE
  // ====================================================

  const [plan, setPlan] =
    useState<StudentSubscriptionPlan | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  // ====================================================
  // FETCH PLAN
  // ====================================================

  const fetchPlan = useCallback(
    async () => {

      if (!planId) {

        setError(
          "Plan ID is missing."
        );

        setLoading(false);

        return;
      }

      try {

        setLoading(true);
        setError(null);

        const response =
          await getStudentPlanById(
            planId
          );

        setPlan(
          response.plan
        );

      } catch (error: unknown) {

        console.error(
          "Failed to load plan:",
          error
        );

        // ==================================================
        // SHOW MEANINGFUL BACKEND ERROR
        // ==================================================

        const message =
          getUserFriendlyError(
            error
          );

        setError(message);

      } finally {

        setLoading(false);

      }

    },
    [planId]
  );


  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {

    fetchPlan();

  }, [fetchPlan]);


  // ====================================================
  // LOADING STATE
  // ====================================================

  if (loading) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-white
          px-4
        "
      >

        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >

          <Loader2
            size={32}
            className="
              animate-spin
              text-purple-600
            "
          />

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Loading plan...
          </p>

        </div>

      </div>
    );
  }


  // ====================================================
  // ERROR STATE
  // ====================================================

  if (error || !plan) {

    return (
      <div
        className="
          min-h-screen
          bg-white
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >

        <div
          className="
            mx-auto
            max-w-4xl
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-600
              hover:text-purple-600
              transition
            "
          >
            <ArrowLeft size={17} />

            Back to Plans
          </button>


          <div
            className="
              flex
              min-h-[400px]
              items-center
              justify-center
              rounded-2xl
              border
              border-red-100
              bg-white
              p-8
              shadow-sm
            "
          >

            <div
              className="
                flex
                max-w-md
                flex-col
                items-center
                text-center
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                  text-red-500
                "
              >
                <AlertCircle size={30} />
              </div>


              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Unable to Load Plan
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {error ||
                  "This plan is no longer available."}
              </p>


              <div
                className="
                  mt-6
                  flex
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(-1)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-purple-200
                    bg-white
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-slate-700
                    hover:bg-purple-50
                    hover:text-purple-700
                    transition
                  "
                >
                  <ArrowLeft size={16} />

                  Back
                </button>


                {planId && (
                  <button
                    type="button"
                    onClick={fetchPlan}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-purple-600
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      shadow-purple-600/20
                      hover:bg-purple-700
                      hover:shadow-md
                      transition
                    "
                  >
                    <RefreshCw size={16} />

                    Try Again
                  </button>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }


  // ====================================================
  // PRICE
  // ====================================================

  const formattedPayablePrice =
    new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(plan.payablePrice);


  const formattedOriginalPrice =
    new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(plan.price);


  // ====================================================
  // MAIN
  // ====================================================

  return (
    <div
      className="
        min-h-screen
        bg-white
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          mx-auto
          max-w-5xl
        "
      >

        {/* ==================================================
            BACK
            ================================================== */}

        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-600
            transition
            hover:text-purple-600
          "
        >
          <ArrowLeft size={17} />

          Back
        </button>


        {/* ==================================================
            PLAN HEADER
            ================================================== */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-purple-100
            bg-white
            shadow-sm
          "
        >

          <div
            className="
              bg-gradient-to-br
              from-purple-50/60
              to-white
              p-6
              sm:p-8
            "
          >

            {/* Popular */}

            {plan.isPopular && (
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-purple-200
                  bg-purple-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-purple-700
                "
              >
                <CheckCircle2
                  size={14}
                  className="text-purple-600"
                />

                Most Popular
              </div>
            )}


            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >

              {/* Title */}

              <div
                className="
                  max-w-2xl
                "
              >

                <h1
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-900
                    sm:text-3xl
                  "
                >
                  {plan.title}
                </h1>


                {plan.description && (
                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-600
                      sm:text-base
                    "
                  >
                    {plan.description}
                  </p>
                )}

              </div>


              {/* Price */}

              <div
                className="
                  shrink-0
                  lg:text-right
                "
              >

                <div
                  className="
                    text-3xl
                    font-bold
                    text-slate-900
                    sm:text-4xl
                  "
                >
                  {formattedPayablePrice}
                </div>


                {plan.isUpgrade && (
                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      text-purple-600
                    "
                  >
                    Upgrade price
                  </p>
                )}


                {plan.isUpgrade && (
                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-400
                    "
                  >
                    Original price:{" "}
                    <span className="line-through">
                      {formattedOriginalPrice}
                    </span>
                  </p>
                )}


                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Valid for{" "}
                  <span
                    className="
                      font-semibold
                      text-slate-800
                    "
                  >
                    {plan.durationInDays}
                  </span>{" "}
                  days
                </p>

              </div>

            </div>


            {/* ==================================================
                QUICK INFO
                ================================================== */}

            <div
              className="
                mt-7
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-purple-100
                  bg-purple-50/50
                  p-4
                "
              >

                <CalendarDays
                  size={20}
                  className="text-purple-600"
                />

                <div>

                  <p
                    className="
                      text-xs
                      text-purple-700/80
                    "
                  >
                    Duration
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    {plan.durationInDays} days
                  </p>

                </div>

              </div>


              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-purple-100
                  bg-purple-50/50
                  p-4
                "
              >

                <Users
                  size={20}
                  className="text-purple-600"
                />

                <div>

                  <p
                    className="
                      text-xs
                      text-purple-700/80
                    "
                  >
                    Mentor Sessions
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    {plan.sessionsPerMonth}
                    {" "}
                    / month
                  </p>

                </div>

              </div>


              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-purple-100
                  bg-purple-50/50
                  p-4
                "
              >

                <CreditCard
                  size={20}
                  className="text-purple-600"
                />

                <div>

                  <p
                    className="
                      text-xs
                      text-purple-700/80
                    "
                  >
                    Exam
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    {plan.examType}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ==================================================
              FEATURES
              ================================================== */}

          <div
            className="
              border-t
              border-purple-50
              p-6
              sm:p-8
            "
          >

            <h2
              className="
                mb-5
                text-lg
                font-bold
                text-slate-900
              "
            >
              What's Included
            </h2>

            <PlanFeatures
              plan={plan}
            />

          </div>


          {/* ==================================================
              TEST ACCESS
              ================================================== */}

          <div
            className="
              border-t
              border-purple-50
              p-6
              sm:p-8
            "
          >

            <h2
              className="
                text-lg
                font-bold
                text-slate-900
              "
            >
              Test Access
            </h2>

            <p
              className="
                mt-1
                mb-5
                text-sm
                text-slate-500
              "
            >
              Your access to different test types
              under this subscription.
            </p>

            <PlanTestLimits
              testLimits={
                plan.testLimits
              }
            />

          </div>


          {/* ==================================================
              PURCHASE SECTION
              ================================================== */}

          <div
            className="
              border-t
              border-purple-100
              bg-purple-50/30
              p-6
              sm:p-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  {plan.isUpgrade
                    ? "Ready to upgrade?"
                    : "Ready to get started?"}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-600
                  "
                >
                  {plan.isUpgrade
                    ? "Upgrade your plan and unlock the additional features."
                    : "Subscribe to this plan and start using your included features."}
                </p>

              </div>


              {/* ==================================================
                  BUY BUTTON
                  ================================================== */}

              <BuyPlanButton
                planId={plan.id}
                planTitle={plan.title}
                studentName={user?.name}
                studentEmail={user?.email}

                isSubscribed={
                  plan.isSubscribed
                }

                onSuccess={(verification) => {

                  navigate(
                    `/student/payment/result/${verification.payment.id}`
                  );

                }}

                onError={(message) => {

                  console.error(
                    "Payment failed:",
                    message
                  );

                }}
              />

            </div>


            <p
              className="
                mt-4
                text-xs
                text-slate-400
              "
            >
              Secure payment will be available
              through Razorpay.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


export default PlanDetails;