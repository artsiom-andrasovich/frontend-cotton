"use client";

import { useProfileStats } from "@/hooks/use-stats.hook";
import { Clock, Sigma, TrendingUp } from "lucide-react";

export function StatsSection() {
  const { profileStats, isProfileStatsLoading } = useProfileStats();

  if (isProfileStatsLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 h-32 animate-pulse" />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 h-32 animate-pulse" />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 h-32 animate-pulse" />
      </div>
    );
  }

  const { stats } = profileStats || {
    stats: { masteredCardsCount: 0, studyTimeHours: 0, avgMastery: 0 },
  };

  const formatStudyTime = (hours: number) => {
    if (!hours) return "0m";
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours}h`;
  };

  const userStats = [
    {
      label: "Average Mastery",
      value: `${stats.avgMastery}%`,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      label: "Study Time",
      value: formatStudyTime(stats.studyTimeHours),
      icon: Clock,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "Cards Mastered",
      value: stats.masteredCardsCount.toString(),
      icon: Sigma,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {userStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center flex flex-col items-center justify-center"
          >
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}
            >
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
