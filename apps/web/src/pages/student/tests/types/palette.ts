export const PaletteStatus = {
  NOT_VISITED: "NOT_VISITED",
  NOT_ANSWERED: "NOT_ANSWERED",
  ANSWERED: "ANSWERED",
  REVIEW: "REVIEW",
  ANSWERED_REVIEW: "ANSWERED_REVIEW",
  CURRENT: "CURRENT",
} as const;

export type PaletteStatus =
  (typeof PaletteStatus)[keyof typeof PaletteStatus];