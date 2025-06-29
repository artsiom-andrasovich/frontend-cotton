export const AppPaths = {
  HOME: "/",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  CONFIRM: "/auth/confirm",
  FORGOT_PASSWORD: "/auth/sign-in/forgot-password",
  CHANGE_PASSWORD: "/auth/sign-in/forgot-password/change-password",
} as const;

export type TAppPaths = (typeof AppPaths)[keyof typeof AppPaths];
