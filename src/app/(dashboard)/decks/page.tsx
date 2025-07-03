"use client";

import { DeckHeader } from "./deck-header";
import { DecksFilter } from "./decks-filter";
import { DecksList } from "./decks-list";
import { ResultsCounts } from "./results-count";

export default function DecksPage() {
  // Get unique categories

  // подгружать 8 категорий, остальные через инфинити лоад

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <DeckHeader />

      {/* Filters and Sort - Design Only */}
      <DecksFilter />

      {/* Results Count */}
      <ResultsCounts />

      {/* Decks Grid */}
      <DecksList />
    </div>
  );
}
