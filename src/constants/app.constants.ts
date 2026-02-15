export const passwordComplexity =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const regexPatterns = {
  username: /^(?!.*_{5,})[a-zA-Z0-9_]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

export const DEFAULT_DECK_PAGE_LIMIT = 5;

export const DEFAULT_CARD_PAGE_LIMIT = 5;

export const POSSIBLE_SORT_BY_DECK = [
  { value: "recent", label: "Recently Studied" },
  { value: "mastery", label: "Mastery" },
  { value: "cards", label: "Card Count" },
  { value: "alphabetical", label: "A-Z" },
  { value: "newest", label: "Newest" },
];

export const POSSIBLE_SORT_BY_CARD = [
  { value: "easiest", label: "Easiest" },
  { value: "oldest", label: "Oldest" },
  { value: "hardest", label: "Hardest" },
  { value: "newest", label: "Newest" },
];
