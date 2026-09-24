import {
  BookOpen,
  Check,
  FileText,
  Infinity,
  Lock,
  Trophy,
} from "lucide-react";

import type {
  PlanTestLimit,
  TestType,
} from "../types/plan.types";


// ======================================================
// PROPS
// ======================================================

interface PlanTestLimitsProps {
  testLimits: PlanTestLimit[];
}


// ======================================================
// TEST TYPE CONFIG
// ======================================================

const testTypeConfig: Record<
  TestType,
  {
    label: string;
    icon: React.ReactNode;
  }
> = {
  CHAPTER: {
    label: "Chapter Tests",
    icon: <BookOpen size={17} />,
  },

  SUBJECT: {
    label: "Subject Tests",
    icon: <FileText size={17} />,
  },

  MOCK: {
    label: "Mock Tests",
    icon: <Trophy size={17} />,
  },

  PYQ: {
    label: "Previous Year Questions",
    icon: <FileText size={17} />,
  },

  PRACTICE: {
    label: "Practice",
    icon: <BookOpen size={17} />,
  },
};


// ======================================================
// ACCESS TEXT
// ======================================================

const getAccessText = (
  testLimit: PlanTestLimit
): string => {

  switch (testLimit.limitType) {

    case "UNLIMITED":
      return "Unlimited";

    case "NOT_ALLOWED":
      return "Not included";

    case "LIMITED":

      if (
        testLimit.limit === null
      ) {
        return "Limited";
      }

      if (
        testLimit.period === "MONTHLY"
      ) {
        return `${testLimit.limit} / month`;
      }

      return `${testLimit.limit}`;

    default:
      return "Not included";
  }
};


// ======================================================
// COMPONENT
// ======================================================

const PlanTestLimits = ({
  testLimits,
}: PlanTestLimitsProps) => {

  // ----------------------------------------------------
  // Empty State
  // ----------------------------------------------------

  if (testLimits.length === 0) {

    return (
      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          p-4
          text-sm
          text-gray-500
        "
      >
        No test access information available.
      </div>
    );
  }


  return (
    <div className="space-y-3">

      {testLimits.map(
        (testLimit) => {

          const config =
            testTypeConfig[
              testLimit.testType
            ];

          const isUnlimited =
            testLimit.limitType ===
            "UNLIMITED";

          const isNotAllowed =
            testLimit.limitType ===
            "NOT_ALLOWED";

          const accessText =
            getAccessText(
              testLimit
            );


          return (
            <div
              key={testLimit.id}
              className={`
                flex
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                p-4
                ${
                  isNotAllowed
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-100 bg-white"
                }
              `}
            >

              {/* ==================================================
                  LEFT SIDE
                  ================================================== */}

              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >

                {/* Icon */}

                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${
                      isNotAllowed
                        ? "bg-gray-200 text-gray-400"
                        : "bg-indigo-50 text-indigo-600"
                    }
                  `}
                >
                  {isNotAllowed ? (
                    <Lock size={17} />
                  ) : (
                    config.icon
                  )}
                </div>


                {/* Label */}

                <div className="min-w-0">

                  <p
                    className={`
                      truncate
                      text-sm
                      font-medium
                      ${
                        isNotAllowed
                          ? "text-gray-400"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {config.label}
                  </p>


                  {/* Access type */}

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-gray-400
                    "
                  >
                    {isUnlimited
                      ? "Unlimited access"
                      : isNotAllowed
                        ? "Access unavailable"
                        : "Monthly limit"}
                  </p>

                </div>

              </div>


              {/* ==================================================
                  RIGHT SIDE
                  ================================================== */}

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                "
              >

                {isUnlimited && (
                  <Infinity
                    size={18}
                    className="text-green-600"
                  />
                )}


                {!isUnlimited &&
                  !isNotAllowed && (
                    <Check
                      size={16}
                      className="text-indigo-600"
                    />
                  )}


                {isNotAllowed && (
                  <Lock
                    size={15}
                    className="text-gray-400"
                  />
                )}


                <span
                  className={`
                    text-sm
                    font-semibold
                    ${
                      isUnlimited
                        ? "text-green-600"
                        : isNotAllowed
                          ? "text-gray-400"
                          : "text-gray-900"
                    }
                  `}
                >
                  {accessText}
                </span>

              </div>

            </div>
          );
        }
      )}

    </div>
  );
};


export default PlanTestLimits;