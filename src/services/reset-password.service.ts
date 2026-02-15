import { axiosClassic } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import type {
  TResetPasswordByCode,
  TVerifyCodeDto,
  TVerifyCodeResponse,
} from "./types";

export const resetPasswordService = {
  async getResetPasswordCode(usernameOrEmail: string) {
    await axiosClassic.get(
      ApiPaths.reset_password.GET_RESET_PASSWORD_CODE + `/${usernameOrEmail}`,
    );
  },
  async verifyCode(dto: TVerifyCodeDto) {
    const { data } = await axiosClassic.post<TVerifyCodeResponse>(
      ApiPaths.reset_password.VERIFY_RESET_PASSWORD_CODE,
      dto,
    );
    return data;
  },
  async resetPasswordByCode(dto: TResetPasswordByCode) {
    await axiosClassic.patch(
      ApiPaths.reset_password.RESET_PASSWORD_BY_CODE,
      dto,
    );
  },
  async resetPassword() {},
};
