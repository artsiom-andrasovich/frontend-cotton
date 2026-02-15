import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants/api.constants";
import { DashboardStatsResponse } from "@/services/types";

class StatsService {
  async getDashboardStats() {
    const { data } = await axiosWithAuth.get<DashboardStatsResponse>(
      ApiPaths.stats.DASHBOARD,
    );
    return data;
  }
}

export const statsService = new StatsService();
