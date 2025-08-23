import { DEFAULT_CARD_PAGE_LIMIT } from "@/constants";
import { cardService } from "@/services/card.service";
import type { TCardCursor, TListCards } from "@/services/types";
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import qs from "qs";
//TODO: LAZY IMPORT
export function useGetListCards(
  deckId: string,
  limit: number = DEFAULT_CARD_PAGE_LIMIT
) {
  const searchParams = useSearchParams();

  const filters = qs.stringify(Object.fromEntries(searchParams.entries()), {
    arrayFormat: "comma",
  });
  console.log(filters);

  return useInfiniteQuery<TListCards, Error>({
    queryKey: ["cards", deckId, limit, filters],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      return cardService.listCards(
        deckId,
        limit,
        pageParam as TCardCursor | null,
        filters
      );
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
  });
}
