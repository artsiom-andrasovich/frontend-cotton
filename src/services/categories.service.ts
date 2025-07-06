import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { type TCategory } from "./types";

export const categoriesService = {
  async listUserCategories(): Promise<AxiosResponse<TCategory[]>> {
    const res = await axiosWithAuth.get(
      ApiPaths.categories.LIST_USER_CATEGORIES
    );
    return res;
  },
};
