"use client";

import { Card } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { useGetGameCards } from "@/hooks";
import {
  GameSessionCard,
  gameStorageService,
} from "@/services/game-storage.service";
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card as FsrsCard, Rating } from "ts-fsrs";
import { BarChart } from "./bar-chart";
import { StatsHeader } from "./stats-header";
import { getRatingColor, getRatingIcon } from "./style.util";

export type TStatsData = {
  totalCards: number;
  ratingDistribution: {
    again: number;
    hard: number;
    good: number;
    easy: number;
  };
  learningProgress: number;
};

type StatsProps = {
  deckId: string;
  onRateAgain?: () => void;
};

export function Stats({ onRateAgain, deckId }: StatsProps) {
  const [showAgain, setShowAgain] = useState(false);
  const [showHard, setShowHard] = useState(false);
  const [showGood, setShowGood] = useState(false);
  const [showEasy, setShowEasy] = useState(false);
  const [data, setData] = useState<GameSessionCard[] | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const { data: cards, isLoading } = useGetGameCards(deckId);

  const cardsById = useMemo(() => {
    if (!cards) return {};
    return Object.fromEntries(cards.map((card) => [card.id, card]));
  }, [cards]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        setIsLoadingSession(true);
        const session = await gameStorageService.getSession(deckId);
        if (session) {
          setData(session.cards);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setIsLoadingSession(false);
      }
    };
    loadSession();
  }, [deckId]);

  if (isLoading || isLoadingSession) return <div>loading...</div>;
  if (!data) return <>No session data available</>;

  // Convert rate numbers to Rating enum values and attach cardId
  const markedCards = (() => {
    if (!data || data.length === 0) return [];

    return data.map((item) => ({
      cardWithId: { ...item.card, cardId: item.cardId } as any, // Attach cardId to card
      rating: item.rate as Rating,
    }));
  })();

  const groupedByRating = (() => {
    return markedCards.reduce(
      (acc, item) => {
        switch (item.rating) {
          case Rating.Again:
            acc.again.push(item.cardWithId);
            break;
          case Rating.Hard:
            acc.hard.push(item.cardWithId);
            break;
          case Rating.Good:
            acc.good.push(item.cardWithId);
            break;
          case Rating.Easy:
            acc.easy.push(item.cardWithId);
            break;
        }
        return acc;
      },
      {
        again: [] as (FsrsCard & { cardId: string })[],
        hard: [] as (FsrsCard & { cardId: string })[],
        good: [] as (FsrsCard & { cardId: string })[],
        easy: [] as (FsrsCard & { cardId: string })[],
      }
    );
  })();

  console.log("Grouped by rating:", groupedByRating);
  console.log("=== END DEBUG ===");

  const stats: TStatsData = (() => {
    if (!data || data.length === 0) {
      return {
        totalCards: 0,
        ratingDistribution: {
          again: 0,
          hard: 0,
          good: 0,
          easy: 0,
        },
        learningProgress: 0,
      };
    }

    // Calculate rating distribution
    const ratingCounts = data.reduce(
      (acc, item) => {
        const rating = item.rate as Rating;
        switch (rating) {
          case Rating.Again:
            acc.again++;
            break;
          case Rating.Hard:
            acc.hard++;
            break;
          case Rating.Good:
            acc.good++;
            break;
          case Rating.Easy:
            acc.easy++;
            break;
        }
        return acc;
      },
      { again: 0, hard: 0, good: 0, easy: 0 }
    );

    // Calculate learning progress (weighted by rating success)
    const progressScore = data.reduce((score, item) => {
      const rating = item.rate as Rating;
      switch (rating) {
        case Rating.Again:
          return score + 0;
        case Rating.Hard:
          return score + 0.3;
        case Rating.Good:
          return score + 0.7;
        case Rating.Easy:
          return score + 1;
        default:
          return score;
      }
    }, 0);

    const learningProgress = (progressScore / data.length) * 100;
    console.log(progressScore);
    console.log(data.length);
    console.log(learningProgress);

    return {
      totalCards: data.length,
      ratingDistribution: ratingCounts,
      learningProgress,
    };
  })();

  console.log("cards");
  console.log(cards);
  console.log("cardsById");
  console.log(cardsById);
  console.log("data");
  console.log(groupedByRating);

  // no-op

  if (!data || data.length === 0) {
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

  return (
    <>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Simple Header */}
          <StatsHeader stats={stats} />

          {/* Rating Summary - Simple Bars */}
          <BarChart stats={stats} />

          {/* Quick Actions */}

          {/* Card Review Section - Only if requested */}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg text-center mb-4 px-4 font-semibold text-gray-900 dark:text-white">
              Your Cards from This Session
            </h3>
            <div className="space-y-4">
              {/* Again Section */}
              {groupedByRating.again.length > 0 && (
                <div key="again-section" className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3"
                    onClick={() => setShowAgain(!showAgain)}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                        Rating.Again
                      )} flex items-center gap-2`}
                    >
                      {getRatingIcon(Rating.Again)} Again
                    </span>
                    <span className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      {groupedByRating.again.length}
                      {showAgain ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {showAgain && (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {groupedByRating.again
                        .filter((card) => cardsById[card.cardId]) // Filter out missing cards
                        .map((card) => (
                        <div
                          key={card.cardId}
                          className="pt-4 bg-gray-50 dark:bg-gray-700"
                        >
                          <Card
                            card={cardsById[card.cardId]!}
                            deckId={deckId}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Hard Section */}

              {groupedByRating.hard.length > 0 && (
                <div key="hard-section" className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3"
                    onClick={() => setShowHard(!showHard)}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                        Rating.Hard
                      )} flex items-center gap-2`}
                    >
                      {getRatingIcon(Rating.Hard)} Hard
                    </span>
                    <span className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      {groupedByRating.hard.length}
                      {showHard ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {showHard && (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {groupedByRating.hard
                        .filter((card) => cardsById[card.cardId]) // Filter out missing cards
                        .map((card) => (
                        <div
                          key={card.cardId}
                          className=" bg-gray-50 dark:bg-gray-700
                       pt-4 "
                        >
                          <Card
                            card={cardsById[card.cardId] as any}
                            deckId={deckId}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Good Section */}
              {groupedByRating.good.length > 0 && (
                <div key="good-section" className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3"
                    onClick={() => setShowGood(!showGood)}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                        Rating.Good
                      )} flex items-center gap-2`}
                    >
                      {getRatingIcon(Rating.Good)} Good
                    </span>
                    <span className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      {groupedByRating.good.length}
                      {showGood ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {showGood && (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {groupedByRating.good
                        .filter((card) => cardsById[card.cardId]) // Filter out missing cards
                        .map((card) => (
                        <div
                          key={card.cardId}
                          className="pt-4 bg-gray-50 dark:bg-gray-700"
                        >
                          <Card
                            card={cardsById[card.cardId] as any}
                            deckId={deckId}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Easy Section */}
              {groupedByRating.easy.length > 0 && (
                <div key="easy-section" className="border border-gray-200 dark:border-gray-600 rounded-lg">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3"
                    onClick={() => setShowEasy(!showEasy)}
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(
                        Rating.Easy
                      )} flex items-center gap-2`}
                    >
                      {getRatingIcon(Rating.Easy)} Easy
                    </span>
                    <span className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      {groupedByRating.easy.length}
                      {showEasy ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {showEasy && (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {groupedByRating.easy
                        .filter((card) => cardsById[card.cardId]) // Filter out missing cards
                        .map((card) => (
                        <div
                          key={card.cardId}
                          className="pt-4 bg-gray-50 dark:bg-gray-700"
                        >
                          <Card
                            card={cardsById[card.cardId] as any}
                            deckId={deckId}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 pb-6 rounded-t-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          What would you like to do next?
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/**TODO it normaly */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => onRateAgain && onRateAgain()}
            className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 h-16 text-lg font-semibold"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Study Again
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-16 text-lg font-semibold"
            onClick={async () => await gameStorageService.deleteSession(deckId)}
          >
            <Link href={AppPaths.deck.DECKS + `/${deckId}`}>
              <ClipboardList className="w-5 h-5 mr-2" />
              Go to deck
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
