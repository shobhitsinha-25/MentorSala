import { useEffect, useMemo, useRef, useState } from "react";

interface TimerProps {
  expiresAt: string;
  onTimeUp?: () => void;
}

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
};

const Timer = ({ expiresAt, onTimeUp }: TimerProps) => {
  const expiryTime = useMemo(
    () => new Date(expiresAt).getTime(),
    [expiresAt]
  );

  const hasSubmitted = useRef(false);

  const calculateRemaining = () =>
    Math.max(
      0,
      Math.floor((expiryTime - Date.now()) / 1000)
    );

  const [timeLeft, setTimeLeft] = useState(calculateRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateRemaining();

      setTimeLeft(remaining);

      if (remaining <= 0 && !hasSubmitted.current) {
        hasSubmitted.current = true;
        clearInterval(interval);
        onTimeUp?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime, onTimeUp]);

  const isCritical = timeLeft <= 300;
  const isWarning = timeLeft <= 600;

  const textColor = isCritical
    ? "text-red-600"
    : isWarning
    ? "text-amber-600"
    : "text-[#16A34A]";

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-1.5 text-slate-800 shadow-sm border border-purple-100/50">
      {/* Clock Icon matching MentorSala design */}
      <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 ${isCritical ? 'bg-red-50' : isWarning ? 'bg-amber-50' : ''}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`h-5 w-5 ${textColor}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <p className={`text-xl font-bold tracking-tight ${textColor}`}>
          {formatTime(timeLeft)}
        </p>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-1">
          Time Left
        </span>
      </div>
    </div>
  );
};

export default Timer;