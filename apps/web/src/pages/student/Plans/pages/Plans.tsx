import {
  RefreshCw,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PlanCard from "../components/PlanCard";
import PlanSkeleton from "../components/PlanSkeleton";
import EmptyPlans from "../components/EmptyPlans";

import { getStudentPlans } from "../services/plan.api";

import type {
  StudentSubscriptionPlan,
} from "../types/plan.types";


// ======================================================
// DURATION FILTER TYPE
// ======================================================

type DurationFilter =
  | "ALL"
  | "MONTHLY"
  | "THREE_MONTHS"
  | "SIX_MONTHS"
  | "YEARLY";


// ======================================================
// DURATION FILTERS
// ======================================================

const durationFilters: {
  label: string;
  value: DurationFilter;
}[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    label: "3 Months",
    value: "THREE_MONTHS",
  },
  {
    label: "6 Months",
    value: "SIX_MONTHS",
  },
  {
    label: "Yearly",
    value: "YEARLY",
  },
];


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

    const backendMessage =
      response?.data?.message;

    if (
      typeof backendMessage === "string" &&
      backendMessage.trim().length > 0
    ) {

      switch (
        backendMessage
          .trim()
          .toLowerCase()
      ) {

        case "unauthorized":
        case "authentication required":
        case "invalid token":
        case "token expired":
          return "Your session has expired. Please log in again.";

        case "student access required":
        case "only students can access plans":
          return "Only student accounts can view subscription plans.";

        case "no active plans found":
        case "subscription plans not found":
        case "plans not found":
          return "No subscription plans are currently available.";

        default:
          return backendMessage;
      }
    }

    // ==================================================
    // FALLBACK BY STATUS
    // ==================================================

    switch (status) {

      case 400:
        return "We couldn't process your request. Please try again.";

      case 401:
        return "Your session has expired. Please log in again.";

      case 403:
        return "You don't have permission to view subscription plans.";

      case 404:
        return "No subscription plans are currently available.";

      case 409:
        return "The subscription plans are currently unavailable. Please try again.";

      case 429:
        return "Too many requests. Please wait a moment and try again.";

      case 500:
        return "Something went wrong on our server. Please try again shortly.";

      case 502:
      case 503:
      case 504:
        return "The subscription service is temporarily unavailable. Please try again shortly.";

      default:
        return "Failed to load subscription plans. Please try again.";
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

  return "Failed to load subscription plans. Please try again.";
};


// ======================================================
// COMPONENT
// ======================================================

const Plans = () => {

  const navigate = useNavigate();


  // ====================================================
  // STATE
  // ====================================================

  const [plans, setPlans] = useState<
    StudentSubscriptionPlan[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [selectedDuration, setSelectedDuration] =
    useState<DurationFilter>("ALL");


  // ====================================================
  // FETCH PLANS
  // ====================================================

  const fetchPlans = useCallback(
    async () => {

      try {

        setLoading(true);
        setError(null);

        const response =
          await getStudentPlans();

        setPlans(
          response.plans
        );

      } catch (error: unknown) {

        console.error(
          "Failed to load student plans:",
          error
        );

        // ==================================================
        // CONVERT BACKEND ERROR
        // ==================================================

        const message =
          getUserFriendlyError(
            error
          );

        setError(message);

        // ==================================================
        // SHOW ERROR USING TOAST
        // ==================================================

        toast.error(
          message
        );

      } finally {

        setLoading(false);

      }

    },
    []
  );


  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {

    fetchPlans();

  }, [fetchPlans]);


  // ====================================================
  // FILTER PLANS
  // ====================================================

  const filteredPlans =
    useMemo(() => {

      if (
        selectedDuration === "ALL"
      ) {
        return plans;
      }

      return plans.filter(
        (plan) => {

          switch (
            selectedDuration
          ) {

            case "MONTHLY":
              return (
                plan.durationInDays === 30
              );

            case "THREE_MONTHS":
              return (
                plan.durationInDays === 90
              );

            case "SIX_MONTHS":
              return (
                plan.durationInDays === 180
              );

            case "YEARLY":
              return (
                plan.durationInDays === 365
              );

            default:
              return true;
          }

        }
      );

    }, [
      plans,
      selectedDuration,
    ]);


  // ====================================================
  // MAIN PAGE
  // ====================================================

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* ==================================================
            DURATION FILTER
            ================================================== */}

        {!loading &&
          !error &&
          plans.length > 0 && (

            <div
              className="
                mb-6
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-purple-100
                bg-white
                p-2
                shadow-sm
                sm:justify-start
              "
            >

              {durationFilters.map(
                (filter) => {

                  const isActive =
                    selectedDuration ===
                    filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() =>
                        setSelectedDuration(
                          filter.value
                        )
                      }
                      className={`
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:ring-offset-1
                        ${
                          isActive
                            ? `
                              bg-blue-600
                              text-white
                              shadow-sm
                              shadow-blue-600/20
                            `
                            : `
                              bg-transparent
                              text-slate-600
                              hover:bg-blue-50
                              hover:text-blue-700
                            `
                        }
                      `}
                    >
                      {filter.label}
                    </button>
                  );

                }
              )}

            </div>
          )}


        {/* ==================================================
            LOADING
            ================================================== */}

        {loading && (
          <div
            className="
              grid
              grid-cols-1
              gap-6
            "
          >

            {Array.from({
              length: 2,
            }).map((_, index) => (
              <PlanSkeleton
                key={index}
              />
            ))}

          </div>
        )}


        {/* ==================================================
            EMPTY
            ================================================== */}

        {!loading &&
          !error &&
          plans.length === 0 && (
            <EmptyPlans
              onRetry={fetchPlans}
              onBack={() =>
                navigate(-1)
              }
            />
          )}


        {/* ==================================================
            FILTERED PLANS EMPTY
            ================================================== */}

        {!loading &&
          !error &&
          plans.length > 0 &&
          filteredPlans.length === 0 && (

            <div
              className="
                flex
                min-h-[300px]
                items-center
                justify-center
                rounded-2xl
                border
                border-purple-100
                bg-white
                p-8
              "
            >

              <div
                className="
                  text-center
                "
              >

                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  No Plans Available
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  There are no plans available
                  for this duration right now.
                </p>

              </div>

            </div>
          )}


        {/* ==================================================
            PLANS
            ================================================== */}

        {!loading &&
          !error &&
          filteredPlans.length > 0 && (

            <div
              className="
                grid
                grid-cols-1
                gap-6
              "
            >

              {filteredPlans.map(
                (plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                  />
                )
              )}

            </div>
          )}

      </div>

    </div>
  );
};


export default Plans;