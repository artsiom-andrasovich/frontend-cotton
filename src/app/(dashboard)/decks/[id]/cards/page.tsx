"use client";

import { Navbar } from "@/components/shared";
import { AppPaths } from "@/constants";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CardsFilter } from "./cards-filter";
import { CardsList } from "./cards-list";


export default function DeckCardsPage() {
  const params = useParams();
  const deckId = params.id as string;
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocusChange = (isFocused: boolean) => {
    if (isFocused) {
      setIsSearchFocused(true);
    } else {
      // Delay showing the title again to match animation duration
      setTimeout(() => {
        setIsSearchFocused(false);
      }, 300);
    }
  };

  //TODO: hook below
  //navbar here and edit pages too make like ?edit ?create

  return (
    <>
      <Navbar
        path={`${AppPaths.deck.DECKS}/${deckId}`}
        title={
          isSearchFocused ? (
            <span className="hidden sm:inline">All cards</span>
          ) : (
            "All cards"
          )
        }
      >
        <CardsFilter onSearchFocusChange={handleSearchFocusChange} />
      </Navbar>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <CardsList deckId={deckId} />
      </div>
    </>
  );
}
