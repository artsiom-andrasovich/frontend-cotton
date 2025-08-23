"use client";

import { Navbar } from "@/components/shared";
import { AppPaths } from "@/constants";
import { useParams } from "next/navigation";
import { CardsFilter } from "./cards-filter";
import { CardsList } from "./cards-list";

const mockCards = [
  {
    id: 1,
    front: "What is a variable in JavaScript?",
    back: "A variable is a container for storing data values. It can hold different types of data like numbers, strings, objects, etc.",
    difficulty: "easy",
    lastReviewed: "2 hours ago",
    createdAt: "2024-07-01T10:00:00Z",
  },
  {
    id: 2,
    front: "What is the difference between let, const, and var?",
    back: "let: block-scoped, can be reassigned; const: block-scoped, cannot be reassigned; var: function-scoped, can be reassigned",
    difficulty: "medium",
    lastReviewed: "1 day ago",
    createdAt: "2024-06-30T10:00:00Z",
  },
  {
    id: 3,
    front: "What is a function in JavaScript?",
    back: "A function is a reusable block of code that performs a specific task. It can take parameters and return values.",
    difficulty: "easy",
    lastReviewed: "3 days ago",
    createdAt: "2024-06-29T10:00:00Z",
  },
  {
    id: 4,
    front: "Explain closures in JavaScript.",
    back: "A closure is a function that has access to its own scope, the outer function's scope, and the global scope.",
    difficulty: "hard",
    lastReviewed: "5 days ago",
    createdAt: "2024-06-28T10:00:00Z",
  },
];

export default function DeckCardsPage() {
  const params = useParams();
  const deckId = params.id as string;

  //TODO: hook below
  //navbar here and edit pages too make like ?edit ?create

  return (
    <>
      <Navbar path={`${AppPaths.deck.DECKS}/${deckId}`} title={"All cards"}>
        <CardsFilter />
      </Navbar>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <CardsList deckId={deckId} />
      </div>
    </>
  );
}
