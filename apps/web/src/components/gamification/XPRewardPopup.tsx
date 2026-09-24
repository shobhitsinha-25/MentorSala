import { useEffect } from "react";

import { useAuthStore } from "../../store/auth.store";

// ======================================================
// XP REWARD POPUP
// ======================================================

const XPRewardPopup = () => {

  const xpReward =
    useAuthStore(
      (state) => state.xpReward
    );

  const clearXPReward =
    useAuthStore(
      (state) => state.clearXPReward
    );

  // ====================================================
  // AUTO HIDE AFTER 3 SECONDS
  // ====================================================

  useEffect(() => {

    if (!xpReward) {
      return;
    }

    const timer =
      setTimeout(() => {

        clearXPReward();

      }, 3000);

    return () => {

      clearTimeout(timer);

    };

  }, [
    xpReward,
    clearXPReward,
  ]);

  // ====================================================
  // NOTHING TO SHOW
  // ====================================================

  if (!xpReward) {
    return null;
  }

  // ====================================================
  // POPUP
  // ====================================================

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        pointer-events-none
      "
    >

      <div
        className="
          xp-reward-popup
          rounded-2xl
          bg-white
          px-10
          py-7
          text-center
          shadow-2xl
          border
          border-yellow-200
        "
      >

        {/* ============================================
            ICON
        ============================================ */}

        <div
          className="
            mb-2
            text-5xl
          "
        >
          ⭐
        </div>

        {/* ============================================
            XP AMOUNT
        ============================================ */}

        <div
          className="
            text-4xl
            font-extrabold
            text-yellow-500
          "
        >
          +{xpReward.amount} XP
        </div>

        {/* ============================================
            MESSAGE
        ============================================ */}

        <div
          className="
            mt-1
            text-sm
            font-medium
            text-gray-500
          "
        >
          XP Earned!
        </div>

      </div>

    </div>

  );
};

export default XPRewardPopup;