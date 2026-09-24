import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPlanById,
} from "./services/plan.api";

import type {
  SubscriptionPlan,
  TestType,
} from "./types/plan.types";


// ======================================================
// TEST TYPE LABELS
// ======================================================

const TEST_TYPE_LABELS: Record<
  TestType,
  string
> = {
  CHAPTER: "Chapter Tests",
  SUBJECT: "Subject Tests",
  MOCK: "Mock Tests",
  PYQ: "Previous Year Questions",
  PRACTICE: "Practice Questions",
};


// ======================================================
// COMPONENT
// ======================================================

const ViewPlan = () => {

  const navigate =
    useNavigate();

  const {
    planId,
  } = useParams<{
    planId: string;
  }>();


  // ====================================================
  // STATE
  // ====================================================

  const [plan, setPlan] =
    useState<SubscriptionPlan | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );


  // ====================================================
  // FETCH PLAN
  // ====================================================

  useEffect(() => {

    if (!planId) {

      setError(
        "Plan ID is missing."
      );

      setLoading(false);

      return;

    }


    const fetchPlan = async () => {

      try {

        setLoading(true);

        setError(null);


        const response =
          await getPlanById(
            planId
          );


        setPlan(
          response.plan
        );

      } catch (error: any) {

        setError(

          error?.response?.data?.message ||

          error?.message ||

          "Failed to load subscription plan."

        );

      } finally {

        setLoading(false);

      }

    };


    fetchPlan();

  }, [planId]);


  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {

    return (

      <div className="flex min-h-[400px] items-center justify-center">

        <p className="text-sm text-gray-500">
          Loading plan...
        </p>

      </div>

    );

  }


  // ====================================================
  // ERROR
  // ====================================================

  if (error) {

    return (

      <div className="p-6">

        <div className="rounded-lg border border-red-200 bg-red-50 p-4">

          <p className="text-sm text-red-600">
            {error}
          </p>

        </div>


        <button
          type="button"
          onClick={() =>
            navigate("/admin/plans")
          }
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Back to Plans
        </button>

      </div>

    );

  }


  // ====================================================
  // PLAN NOT FOUND
  // ====================================================

  if (!plan) {

    return (

      <div className="p-6">

        <p className="text-sm text-gray-500">
          Subscription plan not found.
        </p>


        <button
          type="button"
          onClick={() =>
            navigate("/admin/plans")
          }
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Plans
        </button>

      </div>

    );

  }


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mb-3 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Back
          </button>


          <h1 className="text-2xl font-semibold text-gray-900">
            {plan.title}
          </h1>


          <p className="mt-1 text-sm text-gray-500">
            Subscription plan details
          </p>

        </div>


        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              navigate(
                `/admin/plans/${plan.id}/edit`
              )
            }
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Edit Plan
          </button>

        </div>

      </div>


      {/* ==================================================
          STATUS
      ================================================== */}

      <div className="mb-6 flex flex-wrap gap-2">

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            plan.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {plan.isActive
            ? "Active"
            : "Inactive"}
        </span>


        {plan.isPopular && (

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            Popular
          </span>

        )}

      </div>


      {/* ==================================================
          BASIC INFORMATION
      ================================================== */}

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">

        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Basic Information
        </h2>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <InfoItem
            label="Plan Title"
            value={plan.title}
          />


          <InfoItem
            label="Exam Type"
            value={plan.examType}
          />


          <InfoItem
            label="Price"
            value={`₹${plan.price}`}
          />


          <InfoItem
            label="Duration"
            value={`${plan.durationInDays} days`}
          />


          <InfoItem
            label="Mentorship Sessions"
            value={`${plan.sessionsPerMonth} per month`}
          />


          <InfoItem
            label="Mentor Selection"
            value={
              plan.mentorSelectionEnabled
                ? "Enabled"
                : "Disabled"
            }
          />


          <InfoItem
            label="Priority Support"
            value={
              plan.prioritySupport
                ? "Enabled"
                : "Disabled"
            }
          />


          <InfoItem
            label="Unlimited Practice"
            value={
              plan.unlimitedPractice
                ? "Enabled"
                : "Disabled"
            }
          />

        </div>


        {plan.description && (

          <div className="mt-6">

            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              Description
            </p>

            <p className="text-sm leading-6 text-gray-700">
              {plan.description}
            </p>

          </div>

        )}

      </div>


      {/* ==================================================
          PRACTICE QUESTIONS
      ================================================== */}

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">

        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Practice Questions
        </h2>


        <div>

          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            Practice Question Limit
          </p>


          <p className="text-sm font-medium text-gray-900">

            {plan.unlimitedPractice

              ? "Unlimited"

              : plan.practiceQuestionsLimit !== null
                ? plan.practiceQuestionsLimit
                : "Not configured"

            }

          </p>

        </div>

      </div>


      {/* ==================================================
          TEST LIMITS
      ================================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-6">

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Test Limits
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Access configured for each test type.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b border-gray-200">

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Test Type
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Access
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Limit
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Period
                </th>

              </tr>

            </thead>


            <tbody>

              {plan.testLimits.map(
                (testLimit) => (

                  <tr
                    key={
                      testLimit.id
                    }
                    className="border-b border-gray-100 last:border-0"
                  >

                    <td className="px-4 py-4">

                      <p className="text-sm font-medium text-gray-900">

                        {
                          TEST_TYPE_LABELS[
                            testLimit.testType
                          ]
                        }

                      </p>

                    </td>


                    <td className="px-4 py-4">

                      <AccessBadge
                        limitType={
                          testLimit.limitType
                        }
                      />

                    </td>


                    <td className="px-4 py-4 text-sm text-gray-700">

                      {testLimit.limitType ===
                        "LIMITED"

                        ? testLimit.limit ??
                          "—"

                        : "—"

                      }

                    </td>


                    <td className="px-4 py-4 text-sm text-gray-700">

                      {testLimit.limitType ===
                        "LIMITED"

                        ? testLimit.period ??
                          "—"

                        : "—"

                      }

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==================================================
          METADATA
      ================================================== */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">

        <h2 className="mb-5 text-lg font-semibold text-gray-900">
          Plan Information
        </h2>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <InfoItem
            label="Plan ID"
            value={plan.id}
          />


          <InfoItem
            label="Created At"
            value={
              new Date(
                plan.createdAt
              ).toLocaleString()
            }
          />


          <InfoItem
            label="Last Updated"
            value={
              new Date(
                plan.updatedAt
              ).toLocaleString()
            }
          />

        </div>

      </div>

    </div>

  );

};


// ======================================================
// INFO ITEM
// ======================================================

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem = ({
  label,
  value,
}: InfoItemProps) => {

  return (

    <div>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="break-words text-sm font-medium text-gray-900">
        {value}
      </p>

    </div>

  );

};


// ======================================================
// ACCESS BADGE
// ======================================================

interface AccessBadgeProps {
  limitType:
    | "LIMITED"
    | "UNLIMITED"
    | "NOT_ALLOWED";
}

const AccessBadge = ({
  limitType,
}: AccessBadgeProps) => {

  if (
    limitType ===
    "UNLIMITED"
  ) {

    return (

      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        Unlimited
      </span>

    );

  }


  if (
    limitType ===
    "NOT_ALLOWED"
  ) {

    return (

      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        Not Allowed
      </span>

    );

  }


  return (

    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
      Limited
    </span>

  );

};


export default ViewPlan;