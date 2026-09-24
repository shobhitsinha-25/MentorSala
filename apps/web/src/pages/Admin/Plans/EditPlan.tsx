import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PlanForm from "./components/PlanForm";

import {
  getPlanById,
} from "./services/plan.api";

import type {
  SubscriptionPlan,
} from "./types/plan.types";


// ======================================================
// COMPONENT
// ======================================================

const EditPlan = () => {

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

      <div>

        <p>
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

      <div>

        <p>
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/admin/plans")
          }
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

      <div>

        <p>
          Subscription plan not found.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/admin/plans")
          }
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

    <div>

      {/* ==================================================
          HEADER
      ================================================== */}

      <div>

        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
        >
          Back
        </button>


        <h1>
          Edit Subscription Plan
        </h1>


        <p>
          Update the plan details, features,
          and test limits.
        </p>

      </div>


      {/* ==================================================
          PLAN FORM
      ================================================== */}

      <PlanForm

        mode="edit"

        planId={
          plan.id
        }

        initialData={{

          title:
            plan.title,

          description:
            plan.description ??
            undefined,

          examType:
            plan.examType,

          price:
            plan.price,

          durationInDays:
            plan.durationInDays,

          sessionsPerMonth:
            plan.sessionsPerMonth,

          isPopular:
            plan.isPopular,

          isActive:
            plan.isActive,

          testLimits:
            plan.testLimits.map(
              (item) => ({

                testType:
                  item.testType,

                limitType:
                  item.limitType,

                limit:
                  item.limit,

                period:
                  item.period,

              })
            ),

        }}

        onSuccess={() => {

          navigate(
            "/admin/plans"
          );

        }}

        onCancel={() => {

          navigate(-1);

        }}

      />

    </div>

  );

};


export default EditPlan;