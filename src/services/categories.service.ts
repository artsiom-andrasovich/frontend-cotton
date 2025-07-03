import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";

export const categoriesService = {
  async listUserCategories(): Promise<AxiosResponse<string[]>> {
    const res = await axiosWithAuth.get(
      ApiPaths.categories.LIST_USER_CATEGORIES
    );
    return res;
  },
};
