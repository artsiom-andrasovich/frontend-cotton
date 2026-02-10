"use client";

import { BarChart3 } from "lucide-react";
import { Rating } from "ts-fsrs";
import { BarChart } from "./bar-chart";
import { RatingSection } from "./rating-section";
import { StatsActions } from "./stats-actions";
import { StatsHeader } from "./stats-header";
import { useSessionStats } from "./use-session-stats.hook";

type StatsProps = {
  deckId: string;
  onRateAgain?: () => void;
};

export function Stats({ onRateAgain, deckId }: StatsProps) {
  const { stats, groupedByRating, cardsById, sessionCards, isLoading } =
    useSessionStats(deckId);

  if (isLoading) return <div>loading...</div>;

  if (!sessionCards || sessionCards.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="flex items-center justify-center min-h-full p-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
              <BarChart3 className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start studying to see your statistics and progress!
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const ratingOrder = [
    { rating: Rating.Again, cards: groupedByRating.again },
    { rating: Rating.Hard, cards: groupedByRating.hard },
    { rating: Rating.Good, cards: groupedByRating.good },
    { rating: Rating.Easy, cards: groupedByRating.easy },
  ] as const;

  return (
    <>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="p-6 space-y-6">
          <StatsHeader stats={stats} />
          <BarChart stats={stats} />

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg text-center mb-4 px-4 font-semibold text-gray-900 dark:text-white">
              Your Cards from This Session
            </h3>
            <div className="space-y-4">
              {ratingOrder.map(({ rating, cards }) => (
                <RatingSection
                  key={rating}
                  rating={rating}
                  cards={cards}
                  cardsById={cardsById}
                  deckId={deckId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <StatsActions deckId={deckId} onRateAgain={onRateAgain} />
    </>
  );
}
