"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import UpdateCardForm from "./update-card.form";

export default function CreateCardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-24">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}

function CardContent() {
  const params = useParams();
  const deckId = params.id as string;
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId");

  return <UpdateCardForm cardId={cardId ?? undefined} deckId={deckId} />;
}
