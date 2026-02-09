import { Card } from "@/components/shared";
import { Button } from "@/components/ui";
import { AppPaths } from "@/constants";
import { useGetListCards } from "@/hooks";
import Link from "next/link";


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
