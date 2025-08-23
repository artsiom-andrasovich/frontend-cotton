import { deckService } from "@/services/deck.service";
import { useQuery } from "@tanstack/react-query";

export function useGetDeckById(deckId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["deck", deckId],
    queryFn: () => deckService.getDeckById(deckId),
    enabled: !!deckId,
  });

  return { ...data, isLoading, isError, error };
}
