export const API_URL = "http://localhost:3001";

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
    VERIFY_RESET_PASSWORD_CODE: "/user/reset-password-by-code/isValid",
    RESET_PASSWORD_BY_CODE: "/user/change-password-by-code",
    RESET_PASSWORD: "/user/change-password",
  },
  //reset-password
} as const;
