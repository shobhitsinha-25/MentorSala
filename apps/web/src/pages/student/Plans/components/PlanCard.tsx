import {
  ArrowRight,
  Check,
  Clock3,
  Headphones,
  MessageCircle,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  StudentSubscriptionPlan,
  TestType,
} from "../types/plan.types";


// ======================================================
// PROPS
// ======================================================

interface PlanCardProps {
  plan: StudentSubscriptionPlan;
}


// ======================================================
// TEST TYPE LABELS
// ======================================================

const testTypeLabels: Record<TestType, string> = {
  CHAPTER: "Chapter Tests",
  SUBJECT: "Subject Tests",
  MOCK: "Mock Tests",
  PYQ: "PYQ Tests",
  PRACTICE: "Practice",
};


// ======================================================
// COMPONENT
// ======================================================

const PlanCard = ({
  plan,
}: PlanCardProps) => {

  const navigate = useNavigate();


  // ====================================================
  // VIEW PLAN
  // ====================================================

  const handleViewPlan = () => {

    navigate(
      `/student/plans/${plan.id}`
    );

  };


  // ====================================================
  // FORMAT PRICE
  // ====================================================

  const formatPrice = (
    price: number
  ) => {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    ).format(price);

  };


  const formattedPayablePrice =
    formatPrice(
      plan.payablePrice
    );


  const formattedOriginalPrice =
    formatPrice(
      plan.price
    );


  // ====================================================
  // TEST ACCESS
  // ====================================================

  const getTestAccessText = (
    limitType: string,
    limit: number | null,
    period: string | null
  ) => {

    if (limitType === "UNLIMITED") {

      return "Unlimited";

    }


    if (limitType === "NOT_ALLOWED") {

      return "Not included";

    }


    if (
      limitType === "LIMITED" &&
      limit !== null
    ) {

      if (period === "MONTHLY") {

        return `${limit} / month`;

      }

      return `${limit}`;

    }


    return "Limited";

  };


  // ====================================================
  // TEST ACCESS CLASS
  // ====================================================

  const getTestAccessClass = (
    limitType: string
  ) => {

    if (limitType === "UNLIMITED") {

      return `
        font-semibold
        text-purple-600
      `;

    }


    if (limitType === "NOT_ALLOWED") {

      return `
        font-medium
        text-slate-400
      `;

    }


    return `
      font-semibold
      text-slate-800
    `;

  };


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <article
      className="
        relative
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-purple-100
        bg-white
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-purple-300
        hover:shadow-md
        hover:shadow-purple-500/5
        lg:flex-row
        lg:items-stretch
      "
    >

      {/* ==================================================
          POPULAR BADGE
          ================================================== */}

      {plan.isPopular && (
        <div
          className="
            absolute
            right-4
            top-4
            z-10
            inline-flex
            items-center
            gap-1
            rounded-full
            border
            border-purple-200
            bg-purple-50
            px-2.5
            py-0.5
            text-xs
            font-semibold
            text-purple-700
            shadow-xs
          "
        >

          <Zap
            size={12}
            fill="currentColor"
            className="text-purple-600"
          />

          Popular

        </div>
      )}


      {/* ==================================================
          PLAN HEADER & PRICING (LEFT COLUMN)
          ================================================== */}

      <div
        className="
          flex
          flex-col
          justify-between
          border-b
          border-purple-100
          bg-gradient-to-br
          from-purple-50/40
          via-white
          to-white
          p-5
          sm:p-6
          lg:w-80
          lg:shrink-0
          lg:border-b-0
          lg:border-r
        "
      >

        <div>

          <div
            className="
              pr-20
              lg:pr-0
            "
          >

            <h2
              className="
                text-lg
                font-bold
                tracking-tight
                text-slate-900
                sm:text-xl
              "
            >
              {plan.title}
            </h2>


            {plan.description && (
              <p
                className="
                  mt-1.5
                  line-clamp-2
                  text-xs
                  leading-relaxed
                  text-slate-500
                  sm:text-sm
                "
              >
                {plan.description}
              </p>
            )}

          </div>

        </div>


        {/* ==================================================
            PRICE & CTA (ON DESKTOP STAYS ON LEFT SIDE)
            ================================================== */}

        <div
          className="
            mt-5
            pt-4
            border-t
            border-purple-50
            lg:mt-6
          "
        >

          <div className="flex items-baseline gap-1.5">

            <span
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                sm:text-3xl
              "
            >
              {formattedPayablePrice}
            </span>


            <span
              className="
                text-xs
                font-medium
                text-slate-500
                sm:text-sm
              "
            >
              / {plan.durationInDays} days
            </span>

          </div>


          {/* ==================================================
              UPGRADE PRICE
              ================================================== */}

          {plan.isUpgrade && (
            <div
              className="
                mt-1
                space-y-0.5
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  text-purple-600
                "
              >
                Upgrade price
              </p>


              <p
                className="
                  text-xs
                  text-slate-400
                  line-through
                "
              >
                Original price: {formattedOriginalPrice}
              </p>

            </div>
          )}


          {/* ACTION (FOR DESKTOP HORIZONTAL VIEW) */}

          <div className="mt-4 hidden lg:block">

            <button
              type="button"
              onClick={handleViewPlan}
              className="
                group
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-purple-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                shadow-purple-600/20
                transition-all
                hover:bg-purple-700
                hover:shadow-md
                hover:shadow-purple-600/30
                focus:outline-none
                focus:ring-2
                focus:ring-purple-500
                focus:ring-offset-2
                active:scale-[0.99]
              "
            >

              {plan.isUpgrade
                ? "Upgrade Plan"
                : "View Plan"}

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />

            </button>

          </div>

        </div>

      </div>


      {/* ==================================================
          PLAN CONTENT (RIGHT WIDE AREA)
          ================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          justify-between
          p-5
          sm:p-6
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            lg:gap-8
          "
        >

          {/* ==================================================
              CORE FEATURES COLUMN
              ================================================== */}

          <div>

            <h3
              className="
                mb-3
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-purple-700
              "
            >
              Key Features
            </h3>


            <div className="space-y-3">

              {/* MENTOR SESSIONS */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  text-xs
                  sm:text-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <Users size={15} />
                  </div>

                  <span
                    className="
                      font-medium
                      text-slate-600
                    "
                  >
                    Mentor Sessions
                  </span>

                </div>


                <span
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  {plan.sessionsPerMonth} /month
                </span>

              </div>


              {/* MENTOR SELECTION */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  text-xs
                  sm:text-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-fuchsia-50 text-fuchsia-600">
                    <MessageCircle size={15} />
                  </div>

                  <span
                    className="
                      font-medium
                      text-slate-600
                    "
                  >
                    Mentor Selection
                  </span>

                </div>


                {plan.mentorSelectionEnabled ? (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      font-semibold
                      text-emerald-600
                    "
                  >

                    <Check size={14} />

                    Included

                  </span>

                ) : (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      font-medium
                      text-slate-400
                    "
                  >

                    <X size={14} />

                    Not included

                  </span>

                )}

              </div>


              {/* PRIORITY SUPPORT */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  text-xs
                  sm:text-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Headphones size={15} />
                  </div>

                  <span
                    className="
                      font-medium
                      text-slate-600
                    "
                  >
                    Priority Support
                  </span>

                </div>


                {plan.prioritySupport ? (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      font-semibold
                      text-emerald-600
                    "
                  >

                    <Check size={14} />

                    Included

                  </span>

                ) : (

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      font-medium
                      text-slate-400
                    "
                  >

                    <X size={14} />

                    Not included

                  </span>

                )}

              </div>


              {/* PRACTICE QUESTIONS */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  text-xs
                  sm:text-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Zap size={15} />
                  </div>

                  <span
                    className="
                      font-medium
                      text-slate-600
                    "
                  >
                    Practice Questions
                  </span>

                </div>


                <span
                  className="
                    text-right
                    font-semibold
                    text-slate-900
                  "
                >

                  {plan.unlimitedPractice
                    ? "Unlimited"
                    : plan.practiceQuestionsLimit !== null
                      ? plan.practiceQuestionsLimit
                      : "Not included"}

                </span>

              </div>


              {/* DURATION */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  text-xs
                  sm:text-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Clock3 size={15} />
                  </div>

                  <span
                    className="
                      font-medium
                      text-slate-600
                    "
                  >
                    Plan Duration
                  </span>

                </div>


                <span
                  className="
                    font-semibold
                    text-slate-900
                  "
                >
                  {plan.durationInDays} days
                </span>

              </div>

            </div>

          </div>


          {/* ==================================================
              TEST ACCESS COLUMN
              ================================================== */}

          {plan.testLimits?.length > 0 ? (

            <div>

              <h3
                className="
                  mb-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-wider
                  text-purple-700
                "
              >
                Test Access
              </h3>


              <div
                className="
                  space-y-2.5
                  rounded-xl
                  border
                  border-purple-50
                  bg-purple-50/20
                  p-3.5
                "
              >

                {plan.testLimits.map(
                  (testLimit) => {

                    const label =
                      testTypeLabels[
                        testLimit.testType
                      ];


                    const accessText =
                      getTestAccessText(
                        testLimit.limitType,
                        testLimit.limit,
                        testLimit.period
                      );


                    return (
                      <div
                        key={testLimit.id}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                          text-xs
                          sm:text-sm
                        "
                      >

                        <span
                          className="
                            font-medium
                            text-slate-600
                          "
                        >
                          {label}
                        </span>


                        <span
                          className={
                            getTestAccessClass(
                              testLimit.limitType
                            )
                          }
                        >
                          {accessText}
                        </span>

                      </div>
                    );

                  }
                )}

              </div>

            </div>

          ) : (
            <div className="hidden md:block" />
          )}

        </div>


        {/* ==================================================
            MOBILE ACTION (SHOWN BELOW ON MOBILE SCREENS)
            ================================================== */}

        <div
          className="
            mt-6
            border-t
            border-purple-50
            pt-4
            lg:hidden
          "
        >

          <button
            type="button"
            onClick={handleViewPlan}
            className="
              group
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-purple-600
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              shadow-purple-600/20
              transition-all
              hover:bg-purple-700
              hover:shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
              focus:ring-offset-2
              active:scale-[0.99]
            "
          >

            {plan.isUpgrade
              ? "Upgrade Plan"
              : "View Plan"}

            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />

          </button>

        </div>

      </div>

    </article>
  );
};


export default PlanCard;