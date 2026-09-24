import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";


// ======================================================
// STATUS TYPE
// ======================================================

export type PaymentStatusType =
  | "SUCCESS"
  | "FAILED"
  | "PENDING";


// ======================================================
// PROPS
// ======================================================

interface PaymentStatusProps {
  status: PaymentStatusType;

  title?: string;

  message?: string;

  actionLabel?: string;

  onAction?: () => void;
}


// ======================================================
// COMPONENT
// ======================================================

const PaymentStatus = ({
  status,
  title,
  message,
  actionLabel,
  onAction,
}: PaymentStatusProps) => {

  // ====================================================
  // SUCCESS
  // ====================================================

  if (status === "SUCCESS") {

    return (
      <div
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          border-green-200
          bg-white
          p-8
          text-center
        "
      >

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-green-50
          "
        >
          <CheckCircle2
            size={36}
            className="text-green-600"
          />
        </div>


        <h2
          className="
            mt-5
            text-xl
            font-semibold
            text-gray-900
          "
        >
          {title || "Payment Successful"}
        </h2>


        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-gray-500
          "
        >
          {message ||
            "Your payment has been successfully verified and your subscription is now active."}
        </p>


        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="
              mt-6
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
            {actionLabel}

            <ArrowRight size={16} />
          </button>
        )}

      </div>
    );
  }


  // ====================================================
  // FAILED
  // ====================================================

  if (status === "FAILED") {

    return (
      <div
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          border-red-200
          bg-white
          p-8
          text-center
        "
      >

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-red-50
          "
        >
          <XCircle
            size={36}
            className="text-red-600"
          />
        </div>


        <h2
          className="
            mt-5
            text-xl
            font-semibold
            text-gray-900
          "
        >
          {title || "Payment Failed"}
        </h2>


        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-gray-500
          "
        >
          {message ||
            "We were unable to verify your payment. If money was deducted, please do not make another payment immediately."}
        </p>


        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="
              mt-6
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
            {actionLabel}

            <ArrowRight size={16} />
          </button>
        )}

      </div>
    );
  }


  // ====================================================
  // PENDING
  // ====================================================

  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-yellow-200
        bg-white
        p-8
        text-center
      "
    >

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-yellow-50
        "
      >
        <AlertCircle
          size={36}
          className="text-yellow-600"
        />
      </div>


      <h2
        className="
          mt-5
          text-xl
          font-semibold
          text-gray-900
        "
      >
        {title || "Payment Processing"}
      </h2>


      <p
        className="
          mt-2
          max-w-md
          text-sm
          leading-6
          text-gray-500
        "
      >
        {message ||
          "Your payment is still being processed. Please wait while we confirm the transaction."}
      </p>


      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="
            mt-6
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
          {actionLabel}

          <ArrowRight size={16} />
        </button>
      )}

    </div>
  );
};


export default PaymentStatus;