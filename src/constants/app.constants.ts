export const passwordComplexity =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const DEFAULT_DECK_PAGE_LIMIT = 5;

export const POSSIBLE_SORT_BY_DECK = [
  { value: "recent", label: "Recently Studied" },
  { value: "mastery", label: "Mastery" },
  { value: "cards", label: "Card Count" },
  { value: "alphabetical", label: "A-Z" },
  { value: "newest", label: "Newest" },
];
