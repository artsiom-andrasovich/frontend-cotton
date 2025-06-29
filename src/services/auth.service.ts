import { axiosClassic } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import type {
  TAuthResponse,
  TSignInForm,
  TSignUpForm,
  TSignUpRes,
} from "./types";

export const authService = {
  async signIn(data: TSignInForm) {
    const res = await axiosClassic.post<TAuthResponse>(
      ApiPaths.auth.SIGN_IN,
      data
    );

    if (res.data.accessToken) saveTokenStorage(res.data.accessToken);

    return res;
  },

  async signUp(data: TSignUpForm): Promise<AxiosResponse<TSignUpRes>> {
    const res = await axiosClassic.post<TSignUpRes>(
      ApiPaths.auth.SIGN_UP,
      data
    );

    return res;
  },

  async getNewTokens() {
    const res = await axiosClassic.get<TAuthResponse>(
      ApiPaths.auth.REFRESH_TOKENS
    );

    if (res.data.accessToken) saveTokenStorage(res.data.accessToken);

    return res;
  },

  async logout() {
    const res = await axiosClassic.post(ApiPaths.auth.LOGOUT);
    if (res.status === 200) removeFromStorage();
    return res;
  },

  async activateAccount(data: {
    userId: string;
    code: string;
  }): Promise<AxiosResponse> {
    const res = await axiosClassic.post(ApiPaths.auth.ACTIVATE, data);
    //TODO:
    if (res.status === 200) {
    }
    return res;
  },

  async resendActivationCode(email: string): Promise<AxiosResponse> {
    const res = await axiosClassic.get(
      ApiPaths.auth.GET_ACTIVATION_CODE + `/${email}`
    );
    return res;
  },
};
