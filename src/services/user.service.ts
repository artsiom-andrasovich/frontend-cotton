import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { TUserProfile } from "./types";

export const userService = {
  async getMyProfile(): Promise<AxiosResponse<TUserProfile>> {
    const res = await axiosWithAuth.get(ApiPaths.user.ME);

    return res;
  },
};
