import { Rating } from "ts-fsrs";
import { TStatsData } from "./stats";
import { getRatingColor, getRatingIcon } from "./style.util";

type BarChartProps = {
  stats: TStatsData;
};

export function BarChart({ stats }: BarChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
        How did you rate each card?
      </h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
              Rating.Again
            )} flex items-center gap-2 w-20 justify-center`}
          >
            {getRatingIcon(Rating.Again)}
            Again
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${
                  (stats.ratingDistribution.again / stats.totalCards) * 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
            {stats.ratingDistribution.again}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
              Rating.Hard
            )} flex items-center gap-2 w-20 justify-center`}
          >
            {getRatingIcon(Rating.Hard)}
            Hard
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${
                  (stats.ratingDistribution.hard / stats.totalCards) * 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
            {stats.ratingDistribution.hard}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
              Rating.Good
            )} flex items-center gap-2 w-20 justify-center`}
          >
            {getRatingIcon(Rating.Good)}
            Good
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${
                  (stats.ratingDistribution.good / stats.totalCards) * 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
            {stats.ratingDistribution.good}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
              Rating.Easy
            )} flex items-center gap-2 w-20 justify-center`}
          >
            {getRatingIcon(Rating.Easy)}
            Easy
          </span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className=" bg-green-500  h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${
                  (stats.ratingDistribution.easy / stats.totalCards) * 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
            {stats.ratingDistribution.easy}
          </span>
        </div>
      </div>
    </div>
  );
}
