import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { TProfile, TUpdateProfileForm } from "./types";

export const profileService = {
  async getProfile(username: string): Promise<AxiosResponse<TProfile>> {
    const res = await axiosWithAuth.get<TProfile>(
      ApiPaths.profile.GET_PROFILE(username),
    );
    return res;
  },

  async updateProfile(
    data: TUpdateProfileForm,
  ): Promise<AxiosResponse<TProfile>> {
    const res = await axiosWithAuth.patch<TProfile>(
      ApiPaths.profile.UPDATE_PROFILE,
      data,
    );
    return res;
  },

  async uploadAvatar(file: File): Promise<AxiosResponse<void>> {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axiosWithAuth.patch<void>(
      ApiPaths.profile.UPLOAD_AVATAR,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res;
  },

  async deleteAvatar(): Promise<AxiosResponse<void>> {
    const res = await axiosWithAuth.delete<void>(
      ApiPaths.profile.DELETE_AVATAR,
    );
    return res;
  },
};
