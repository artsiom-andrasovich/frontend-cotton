import { DEFAULT_DECK_PAGE_LIMIT } from "@/constants";
import { deckService } from "@/services/deck.service";
import type { TDeckCursor, TListDecks } from "@/services/types";
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import qs from "qs";

export function useGetDecks(limit: number = DEFAULT_DECK_PAGE_LIMIT) {
  const searchParams = useSearchParams();

  const filters = qs.stringify(Object.fromEntries(searchParams.entries()), {
    arrayFormat: "comma",
  });

  return useInfiniteQuery<TListDecks, Error>({
    queryKey: ["user-decks", limit, filters],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      return deckService
        .getDecks(limit, pageParam as TDeckCursor | null, filters)
        .then((res) => res);
    },
    initialPageParam: null, // нет курсора для первой загрузки
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
  });
}
