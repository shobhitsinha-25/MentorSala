import { useState } from "react";

import {
  createPlan,
  updatePlan,
} from "../services/plan.api";

import TestLimitForm from "./TestLimitForm";

import type {
  CreatePlanInput,
  PlanTestLimitFormData,
} from "../types/plan.types";

import {
  createPlanSchema,
  updatePlanSchema,
} from "../validation/plan.validation";

// ======================================================
// PROPS
// ======================================================

interface PlanFormProps {
  mode: "create" | "edit";

  /**
   * Required when mode === "edit".
   */
  planId?: string;

  /**
   * Existing plan data used to populate
   * the form in edit mode.
   */
  initialData?: Partial<CreatePlanInput>;

  onSuccess: () => void;

  onCancel: () => void;
}

// ======================================================
// DEFAULT TEST LIMITS
// ======================================================

/**
 * Defaults for PAID plans.
 *
 * Paid test limits use MONTHLY entitlement periods.
 */
const createDefaultPaidTestLimits =
  (): PlanTestLimitFormData[] => [
    {
      testType: "CHAPTER",
      limitType: "LIMITED",
      limit: 10,
      period: "MONTHLY",
    },

    {
      testType: "SUBJECT",
      limitType: "LIMITED",
      limit: 5,
      period: "MONTHLY",
    },

    {
      testType: "MOCK",
      limitType: "LIMITED",
      limit: 2,
      period: "MONTHLY",
    },

    {
      testType: "PYQ",
      limitType: "LIMITED",
      limit: 1,
      period: "MONTHLY",
    },

    {
      testType: "PRACTICE",
      limitType: "UNLIMITED",
      limit: null,
      period: null,
    },
  ];

/**
 * Defaults for TRIAL plans.
 *
 * Trial usage does NOT reset monthly.
 *
 * The entire trial subscription is one
 * entitlement period.
 *
 * These are only starting values for the
 * admin form. Admin can change them.
 */
const createDefaultTrialTestLimits =
  (): PlanTestLimitFormData[] => [
    {
      testType: "CHAPTER",
      limitType: "LIMITED",
      limit: 3,
      period: "SUBSCRIPTION",
    },

    {
      testType: "SUBJECT",
      limitType: "LIMITED",
      limit: 1,
      period: "SUBSCRIPTION",
    },

    {
      testType: "MOCK",
      limitType: "LIMITED",
      limit: 1,
      period: "SUBSCRIPTION",
    },

    {
      testType: "PYQ",
      limitType: "LIMITED",
      limit: 1,
      period: "SUBSCRIPTION",
    },

    {
      testType: "PRACTICE",
      limitType: "UNLIMITED",
      limit: null,
      period: null,
    },
  ];

// ======================================================
// COMPONENT
// ======================================================

const PlanForm = ({
  mode,
  planId,
  initialData,
  onSuccess,
  onCancel,
}: PlanFormProps) => {

  // ====================================================
  // BASIC INFORMATION
  // ====================================================

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [description, setDescription] =
    useState(
      initialData?.description ?? ""
    );

  // ====================================================
  // PLAN DETAILS
  // ====================================================

  const [examType, setExamType] =
    useState<CreatePlanInput["examType"]>(
      initialData?.examType ?? "JEE"
    );

  const [level, setLevel] =
    useState(
      initialData?.level?.toString() ?? "1"
    );

  const [price, setPrice] =
    useState(
      initialData?.price?.toString() ?? ""
    );

  const [durationInDays, setDurationInDays] =
    useState(
      initialData?.durationInDays?.toString() ?? ""
    );

  const [sessionsPerMonth, setSessionsPerMonth] =
    useState(
      initialData?.sessionsPerMonth?.toString() ?? ""
    );

  // ====================================================
  // PLAN TYPE
  // ====================================================

  const [isTrial, setIsTrial] =
    useState(
      initialData?.isTrial ?? false
    );

  // ====================================================
  // PLAN SETTINGS
  // ====================================================

  const [isPopular, setIsPopular] =
    useState(
      initialData?.isPopular ?? false
    );

  const [isActive, setIsActive] =
    useState(
      initialData?.isActive ?? true
    );

  // ====================================================
  // TEST LIMITS
  // ====================================================

  const [testLimits, setTestLimits] =
    useState<PlanTestLimitFormData[]>(
      initialData?.testLimits
        ? initialData.testLimits.map((item) => ({
            testType: item.testType,
            limitType: item.limitType,
            limit: item.limit ?? null,

            /*
             * Trial plans use SUBSCRIPTION.
             * Paid plans use MONTHLY.
             */
            period: item.period ?? (
              initialData?.isTrial
                ? "SUBSCRIPTION"
                : "MONTHLY"
            ),
          }))
        : initialData?.isTrial
        ? createDefaultTrialTestLimits()
        : createDefaultPaidTestLimits()
    );

  // ====================================================
  // FORM STATE
  // ====================================================

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  // ====================================================
  // UPDATE TEST LIMIT
  // ====================================================

  const updateTestLimit = (
    index: number,
    value: PlanTestLimitFormData
  ) => {
    setTestLimits((current) => {
      const updated = [...current];

      updated[index] = value;

      return updated;
    });
  };

  // ====================================================
  // HANDLE PLAN TYPE CHANGE
  // ====================================================

  const handleTrialChange = (
    checked: boolean
  ) => {
    setIsTrial(checked);

    /*
     * Trial plans are always free.
     */
    if (checked) {
      setPrice("0");

      /*
       * A trial plan is not a paid tier,
       * so Popular is not meaningful.
       */
      setIsPopular(false);

      /*
       * Change existing test-limit periods
       * to the correct trial entitlement period.
       */
      setTestLimits((current) =>
        current.map((item) => {
          if (
            item.limitType === "LIMITED"
          ) {
            return {
              ...item,
              period: "SUBSCRIPTION",
            };
          }

          return {
            ...item,
            limit: null,
            period: null,
          };
        })
      );

      return;
    }

    /*
     * Switching back to paid plan.
     *
     * Existing limits remain, but LIMITED
     * limits use MONTHLY entitlement.
     */
    setTestLimits((current) =>
      current.map((item) => {
        if (
          item.limitType === "LIMITED"
        ) {
          return {
            ...item,
            period: "MONTHLY",
          };
        }

        return {
          ...item,
          limit: null,
          period: null,
        };
      })
    );

    /*
     * Don't force a paid price.
     * Admin must enter it.
     */
    setPrice("");
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrors({});
    setSubmitError(null);

    // ================================================
    // VALIDATE EDIT PLAN ID
    // ================================================

    if (
      mode === "edit" &&
      !planId
    ) {
      setSubmitError(
        "Plan ID is required for editing."
      );

      return;
    }

    // ================================================
    // PREPARE DATA
    // ================================================

    const data: CreatePlanInput = {
      title: title.trim(),

      description:
        description.trim() || undefined,

      examType,

      level:
        Number(level),

      /*
       * Trial plans are always free.
       */
      price:
        isTrial
          ? 0
          : Number(price),

      durationInDays:
        Number(durationInDays),

      sessionsPerMonth:
        Number(sessionsPerMonth),

      isTrial,

      /*
       * Trial plans should not be marked popular.
       */
      isPopular:
        isTrial
          ? false
          : isPopular,

      isActive,

      testLimits:
        testLimits.map((item) => {

          /*
           * LIMITED
           */
          if (
            item.limitType === "LIMITED"
          ) {
            return {
              testType:
                item.testType,

              limitType:
                item.limitType,

              limit:
                item.limit ?? 0,

              /*
               * Enforce the correct period
               * based on plan type.
               */
              period:
                isTrial
                  ? "SUBSCRIPTION"
                  : "MONTHLY",
            };
          }

          /*
           * UNLIMITED / NOT_ALLOWED
           *
           * These must not contain limit
           * or period.
           */
          return {
            testType:
              item.testType,

            limitType:
              item.limitType,
          };
        }),
    };

    // ==================================================
    // FRONTEND VALIDATION
    // ==================================================

    if (mode === "create") {

      const validation =
        createPlanSchema.safeParse(
          data
        );

      if (!validation.success) {

        const fieldErrors:
          Record<string, string> = {};

        validation.error.issues.forEach(
          (issue) => {

            const path =
              issue.path.join(".");

            if (
              !fieldErrors[path]
            ) {
              fieldErrors[path] =
                issue.message;
            }
          }
        );

        setErrors(
          fieldErrors
        );

        return;
      }

      // ================================================
      // CREATE API REQUEST
      // ================================================

      try {

        setSubmitting(true);

        await createPlan(
          validation.data
        );

        onSuccess();

      } catch (error: any) {

        setSubmitError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to create subscription plan."
        );

      } finally {

        setSubmitting(false);
      }

    } else {

      // ==================================================
      // UPDATE
      // ==================================================

      const validation =
        updatePlanSchema.safeParse(
          data
        );

      if (!validation.success) {

        const fieldErrors:
          Record<string, string> = {};

        validation.error.issues.forEach(
          (issue) => {

            const path =
              issue.path.join(".");

            if (
              !fieldErrors[path]
            ) {
              fieldErrors[path] =
                issue.message;
            }
          }
        );

        setErrors(
          fieldErrors
        );

        return;
      }

      // ================================================
      // UPDATE API REQUEST
      // ================================================

      try {

        setSubmitting(true);

        await updatePlan(
          planId!,
          validation.data
        );

        onSuccess();

      } catch (error: any) {

        setSubmitError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to update subscription plan."
        );

      } finally {

        setSubmitting(false);
      }
    }
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-8 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-900"
    >

      {/* ==================================================
          API ERROR
      ================================================== */}

      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm font-semibold text-rose-800">
          {submitError}
        </div>
      )}

      {/* ==================================================
          BASIC INFORMATION
      ================================================== */}

      <section className="space-y-4">

        <div className="border-b border-slate-100 pb-3">

          <h2 className="text-lg font-bold text-slate-900">
            Basic Information
          </h2>

          <p className="text-xs font-medium text-slate-600 mt-0.5">
            Identify the plan and write an overview for students.
          </p>

        </div>

        <div className="space-y-4">

          {/* TITLE */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Plan Title
            </label>

            <input
              type="text"
              value={title}
              maxLength={100}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder={
                isTrial
                  ? "JEE Free Trial"
                  : "JEE Starter"
              }
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                errors.title
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            />

            {errors.title && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.title}
              </p>
            )}

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Description
            </label>

            <textarea
              value={description}
              maxLength={1000}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder={
                isTrial
                  ? "Describe what students can access during the free trial..."
                  : "Describe this subscription plan..."
              }
              rows={4}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                errors.description
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            />

            {errors.description && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.description}
              </p>
            )}

          </div>

        </div>

      </section>

      {/* ==================================================
          PLAN DETAILS
      ================================================== */}

      <section className="space-y-4">

        <div className="border-b border-slate-100 pb-3">

          <h2 className="text-lg font-bold text-slate-900">
            Plan Details
          </h2>

          <p className="text-xs font-medium text-slate-600 mt-0.5">
            Specify exam target, pricing structure, and terms.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* EXAM TYPE */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Exam Type
            </label>

            <select
              value={examType}
              onChange={(event) =>
                setExamType(
                  event.target.value as CreatePlanInput["examType"]
                )
              }
              className={`w-full px-3 py-2.5 text-sm bg-white border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                errors.examType
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            >

              <option value="JEE">
                JEE
              </option>

              <option value="WBJEE">
                WBJEE
              </option>

              <option value="BOARDS">
                Boards
              </option>

            </select>

            {errors.examType && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.examType}
              </p>
            )}

          </div>

          {/* PLAN LEVEL */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Plan Level
            </label>

            <input
              type="number"
              min={1}
              step="1"
              value={level}
              onChange={(event) =>
                setLevel(
                  event.target.value
                )
              }
              placeholder="1"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                errors.level
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            />

            <p className="text-xs text-slate-500 mt-1">
              Higher level means a higher-tier paid plan.
            </p>

            {errors.level && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.level}
              </p>
            )}

          </div>

          {/* PRICE */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Price (₹)
            </label>

            <input
              type="number"
              min={isTrial ? 0 : 1}
              step="0.01"
              value={price}
              disabled={isTrial}
              onChange={(event) =>
                setPrice(
                  event.target.value
                )
              }
              placeholder={
                isTrial
                  ? "0"
                  : "999"
              }
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                errors.price
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            />

            {isTrial && (
              <p className="text-xs text-emerald-600 mt-1 font-semibold">
                Free trial plans always have a price of ₹0.
              </p>
            )}

            {errors.price && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.price}
              </p>
            )}

          </div>

          {/* DURATION */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Duration (Days)
            </label>

            <input
              type="number"
              min={1}
              step="1"
              value={durationInDays}
              onChange={(event) =>
                setDurationInDays(
                  event.target.value
                )
              }
              placeholder={
                isTrial
                  ? "7"
                  : "365"
              }
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                errors.durationInDays
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            />

            {isTrial && (
              <p className="text-xs text-slate-500 mt-1">
                Configure the trial duration. It is not hardcoded.
              </p>
            )}

            {errors.durationInDays && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.durationInDays}
              </p>
            )}

          </div>

          {/* SESSIONS */}

          <div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
              Mentorship Sessions
            </label>

            <input
              type="number"
              min={0}
              step="1"
              value={sessionsPerMonth}
              onChange={(event) =>
                setSessionsPerMonth(
                  event.target.value
                )
              }
              placeholder="2"
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-lg transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium ${
                errors.sessionsPerMonth
                  ? "border-rose-400 focus:border-rose-500 text-rose-900"
                  : "border-slate-300 focus:border-indigo-500 text-slate-900"
              }`}
            />

            <p className="text-xs text-slate-500 mt-1">
              For trials, this limit applies across the entire trial.
              For paid plans, it resets each calendar month.
            </p>

            {errors.sessionsPerMonth && (
              <p className="text-xs text-rose-700 mt-1 font-semibold">
                {errors.sessionsPerMonth}
              </p>
            )}

          </div>

        </div>

      </section>

      {/* ==================================================
          PLAN TYPE
      ================================================== */}

      <section className="space-y-4">

        <div className="border-b border-slate-100 pb-3">

          <h2 className="text-lg font-bold text-slate-900">
            Plan Type
          </h2>

          <p className="text-xs font-medium text-slate-600 mt-0.5">
            Choose whether this is a free trial or paid subscription plan.
          </p>

        </div>

        <label
          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
            isTrial
              ? "border-emerald-300 bg-emerald-50"
              : "border-slate-200 bg-slate-50/70 hover:bg-slate-100/70"
          }`}
        >

          <input
            type="checkbox"
            checked={isTrial}
            onChange={(event) =>
              handleTrialChange(
                event.target.checked
              )
            }
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />

          <div className="text-sm">

            <span className="font-semibold text-slate-900 block">
              Free Trial Plan
            </span>

            <span className="text-xs font-medium text-slate-600">
              Students assigned to this exam will receive this
              plan when their trial starts.
            </span>

            {isTrial && (
              <span className="block text-xs font-semibold text-emerald-700 mt-1.5">
                Trial entitlement period: entire trial duration
              </span>
            )}

          </div>

        </label>

        {isTrial && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">

            <p className="text-sm font-bold text-amber-900">
              Trial configuration
            </p>

            <p className="text-xs text-amber-800 mt-1">
              Only one active trial plan should exist for this exam type.
              Test limits use the entire trial period and do not reset monthly.
            </p>

          </div>
        )}

      </section>

      {/* ==================================================
          PLAN SETTINGS
      ================================================== */}

      <section className="space-y-4">

        <div className="border-b border-slate-100 pb-3">

          <h2 className="text-lg font-bold text-slate-900">
            Plan Settings
          </h2>

          <p className="text-xs font-medium text-slate-600 mt-0.5">
            Configure visibility and highlights.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* POPULAR */}

          <label
            className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
              isTrial
                ? "border-slate-200 bg-slate-100 cursor-not-allowed"
                : "border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer"
            }`}
          >

            <input
              type="checkbox"
              checked={isPopular}
              disabled={isTrial}
              onChange={(event) =>
                setIsPopular(
                  event.target.checked
                )
              }
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:cursor-not-allowed"
            />

            <div className="text-sm">

              <span className="font-semibold text-slate-900 block">
                Popular Plan
              </span>

              <span className="text-xs font-medium text-slate-600">
                Highlight this plan with a featured badge on the plans catalog.
              </span>

            </div>

          </label>

          {/* ACTIVE */}

          <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer transition-colors">

            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) =>
                setIsActive(
                  event.target.checked
                )
              }
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <div className="text-sm">

              <span className="font-semibold text-slate-900 block">
                Active Plan
              </span>

              <span className="text-xs font-medium text-slate-600">
                Make this plan available according to its plan type.
              </span>

            </div>

          </label>

        </div>

      </section>

      {/* ==================================================
          TEST LIMITS
      ================================================== */}

      <section className="space-y-4">

        <div className="border-b border-slate-100 pb-3">

          <h2 className="text-lg font-bold text-slate-900">
            Test Limits
          </h2>

          <p className="text-xs font-medium text-slate-600 mt-0.5">
            Configure the access available to students for each test type.
          </p>

          {isTrial && (
            <p className="text-xs font-semibold text-emerald-700 mt-1">
              Trial limits apply across the entire trial period.
            </p>
          )}

          {!isTrial && (
            <p className="text-xs font-semibold text-indigo-700 mt-1">
              Paid plan limits reset every calendar month.
            </p>
          )}

        </div>

        <div className="space-y-3">

          {testLimits.map(
            (testLimit, index) => (

              <div
                key={testLimit.testType}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60"
              >

                <TestLimitForm
  value={testLimit}
  onChange={(value) =>
    updateTestLimit(
      index,
      value
    )
  }
  isTrial={isTrial}
  error={
    errors[
      `testLimits.${index}.limit`
    ] ||
    errors[
      `testLimits.${index}.period`
    ]
  }
/>

              </div>
            )
          )}

        </div>

        {errors.testLimits && (
          <p className="text-xs text-rose-700 font-semibold">
            {errors.testLimits}
          </p>
        )}

      </section>

      {/* ==================================================
          ACTIONS
      ================================================== */}

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">

        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Plan"
              : "Save Changes"}
        </button>

      </div>

    </form>
  );
};

export default PlanForm;