"use client";

import { Navbar } from "@/components/shared";
import { ErrorState } from "@/components/ui";
import { AppPaths } from "@/constants";
import { useGetDeckById } from "@/hooks/";
import { use } from "react";
import { CardsSection } from "./cards-section";
import { DeckActions } from "./deck-actions";
import { DeckInfo } from "./deck-info";
import { DeckOptions } from "./deck-options";
import { DeckStats } from "./stats";

export default function DeckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: deckId } = use(params);

  const { data: deck, isLoading, isError, error } = useGetDeckById(deckId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <span className="inline-block w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!deck || isError) {
    return (
      <ErrorState
        error={error}
        title="Error with fetching Deck"
        isError={isError}
        showRetry={false}
      >
        {/* Content */}
      </ErrorState>
    );
  }

  return (
    <>
      <Navbar title={deck.name} path={AppPaths.deck.DECKS}>
        <DeckOptions deckId={deckId} />
      </Navbar>
      <div className="p-4 space-y-6">
        {/* Description */}
        <div className="flex-col items-center justify-between">
          <p className="text-gray-600 p-2 dark:text-gray-400">
            {deck?.description}
          </p>
        </div>

        {/* Deck Stats */}
        <DeckStats
          cardCount={deck.cardCount}
          mastery={deck.mastery}
          lastStudied={deck.lastStudied}
        />
        {/* Quick Actions */}
        <DeckActions deckId={deckId} cardCount={deck.cardCount} />

        {/* Cards List */}

        <CardsSection deckId={deckId} />

        {/* Deck Info */}
        <DeckInfo
          category={deck.category}
          createdAt={deck.createdAt}
          lastStudied={deck.lastStudied}
        />
      </div>
    </>
  );
}
