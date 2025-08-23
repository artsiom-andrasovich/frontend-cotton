"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDecks } from "@/hooks";
import { BookOpen, Plus } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { DeckCard } from "./deck-card";

export function DecksList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetDecks();

  const decks = data?.pages.flatMap((page) => page.items) ?? [];

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
  if (isLoading && decks.length === 0) {
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
    <div className="grid gap-4">
      {decks.map((deck, idx) => (
        <DeckCard
          deck={deck}
          key={deck.id}
          ref={idx === decks.length - 3 ? ref : null}
        />
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center">
          <span className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {decks?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No decks found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first deck to start learning
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Deck
          </Button>
        </div>
      )}
    </div>
  );
}
