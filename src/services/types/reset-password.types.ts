export type TVerifyCodeDto = {
  usernameOrEmail: string;
  code: string;
};

export type TVerifyCodeResponse = {
  userId: string;
  code: string;
};

export type TResetPasswordByCode = {
  userId: string;
  code: string;
  password: string;
  passwordRepeat: string;
};
