"use client";

import { Navbar } from "@/components/shared";
import { ErrorState } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { useGetDeckById } from "@/hooks/";
import { Pencil, Play, Plus } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { CardsSection } from "./cards-section";
import { DeckInfo } from "./deck-info";
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
      <Navbar title={deck.name}>
        <Button variant="outline" size="sm">
          <Link href={AppPaths.deck.DECK + `?deckId=${deckId}`}>
            <Pencil className="w-4 h-4 " />
          </Link>
        </Button>
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
        <div className="grid grid-cols-2 gap-3">
          <Button
            asChild
            className="h-16 flex flex-col items-center justify-center space-y-1 bg-primary hover:bg-primary/90"
          >
            <Link href={AppPaths.game.GAME(deckId)}>
              <Play className="w-5 h-5" />
              <span className="text-sm">Study Now</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-16 flex flex-col items-center justify-center space-y-1"
          >
            <Link href={AppPaths.card.CARD(deckId)}>
              <Plus className="w-5 h-5" />
              <span className="text-sm">Add Cards</span>
            </Link>
          </Button>
        </div>

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
