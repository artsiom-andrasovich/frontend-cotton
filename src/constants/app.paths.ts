export const AppPaths = {
  HOME: "/",
  auth: {
    SIGN_UP: "/auth/sign-up",
    SIGN_IN: "/auth/sign-in",
    CONFIRM: "/auth/confirm",
    FORGOT_PASSWORD: "/auth/sign-in/forgot-password",
    CHANGE_PASSWORD: "/auth/sign-in/forgot-password/change-password",
  },
  deck: {
    DECKS: "/decks",
    DECK: "/deck",
  },
  card: {
    CARD: (deckId: string) => `/decks/${deckId}/card`,
    CARDS: (deckId: string) => `/decks/${deckId}/cards`,
  },
  game: {
    GAME: (deckId: string) => `/decks/${deckId}/game`,
  },
  profile: {
    PROFILE: "/profile",
  },
  settings: {
    SETTINGS: "/profile/settings",
  },
  explore:{
    EXPLORE:'/explore'
  }
} as const;

export type TAppPaths = (typeof AppPaths)[keyof typeof AppPaths];
