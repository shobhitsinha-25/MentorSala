import { Loader2, ShieldCheck } from "lucide-react";


// ======================================================
// PROPS
// ======================================================

interface PaymentProcessingProps {
  message?: string;

  description?: string;
}


// ======================================================
// COMPONENT
// ======================================================

const PaymentProcessing = ({
  message = "Processing your payment...",
  description = "Please do not close or refresh this page.",
}: PaymentProcessingProps) => {

  return (
    <div
      className="
        flex
        min-h-[300px]
        w-full
        items-center
        justify-center
        rounded-xl
        border
        border-gray-200
        bg-white
        p-8
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

        {/* ==========================================
            LOADER
        =========================================== */}

        <div
          className="
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-indigo-50
          "
        >

          <Loader2
            size={28}
            className="
              animate-spin
              text-indigo-600
            "
          />

        </div>


        {/* ==========================================
            TITLE
        =========================================== */}

        <h2
          className="
            text-lg
            font-semibold
            text-gray-900
          "
        >
          {message}
        </h2>


        {/* ==========================================
            DESCRIPTION
        =========================================== */}

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-gray-500
          "
        >
          {description}
        </p>


        {/* ==========================================
            SECURITY MESSAGE
        =========================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-xs
            text-gray-500
          "
        >

          <ShieldCheck
            size={15}
            className="text-green-600"
          />

          <span>
            Your payment is securely processed.
          </span>

        </div>

      </div>

    </div>
  );
};


export default PaymentProcessing;