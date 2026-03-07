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

export function useProfileStats() {
  const { data: profileStats, isLoading: isProfileStatsLoading } = useQuery({
    queryKey: ["profile-stats"],
    queryFn: () => statsService.getProfileStats(),
    staleTime: 60 * 1000 * 2.5, // 2.5 minutes
  });

  return {
    profileStats,
    isProfileStatsLoading,
  };
}
