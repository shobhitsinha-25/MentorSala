import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, deactivatePlan } from "./services/plan.api";
import type { ExamType, PlansPagination, SubscriptionPlan } from "./types/plan.types";
import toast from "react-hot-toast";

const Plans = () => {
  // ====================================================
  // STATE
  // ====================================================
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [pagination, setPagination] = useState<PlansPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [examType, setExamType] = useState<ExamType | "">("");
  const [isActive, setIsActive] = useState<boolean | "">("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  // ====================================================
  // FETCH PLANS
  // ====================================================
  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPlans({
        page,
        limit,
        search: search.trim() || undefined,
        examType: examType || undefined,
        isActive: isActive === "" ? undefined : isActive,
      });
      setPlans(response.plans);
      setPagination(response.pagination);
    } catch (error: any) {
      setError(
        error?.response?.data?.message || "Failed to load subscription plans."
      );
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // FETCH WHEN FILTERS CHANGE
  // ====================================================
  useEffect(() => {
    fetchPlans();
  }, [page, search, examType, isActive]);

  // ====================================================
  // RESET FILTERS
  // ====================================================
  const resetFilters = () => {
    setSearch("");
    setExamType("");
    setIsActive("");
    setPage(1);
  };

  const handleDeletePlan = async (planId: string) => {
    try {
      setDeleting(true);
      await deactivatePlan(planId);
      toast.success("Plan deactivated successfully.");
      setPlanToDelete(null);
      await fetchPlans();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to deactivate plan."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ====================================================
  // LOADING
  // ====================================================
  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Loading plans...</p>
      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================
  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-xl max-w-md w-full text-center shadow-sm">
          <p className="font-semibold text-sm mb-4">{error}</p>
          <button
            type="button"
            onClick={fetchPlans}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // UI
  // ====================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ==================================================
          HEADER
      ================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Subscription Plans
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage subscription plans available to students.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/plans/create")}
          className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Plan
        </button>
      </div>

      {/* ==================================================
          FILTERS
      ================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search plans..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="w-full px-3.5 py-2 bg-white text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 placeholder-slate-400"
        />

        {/* EXAM TYPE */}
        <select
          value={examType}
          onChange={(event) => {
            setExamType(event.target.value as ExamType | "");
            setPage(1);
          }}
          className="w-full px-3 py-2 bg-white text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
        >
          <option value="">All Exams</option>
          <option value="JEE">JEE</option>
          <option value="WBJEE">WBJEE</option>
          <option value="BOARDS">Boards</option>
        </select>

        {/* STATUS */}
        <select
          value={isActive === "" ? "" : String(isActive)}
          onChange={(event) => {
            const value = event.target.value;
            setIsActive(value === "" ? "" : value === "true");
            setPage(1);
          }}
          className="w-full px-3 py-2 bg-white text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* RESET */}
        <button
          type="button"
          onClick={resetFilters}
          className="w-full px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm font-medium rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      {/* ==================================================
          PLAN COUNT
      ================================================== */}
      <div>
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {pagination?.total ?? 0} {pagination?.total === 1 ? "plan" : "plans"} found
        </p>
      </div>

      {/* ==================================================
          EMPTY STATE
      ================================================== */}
      {plans.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <h2 className="text-base font-semibold text-slate-900">No plans found</h2>
          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        /* ==================================================
             PLANS (2 CARDS PER ROW - COMPACT HEIGHT)
        ================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-4">
                {/* PLAN HEADER */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                        {plan.title}
                      </h2>
                      {plan.isPopular && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* DESCRIPTION */}
                    {plan.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {plan.description}
                      </p>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                      plan.isActive
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
                        : "bg-slate-100 text-slate-600 ring-1 ring-slate-500/20"
                    }`}
                  >
                    {plan.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* BASIC DETAILS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Exam</span>
                    <strong className="font-semibold text-slate-800">
                      {plan.examType}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Price</span>
                    <strong className="font-bold text-slate-900 text-sm">
                      ₹{plan.price}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Duration</span>
                    <strong className="font-semibold text-slate-800">
                      {plan.durationInDays}d
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Sessions/Mo</span>
                    <strong className="font-semibold text-slate-800">
                      {plan.sessionsPerMonth}
                    </strong>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-700">
                    Questions:{" "}
                    <strong className="font-semibold">
                      {plan.unlimitedPractice
                        ? "Unlimited"
                        : plan.practiceQuestionsLimit ?? "N/A"}
                    </strong>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-700">
                    Priority Support:{" "}
                    <strong className="font-semibold">
                      {plan.prioritySupport ? "Yes" : "No"}
                    </strong>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md font-medium text-slate-700">
                    Mentor Selection:{" "}
                    <strong className="font-semibold">
                      {plan.mentorSelectionEnabled ? "Enabled" : "Disabled"}
                    </strong>
                  </span>
                </div>

                {/* TEST LIMITS */}
                {plan.testLimits && plan.testLimits.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Limits:
                    </span>
                    {plan.testLimits.map((testLimit) => (
                      <span
                        key={testLimit.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-50/60 border border-indigo-100 text-indigo-700 text-[11px]"
                      >
                        <span className="font-medium">{testLimit.testType}:</span>
                        <span>
                          {testLimit.limitType === "UNLIMITED"
                            ? "Unlimited"
                            : testLimit.limitType === "NOT_ALLOWED"
                            ? "Not Allowed"
                            : `${testLimit.limit}/${testLimit.period}`}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/admin/plans/${plan.id}`)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors shadow-2xs"
                >
                  View
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/admin/plans/${plan.id}/edit`)}
                  className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setPlanToDelete(plan.id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================================================
          PAGINATION
      ================================================== */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-slate-600">
            Page {pagination.page} of {pagination.pages}
          </span>

          <button
            type="button"
            disabled={page >= pagination.pages}
            onClick={() => setPage((current) => current + 1)}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      )}

      {/* ==================================================
          DELETE CONFIRMATION MODAL
      ================================================== */}
      {planToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Deactivate Plan?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to deactivate this plan? Students will no
              longer be able to purchase it.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setPlanToDelete(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDeletePlan(planToDelete)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deactivating..." : "Deactivate Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;