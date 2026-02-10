"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import UpdateDeckForm from "../decks/(forms)/update-deck";

export default function DeckPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-24">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <DeckContent />
    </Suspense>
  );
}

function DeckContent() {
  const searchParams = useSearchParams();
  const deckId = searchParams.get("deckId");
  return <UpdateDeckForm deckId={deckId ?? undefined} />;
}
