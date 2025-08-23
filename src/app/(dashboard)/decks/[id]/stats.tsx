import { BookOpen, Clock, TrendingUp } from "lucide-react";

type DeckStatsProps = {
  cardCount: number;
  lastStudied: string;
  mastery: number;
};

export const DeckStats = ({
  cardCount,
  lastStudied,
  mastery,
}: DeckStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {cardCount}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Cards</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {mastery}%
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Mastery</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
          <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {lastStudied?.startsWith("Time to start")
            ? lastStudied
            : "Last studied"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {!lastStudied?.startsWith("Time to start") && lastStudied}
        </p>
      </div>
    </div>
  );
};
