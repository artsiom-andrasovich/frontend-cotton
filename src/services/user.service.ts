import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { TUserProfile } from "./types";

export const userService = {
  async getMyProfile(): Promise<AxiosResponse<TUserProfile>> {
    const res = await axiosWithAuth.get(ApiPaths.user.ME);

    return res;
  },

  async changeUserData(data: {
    username?: string;
    email?: string;
  }): Promise<AxiosResponse<{ user: TUserProfile; accessToken: string }>> {
    const res = await axiosWithAuth.patch<{
      user: TUserProfile;
      accessToken: string;
    }>(ApiPaths.user.CHANGE_USER_DATA, data);
    return res;
  },
};
