import {
  Check,
  X,
  CalendarDays,
  Users,
  BookOpen,
  Headphones,
} from "lucide-react";

import type {
  StudentSubscriptionPlan,
} from "../types/plan.types";


// ======================================================
// PROPS
// ======================================================

interface PlanFeaturesProps {
  plan: StudentSubscriptionPlan;
}


// ======================================================
// FEATURE ROW
// ======================================================

interface FeatureRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  included?: boolean;
}


const FeatureRow = ({
  icon,
  label,
  value,
  included = true,
}: FeatureRowProps) => {

  return (
    <div
      className="
        flex
        items-start
        gap-3
        py-2
      "
    >

      {/* Icon */}

      <div
        className="
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-gray-100
          text-gray-600
        "
      >
        {icon}
      </div>


      {/* Content */}

      <div className="min-w-0 flex-1">

        <p
          className="
            text-sm
            font-medium
            text-gray-700
          "
        >
          {label}
        </p>

        <div
          className="
            mt-0.5
            flex
            items-center
            gap-1.5
          "
        >

          {included ? (
            <Check
              size={14}
              className="text-green-600"
            />
          ) : (
            <X
              size={14}
              className="text-gray-400"
            />
          )}

          <span
            className={
              included
                ? "text-sm font-semibold text-gray-900"
                : "text-sm text-gray-400"
            }
          >
            {value}
          </span>

        </div>

      </div>

    </div>
  );
};


// ======================================================
// COMPONENT
// ======================================================

const PlanFeatures = ({
  plan,
}: PlanFeaturesProps) => {

  const practiceText =
    plan.unlimitedPractice
      ? "Unlimited"
      : plan.practiceQuestionsLimit !== null
        ? `${plan.practiceQuestionsLimit} questions`
        : "Not included";


  return (
    <div className="space-y-1">

      {/* ==================================================
          DURATION
          ================================================== */}

      <FeatureRow
        icon={
          <CalendarDays
            size={17}
          />
        }
        label="Plan Duration"
        value={`${plan.durationInDays} days`}
      />


      {/* ==================================================
          MENTOR SESSIONS
          ================================================== */}

      <FeatureRow
        icon={
          <Users
            size={17}
          />
        }
        label="Mentor Sessions"
        value={`${plan.sessionsPerMonth} per month`}
        included={
          plan.sessionsPerMonth > 0
        }
      />


      {/* ==================================================
          PRACTICE QUESTIONS
          ================================================== */}

      <FeatureRow
        icon={
          <BookOpen
            size={17}
          />
        }
        label="Practice Questions"
        value={practiceText}
        included={
          plan.unlimitedPractice ||
          (
            plan.practiceQuestionsLimit !==
            null &&
            plan.practiceQuestionsLimit > 0
          )
        }
      />


      {/* ==================================================
          MENTOR SELECTION
          ================================================== */}

      <FeatureRow
        icon={
          <Users
            size={17}
          />
        }
        label="Mentor Selection"
        value={
          plan.mentorSelectionEnabled
            ? "Included"
            : "Not included"
        }
        included={
          plan.mentorSelectionEnabled
        }
      />


      {/* ==================================================
          PRIORITY SUPPORT
          ================================================== */}

      <FeatureRow
        icon={
          <Headphones
            size={17}
          />
        }
        label="Priority Support"
        value={
          plan.prioritySupport
            ? "Included"
            : "Not included"
        }
        included={
          plan.prioritySupport
        }
      />

    </div>
  );
};


export default PlanFeatures;