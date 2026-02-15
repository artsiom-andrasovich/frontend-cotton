"use client";

import { ShortDeckCard } from "@/components/shared/short-deck-card";
import { useStats } from "@/hooks/use-stats.hook";

export function RecentActivity() {
  const { stats, isStatsLoading } = useStats();

  if (isStatsLoading) {
    return (
      <div className="h-40 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  const activities = stats?.recentActivity || [];

  if (activities.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center text-gray-500">
          No recent activity
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Recent Activity
      </h3>

      <div className="space-y-3">
        {activities.map((activity) => (
          <ShortDeckCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
