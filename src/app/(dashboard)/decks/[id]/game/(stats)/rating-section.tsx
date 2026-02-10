"use client";

import { Card as SharedCard } from "@/components/shared";
import { TCard } from "@/services/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card as FsrsCard, Rating } from "ts-fsrs";
import { getRatingColor, getRatingIcon } from "./style.util";

const RATING_LABELS: Record<Rating, string> = {
  [Rating.Again]: "Again",
  [Rating.Hard]: "Hard",
  [Rating.Good]: "Good",
  [Rating.Easy]: "Easy",
  [Rating.Manual]: "Manual",
};

type RatingSectionProps = {
  rating: Rating;
  cards: (FsrsCard & { cardId: string })[];
  cardsById: Record<string, TCard>;
  deckId: string;
};

export function RatingSection({
  rating,
  cards,
  cardsById,
  deckId,
}: RatingSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (cards.length === 0) return null;

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
      <button
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(rating)} flex items-center gap-2`}
        >
          {getRatingIcon(rating)} {RATING_LABELS[rating]}
        </span>
        <span className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          {cards.length}
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {cards
            .filter((card) => cardsById[card.cardId])
            .map((card) => (
              <div
                key={card.cardId}
                className="pt-4 bg-gray-50 dark:bg-gray-700"
              >
                <SharedCard card={cardsById[card.cardId]!} deckId={deckId} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
