import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants/api.constants";
import {
  type DashboardStatsResponse,
  type TProfileStats,
} from "@/services/types";

export const statsService = {
  async getDashboardStats() {
    const { data } = await axiosWithAuth.get<DashboardStatsResponse>(
      ApiPaths.stats.DASHBOARD,
    );
    return data;
  },

  async getProfileStats() {
    const { data } = await axiosWithAuth.get<TProfileStats>(
      ApiPaths.stats.PROFILE,
    );
    return data;
  },
};
