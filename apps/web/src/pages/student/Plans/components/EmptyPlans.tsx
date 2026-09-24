import {
  ArrowLeft,
  CreditCard,
  RefreshCw,
} from "lucide-react";


// ======================================================
// PROPS
// ======================================================

interface EmptyPlansProps {
  onRetry?: () => void;
  onBack?: () => void;
}


// ======================================================
// COMPONENT
// ======================================================

const EmptyPlans = ({
  onRetry,
  onBack,
}: EmptyPlansProps) => {

  return (
    <div
      className="
        flex
        min-h-[420px]
        items-center
        justify-center
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        py-12
      "
    >

      <div
        className="
          flex
          max-w-md
          flex-col
          items-center
          text-center
        "
      >

        {/* ==================================================
            ICON
            ================================================== */}

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-indigo-50
            text-indigo-600
          "
        >
          <CreditCard size={30} />
        </div>


        {/* ==================================================
            TITLE
            ================================================== */}

        <h2
          className="
            mt-5
            text-xl
            font-bold
            text-gray-900
          "
        >
          No Plans Available
        </h2>


        {/* ==================================================
            DESCRIPTION
            ================================================== */}

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-gray-500
          "
        >
          There are currently no active subscription
          plans available for your target exam. Please
          check again later.
        </p>


        {/* ==================================================
            ACTIONS
            ================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
              "
            >
              <RefreshCw size={16} />

              Try Again
            </button>
          )}


          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-gray-300
                bg-white
                px-5
                py-2.5
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500
                focus:ring-offset-2
              "
            >
              <ArrowLeft size={16} />

              Go Back
            </button>
          )}

        </div>

      </div>

    </div>
  );
};


export default EmptyPlans;