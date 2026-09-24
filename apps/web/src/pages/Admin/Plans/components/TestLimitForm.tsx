import type {
  PlanLimitPeriod,
  PlanLimitType,
  TestType,
} from "../types/plan.types";

import type {
  PlanTestLimitFormData,
} from "../types/plan.types";


// ======================================================
// PROPS
// ======================================================

interface TestLimitFormProps {
  value: PlanTestLimitFormData;

  onChange: (
    value: PlanTestLimitFormData
  ) => void;

  /**
   * Determines the entitlement period.
   *
   * Trial plan -> SUBSCRIPTION
   * Paid plan  -> MONTHLY
   */
  isTrial: boolean;

  error?: string;
}


// ======================================================
// CONSTANTS
// ======================================================

const TEST_TYPE_LABELS: Record<
  TestType,
  string
> = {
  CHAPTER: "Chapter Tests",
  SUBJECT: "Subject Tests",
  MOCK: "Mock Tests",
  PYQ: "Previous Year Questions",
  PRACTICE: "Practice Tests",
};


// ======================================================
// COMPONENT
// ======================================================

const TestLimitForm = ({
  value,
  onChange,
  isTrial,
  error,
}: TestLimitFormProps) => {

  // ====================================================
  // DERIVED PERIOD
  // ====================================================

  const entitlementPeriod: PlanLimitPeriod =
    isTrial
      ? "SUBSCRIPTION"
      : "MONTHLY";


  // ====================================================
  // LIMIT TYPE CHANGE
  // ====================================================

  const handleLimitTypeChange = (
    limitType: PlanLimitType
  ) => {

    // --------------------------------------------------
    // LIMITED
    // --------------------------------------------------

    if (
      limitType === "LIMITED"
    ) {

      onChange({

        ...value,

        limitType,

        limit:
          value.limit ?? 1,

        period:
          entitlementPeriod,

      });

      return;
    }


    // --------------------------------------------------
    // UNLIMITED / NOT_ALLOWED
    // --------------------------------------------------

    onChange({

      ...value,

      limitType,

      limit: null,

      period: null,

    });
  };


  // ====================================================
  // LIMIT CHANGE
  // ====================================================

  const handleLimitChange = (
    limit: number | null
  ) => {

    onChange({

      ...value,

      limit,

      // Keep period synchronized with plan type.
      period:
        value.limitType === "LIMITED"
          ? entitlementPeriod
          : null,

    });
  };


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <div>

      {/* ==================================================
          TEST TYPE
      ================================================== */}

      <div>

        <h3>
          {TEST_TYPE_LABELS[value.testType]}
        </h3>

      </div>


      {/* ==================================================
          ACCESS TYPE
      ================================================== */}

      <div>

        <label>
          Access Type
        </label>

        <select
          value={value.limitType}
          onChange={(event) =>
            handleLimitTypeChange(
              event.target.value as PlanLimitType
            )
          }
        >

          <option value="LIMITED">
            Limited
          </option>

          <option value="UNLIMITED">
            Unlimited
          </option>

          <option value="NOT_ALLOWED">
            Not Allowed
          </option>

        </select>

      </div>


      {/* ==================================================
          LIMITED CONFIGURATION
      ================================================== */}

      {value.limitType === "LIMITED" && (

        <div>

          {/* ==============================================
              LIMIT
          ============================================== */}

          <div>

            <label>
              Limit
            </label>

            <input
              type="number"
              min={0}
              value={
                value.limit ?? ""
              }
              onChange={(event) => {

                const rawValue =
                  event.target.value;

                handleLimitChange(
                  rawValue === ""
                    ? null
                    : Number(rawValue)
                );

              }}
            />

          </div>


          {/* ==============================================
              PERIOD
          ============================================== */}

          <div>

            <label>
              Period
            </label>

            <input
              type="text"
              value={
                isTrial
                  ? "For Trial Duration"
                  : "Monthly"
              }
              disabled
              readOnly
            />

            <p>

              {isTrial
                ? "This limit applies for the entire free-trial period."
                : "This limit resets every calendar month."
              }

            </p>

          </div>

        </div>

      )}


      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (

        <p>
          {error}
        </p>

      )}

    </div>

  );
};


export default TestLimitForm;