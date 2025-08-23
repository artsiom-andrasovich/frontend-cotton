"use client";

import { useSearchParams } from "next/navigation";
import UpdateDeckForm from "../decks/(forms)/update-deck";

export default function DeckPage() {
  const searchParams = useSearchParams() as unknown as Map<"deckId", string>;
  const deckId = searchParams.get("deckId");
  return <UpdateDeckForm deckId={deckId} />;
}
