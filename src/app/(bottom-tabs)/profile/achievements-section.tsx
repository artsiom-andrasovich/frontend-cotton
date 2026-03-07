import { TrendingUp } from "lucide-react";

export function AchievementsSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
        <TrendingUp className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        Achievements
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">Coming Soon</p>
    </div>
  );
}
