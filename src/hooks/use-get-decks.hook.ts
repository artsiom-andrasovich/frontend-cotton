import { DEFAULT_DECK_PAGE_LIMIT } from "@/constants";
import { deskService } from "@/services/deck.service";
import type { TListDecks } from "@/services/types";
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import qs from "qs";

export function useGetDecks(pageSize: number = DEFAULT_DECK_PAGE_LIMIT) {
  const searchParams = useSearchParams();

  const filters = qs.stringify(Object.fromEntries(searchParams.entries()), {
    arrayFormat: "comma",
  });

  return useInfiniteQuery<TListDecks, Error>({
    queryKey: ["user-decks", pageSize, filters],
    queryFn: ({ pageParam }: QueryFunctionContext) =>
      deskService
        .getDecks(pageParam as number, pageSize, filters)
        .then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
