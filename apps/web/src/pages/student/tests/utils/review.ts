export const formatTime = (
  seconds: number
) => {
  const hrs = Math.floor(
    seconds / 3600
  );

  const mins = Math.floor(
    (seconds % 3600) / 60
  );

  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }

  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }

  return `${secs}s`;
};

export const getStatusColor = (
  status: string
) => {
  switch (status) {
    case "CORRECT":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-500",
      };

    case "WRONG":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-500",
      };

    default:
      return {
        bg: "bg-slate-100",
        text: "text-slate-700",
        border: "border-slate-400",
      };
  }
};