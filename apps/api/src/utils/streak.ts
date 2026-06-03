export const calculateStreak = (
  lastActiveAt: Date | null,
  currentStreak: number
) => {
  const today = new Date();

  if (!lastActiveAt) {
    return 1;
  }

  const lastDate = new Date(
    lastActiveAt
  );

  // remove time portion
  today.setHours(0, 0, 0, 0);

  lastDate.setHours(0, 0, 0, 0);

  const diffTime =
    today.getTime() -
    lastDate.getTime();

  const diffDays = Math.floor(
    diffTime /
      (1000 * 60 * 60 * 24)
  );

  // same day
  if (diffDays === 0) {
    return currentStreak;
  }

  // consecutive day
  if (diffDays === 1) {
    return currentStreak + 1;
  }

  // missed one or more days
  return 0;
};