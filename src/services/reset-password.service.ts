import { axiosClassic } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import type { TResetPasswordByCode, TVerifyCodeDto } from "./types";

export const resetPasswordService = {
  async getResetPasswordCode(email: string) {
    await axiosClassic.get(
      ApiPaths.reset_password.GET_RESET_PASSWORD_CODE + `/${email}`
    );
  },
  async verifyCode(dto: TVerifyCodeDto) {
    console.log(dto);

    await axiosClassic.post(
      ApiPaths.reset_password.VERIFY_RESET_PASSWORD_CODE,
      dto
    );
  },
  async resetPasswordByCode(dto: TResetPasswordByCode) {
    await axiosClassic.put(ApiPaths.reset_password.RESET_PASSWORD_BY_CODE, dto);
  },
  async resetPassword() {},
};
