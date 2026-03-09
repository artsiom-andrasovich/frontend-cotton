import { Card } from "@/components/shared";
import { Skeleton } from "@/components/ui";
import { useGetListCards } from "@/hooks";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type CardListProps = {
  deckId: string;
  isSelecting?: boolean;
  selectedIds?: Set<string>;
  onToggleSelect?: (id: string) => void;
  onLongPress?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function CardsList({
  deckId,
  isSelecting = false,
  selectedIds = new Set(),
  onToggleSelect,
  onLongPress,
  onDelete,
}: CardListProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useGetListCards(deckId, 5);
  const cards = data?.pages.flatMap((page) => page.items) ?? [];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Skeleton for loading state
  if (isLoading && cards.length === 0) {
    return (
      <div className="grid gap-4 ">
        {...Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm hover:shadow-md transition-colors mb-4 flex flex-col min-h-[150px]"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Skeleton className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-3 w-40 mb-3" />
              <Skeleton className="h-2 w-full bg-blue-100 dark:bg-blue-800 rounded-full mt-3 mb-1" />
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {cards.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          No cards found.
        </div>
      ) : (
        cards.map((card, idx) => (
          <Card
            ref={idx === cards.length - 3 ? ref : null}
            card={card}
            deckId={deckId}
            key={card.id}
            isSelecting={isSelecting}
            isSelected={selectedIds.has(card.id)}
            onToggleSelect={onToggleSelect}
            onLongPress={onLongPress}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
