import { Card } from "@/components/shared";
import { Button } from "@/components/ui";
import { AppPaths } from "@/constants";
import { useGetListCards } from "@/hooks";
import { Plus } from "lucide-react";
import Link from "next/link";

export const CardsSection = ({ deckId }: { deckId: string }) => {
  const { data } = useGetListCards(deckId);
  const cards = data?.pages.flatMap((page) => page.items) ?? [];

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
        <div className="rounded-full bg-indigo-100 p-4 dark:bg-indigo-900/20">
          <Plus className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="space-y-2 max-w-xs px-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Start Learning
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Your deck is empty. Create your first card to begin mastering this
            topic.
          </p>
        </div>
        <Link href={AppPaths.card.CARD(deckId)}>
          <Button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-full px-6">
            Create First Card
          </Button>
        </Link>
      </div>
    );
  }

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
