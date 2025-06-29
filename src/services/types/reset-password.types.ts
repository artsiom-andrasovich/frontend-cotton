export type TVerifyCodeDto = {
  email: string;
  code: string;
};

export type TResetPasswordByCode = {
  email: string;
  code: string;
  password: string;
  passwordRepeat: string;
};
