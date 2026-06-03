export const calculateLevel = (
  xp: number
) => {
  if (xp >= 30001) {
    return "Legend";
  }

  if (xp >= 18001) {
    return "Grandmaster";
  }

  if (xp >= 10001) {
    return "Champion";
  }

  if (xp >= 6001) {
    return "Expert";
  }

  if (xp >= 3001) {
    return "Gold Scholar";
  }

  if (xp >= 1501) {
    return "Scholar";
  }

  if (xp >= 501) {
    return "Learner";
  }

  return "Rookie";
};