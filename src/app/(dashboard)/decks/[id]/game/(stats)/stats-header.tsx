import { TStatsData } from "./stats";

export function StatsHeader({ stats }: { stats: TStatsData }) {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Session Complete! 🎉
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s how you did today
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stats.totalCards}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Cards Studied
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {stats.learningProgress.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Success Rate
          </div>
        </div>
      </div>
    </>
  );
}
