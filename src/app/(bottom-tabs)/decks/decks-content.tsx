"use client";

import { useGetDecks } from "@/hooks";
import { DeckHeader } from "./deck-header";
import { DecksFilter } from "./decks-filter";
import { DecksList, EmptyDecksState } from "./decks-list";

export function DecksContent() {
  const { data, isLoading } = useGetDecks();
  const decks = data?.pages.flatMap((page) => page.items) ?? [];
  const hasDecks = decks.length > 0;

  // Show loading with header while checking
  if (isLoading) {
    return (
      <>
        <DeckHeader />
        <DecksList showEmptyState={false} />
      </>
    );
  }

  // No decks - show only the empty state, no header or filters
  if (!hasDecks) {
    return <EmptyDecksState />;
  }

  // Has decks - show header, filters, and list
  return (
    <>
      <DeckHeader />
      <DecksFilter />
      <DecksList showEmptyState={false} />
    </>
  );
}

