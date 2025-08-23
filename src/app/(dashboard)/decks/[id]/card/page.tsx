"use client";

import { useParams, useSearchParams } from "next/navigation";
import UpdateCardForm from "./update-card.form";

export default function CreateCardPage() {
  const params = useParams();
  const deckId = params.id as string;
  const searchParams = useSearchParams() as unknown as Map<"cardId", string>;
  const cardId = searchParams.get("cardId");

  return <UpdateCardForm cardId={cardId} deckId={deckId} />;
}
