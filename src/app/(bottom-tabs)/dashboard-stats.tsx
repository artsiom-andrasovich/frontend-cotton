"use client";

import { useStats } from "@/hooks/use-stats.hook";
import { BookOpen, Clock } from "lucide-react";

export function DashboardStats() {
  const { stats, isStatsLoading } = useStats();

  if (isStatsLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 h-24 animate-pulse" />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 h-24 animate-pulse" />
      </div>
    );
  }

  const formatStudyTime = (hours: number) => {
    if (!hours) return "0m";
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours}h`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Decks
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {stats?.totalDecks || 0}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Study Time
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {formatStudyTime(stats?.studyTimeHours || 0)}
        </p>
      </div>
    </div>
  );
}
