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
      <div className="space-y-3">
        {...Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 block transition-all relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-[100px] overflow-hidden">
                    <Skeleton className="h-4 w-3/4 mb-2 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <hr className="my-2 border-[2px] border-gray-600 dark:border-gray-600" />
                    <Skeleton className="h-4 w-full mb-2 rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-4 items-center">
                      <Skeleton className="h-[22px] w-14 rounded-full" />
                      <Skeleton className="h-3 w-24 rounded" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
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
