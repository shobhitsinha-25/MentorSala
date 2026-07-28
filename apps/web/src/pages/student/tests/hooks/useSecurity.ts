import { useCallback, useEffect, useRef, useState } from "react";

import {
  enterFullscreen,
  enableExamSecurity,
  disableExamSecurity,
} from "../utils/security";

interface UseExamSecurityProps {
  enabled?: boolean;
  maxViolations?: number;
  onAutoSubmit?: () => void;
}

type ViolationType =
  | "FULLSCREEN"
  | "TAB_SWITCH"
  | "WINDOW_BLUR";

const VIOLATION_COOLDOWN = 1000;

export default function useExamSecurity({
  enabled = true,
  maxViolations = 3,
  onAutoSubmit,
}: UseExamSecurityProps) {
  const [warningCount, setWarningCount] = useState(0);
  const [showExitModal, setShowExitModal] =
    useState(false);

  const lastViolationTime = useRef(0);

  // ==========================================
  // Register Security Violation
  // ==========================================

  const registerViolation = useCallback(
    (type: ViolationType) => {
      const now = Date.now();

      // Ignore duplicate browser events fired together
      if (
        now - lastViolationTime.current <
        VIOLATION_COOLDOWN
      ) {
        return;
      }

      lastViolationTime.current = now;

      console.log("Security Violation:", type);

      setWarningCount((prev) => {
        const next = prev + 1;

        if (next >= maxViolations) {
          onAutoSubmit?.();
        } else {
          setShowExitModal(true);
        }

        return next;
      });
    },
    [maxViolations, onAutoSubmit]
  );

  // ==========================================
  // Fullscreen Exit Detection
  // ==========================================

  useEffect(() => {
    if (!enabled) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        registerViolation("FULLSCREEN");
      }
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, [enabled, registerViolation]);

  // ==========================================
  // Tab Switch Detection
  // ==========================================

  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        registerViolation("TAB_SWITCH");
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [enabled, registerViolation]);

  // ==========================================
  // Window Blur Detection
  // ==========================================

  useEffect(() => {
    if (!enabled) return;

    const handleBlur = () => {
      registerViolation("WINDOW_BLUR");
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener(
        "blur",
        handleBlur
      );
    };
  }, [enabled, registerViolation]);

  // ==========================================
  // Enable Browser Security
  // ==========================================

  useEffect(() => {
    if (!enabled) return;

    enableExamSecurity();

    return () => {
      disableExamSecurity();
    };
  }, [enabled]);

  // ==========================================
  // Return To Fullscreen
  // ==========================================

  const reEnterFullscreen =
    useCallback(async () => {
      await enterFullscreen();

      if (document.fullscreenElement) {
        setShowExitModal(false);
      }
    }, []);

  return {
    warningCount,
    showExitModal,
    reEnterFullscreen,
    closeModal: () =>
      setShowExitModal(false),
  };
}