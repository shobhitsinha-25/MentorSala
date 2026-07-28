import ExitFullScreenModal from "./ExitFullscreenModal";
import useExamSecurity from "../hooks/useSecurity";

interface SecurityGuardProps {
  enabled?: boolean;
  maxViolations?: number;
  onAutoSubmit: () => void;
}

export default function SecurityGuard({
  enabled = true,
  maxViolations = 3,
  onAutoSubmit,
}: SecurityGuardProps) {
  const {
    warningCount,
    showExitModal,
    reEnterFullscreen,
  } = useExamSecurity({
    enabled,
    maxViolations,
    onAutoSubmit,
  });

  return (
    <>
      {showExitModal && (
        <ExitFullScreenModal
          open={showExitModal}
          warningCount={warningCount}
          maxWarnings={maxViolations}
          onContinue={reEnterFullscreen}
        />
      )}
    </>
  );
}