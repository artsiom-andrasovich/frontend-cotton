//TODO:
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const ApiPaths = {
  auth: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    LOGOUT: "/auth/logout",
    REFRESH_TOKENS: "/auth/refresh-tokens",
    ACTIVATE: "/auth/activate-account",
    GET_ACTIVATION_CODE: "/auth/activation-code",
  },
  reset_password: {
    GET_RESET_PASSWORD_CODE: "/user/get-reset-password-code",
    VERIFY_RESET_PASSWORD_CODE: "/user/reset-password-by-code/is-valid",
    RESET_PASSWORD_BY_CODE: "/user/reset-password-by-code",
    RESET_PASSWORD: "/user/change-password",
  },
  user: {
    ME: "/user/get-me",
    CHANGE_USER_DATA: "/user/change-user-data",
  },
  deck: {
    CREATE_DECK: "/deck/create-deck",
    UPDATE_DECK: "/deck/update-deck",
    DELETE_DECK: (deckId: string) => `/deck/delete-deck/${deckId}`,
    LIST_DECKS: "/deck/list-user-decks",
    GET_DECK_BY_ID: (deckId: string) => `/deck/get-deck/${deckId}`,
  },
  categories: {
    LIST_USER_CATEGORIES: "/categories/list-user-categories",
  },
  cards: {
    CREATE_CARD: "/card/create-card",
    LIST_CARDS: "/card/list-cards",
    UPDATE_CARD: "/card/update-card",
    GET_CARD_BY_ID: "/card/get-card-by-id",
    DELETE_CARDS: "/card/delete-cards",
  },
  fsrs: {
    GAME_PARAMS: (deckId: string) => `/fsrs/game-params/${deckId}`,
    GAME_CARDS: (deckId: string) => `/fsrs/game-cards/${deckId}`,
    UPDATE_FSRS_CARDS_PARAMS: `/fsrs/update-fsrs-cards-params`,
  },
  profile: {
    UPLOAD_AVATAR: "/profile/upload-avatar",
    DELETE_AVATAR: "/profile/delete-avatar",
    UPDATE_PROFILE: "/profile/update-profile-data",
    GET_PROFILE: (username: string) => `/profile/get-profile/${username}`,
  },
  stats: {
    DASHBOARD: "/stats/dashboard",
    PROFILE: "/stats/profile",
  },
  //reset-password
} as const;
