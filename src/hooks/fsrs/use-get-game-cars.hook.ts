import { fsrsService } from "@/services/fsrs.service";
import { useQuery } from "@tanstack/react-query";

export function useGetGameCards(deckId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fsrs-cards", deckId],
    queryFn: () => fsrsService.getGameCards(deckId),
    enabled: !!deckId,
  });

  return { ...data, isLoading, isError, error };
}
