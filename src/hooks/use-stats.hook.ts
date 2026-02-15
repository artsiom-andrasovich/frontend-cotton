import { statsService } from "@/services/stats.service";
import { useQuery } from "@tanstack/react-query";

export function useStats() {
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => statsService.getDashboardStats(),
    staleTime: 60 * 1000 * 5, // 5 minutes
  });

  return {
    stats,
    isStatsLoading,
  };
}
