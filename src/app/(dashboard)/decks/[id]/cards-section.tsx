import { Card } from "@/components/shared";
import { Button } from "@/components/ui";
import { AppPaths } from "@/constants";
import { useGetListCards } from "@/hooks";
import Link from "next/link";

const sampleCards = [
  {
    id: 1,
    front: "What is a variable in JavaScript?",
    back: "A variable is a container for storing data values. It can hold different types of data like numbers, strings, objects, etc.",
    difficulty: "easy",
    lastReviewed: "2 hours ago",
  },
  {
    id: 2,
    front: "What is the difference between let, const, and var?",
    back: "let: block-scoped, can be reassigned; const: block-scoped, cannot be reassigned; var: function-scoped, can be reassigned",
    difficulty: "medium",
    lastReviewed: "1 day ago",
  },
  {
    id: 3,
    front: "What is a function in JavaScript?",
    back: "A function is a reusable block of code that performs a specific task. It can take parameters and return values.",
    difficulty: "easy",
    lastReviewed: "3 days ago",
  },
];

export const CardsSection = ({ deckId }: { deckId: string }) => {
  const { data } = useGetListCards(deckId);
  const cards = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Cards
        </h2>

        <Link href={AppPaths.card.CARDS(deckId)}>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {cards.map((card) => (
          <Card deckId={deckId} card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
};
