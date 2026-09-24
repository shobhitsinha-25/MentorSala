import { useEffect, useState } from "react";
import { Loader2, ChevronDown } from "lucide-react";

import { getTests } from "../../../api/studentTestApi";
import TestCard from "./components/TestCard";

import type { Test } from "../../../types/studentTest.types";

type TestTab = "new" | "attempted";

type TestTypeFilter =
  | ""
  | "CHAPTER"
  | "SUBJECT"
  | "MOCK"
  | "PYQ"
  | "PRACTICE";

const Tests = () => {
  const [tests, setTests] = useState<Test[]>([]);

  const [activeTab, setActiveTab] =
    useState<TestTab>("new");

  const [testType, setTestType] =
    useState<TestTypeFilter>("");

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // LOAD TESTS
  // ==========================================

  const loadTests = async () => {
    try {
      setLoading(true);

      const response = await getTests({
        type: testType || undefined,
      });

      setTests(response.tests ?? []);
    } catch (error) {
      console.error(
        "Failed to load tests:",
        error
      );

      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD + FILTER CHANGE
  // ==========================================

  useEffect(() => {
    loadTests();
  }, [testType]);

  // ==========================================
  // SEPARATE NEW & ATTEMPTED TESTS
  // ==========================================

  const newTests = tests.filter(
    (test) => test.attempt === null
  );

  const attemptedTests = tests.filter(
    (test) => test.attempt !== null
  );

  // ==========================================
  // DISPLAYED TESTS
  // ==========================================

  const displayedTests =
    activeTab === "new"
      ? newTests
      : attemptedTests;

  // ==========================================
  // TEST TYPE LABEL
  // ==========================================

  const getTestTypeLabel = (
    type: TestTypeFilter
  ) => {
    switch (type) {
      case "CHAPTER":
        return "Chapter Test";

      case "SUBJECT":
        return "Subject Test";

      case "MOCK":
        return "Mock Test";

      case "PYQ":
        return "Previous Year Test";

      case "PRACTICE":
        return "Practice Test";

      default:
        return "All Types";
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center bg-white">
        <Loader2
          size={40}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-full w-full bg-white p-6">

      {/* ======================================
          TABS + FILTER
      ====================================== */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        {/* ====================================
            NEW / ATTEMPTED TABS
        ==================================== */}

        <div className="flex w-fit rounded-xl border border-slate-200 bg-slate-100 p-1">

          {/* NEW TEST */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("new")
            }
            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === "new"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            New Test

            <span className="ml-2 opacity-70">
              {newTests.length}
            </span>
          </button>

          {/* ATTEMPTED TEST */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("attempted")
            }
            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              activeTab === "attempted"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            Attempted Test

            <span className="ml-2 opacity-70">
              {attemptedTests.length}
            </span>
          </button>
        </div>

        {/* ====================================
            TEST TYPE FILTER
        ==================================== */}

        <div className="relative">

          <select
            value={testType}
            onChange={(e) =>
              setTestType(
                e.target
                  .value as TestTypeFilter
              )
            }
            className="h-11 min-w-[190px] appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">
              All Types
            </option>

            <option value="CHAPTER">
              Chapter Test
            </option>

            <option value="SUBJECT">
              Subject Test
            </option>

            <option value="MOCK">
              Mock Test
            </option>

            <option value="PYQ">
              Previous Year Test
            </option>

            <option value="PRACTICE">
              Practice Test
            </option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

        </div>
      </div>

      {/* ======================================
          CURRENT FILTER
      ====================================== */}

      {testType && (
        <div className="mb-6 text-sm text-slate-600">
          Showing{" "}
          <span className="font-medium text-slate-900">
            {getTestTypeLabel(testType)}
          </span>
        </div>
      )}

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {displayedTests.length === 0 ? (
        <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">

          <h2 className="text-xl font-semibold text-slate-900">
            {activeTab === "new"
              ? "No New Tests"
              : "No Attempted Tests"}
          </h2>

          <p className="mt-2 text-slate-600">
            {activeTab === "new"
              ? "There are no new tests available."
              : "You haven't attempted any tests yet."}
          </p>

        </div>
      ) : (

        /* ====================================
           TEST CARDS
        ==================================== */

        <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">

          {displayedTests.map(
            (test) => (
              <TestCard
                key={test.id}
                test={test}
              />
            )
          )}

        </div>
      )}

    </div>
  );
};

export default Tests;