"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppPaths } from "@/constants";
import { useGetDecks } from "@/hooks";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { DeckCard } from "./deck-card";

type DecksListProps = {
  showEmptyState?: boolean;
};

export function DecksList({ showEmptyState = true }: DecksListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetDecks();

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

  const isRefetching = isFetching && !isFetchingNextPage && !isLoading;

  return (
    <div
      className={`grid gap-4 transition-all duration-300 ${isRefetching ? "opacity-60 pointer-events-none grayscale-[0.5]" : ""}`}
    >
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
      {decks?.length === 0 && showEmptyState && <EmptyDecksState />}
    </div>
  );
}

export function EmptyDecksState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Decorative background */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-2xl opacity-60" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-blue-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2 text-center">
        Start Your Learning Journey
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-sm mb-6">
        Create your first deck to organize flashcards and boost your memory with
        spaced repetition
      </p>

      <Link href={AppPaths.deck.DECK}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Your First Deck
        </Button>
      </Link>

      {/* Tips section */}
      <div className="mt-10 grid gap-3 w-full max-w-md">
        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
              1
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Create a deck
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Organize your cards by topic or subject
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-bold">
              2
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Add flashcards
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Write questions and answers to study
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-teal-600 dark:text-teal-400 text-sm font-bold">
              3
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Study & master
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Use spaced repetition to remember forever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
