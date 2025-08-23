import { cardService } from "@/services/card.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCardById(deckId: string, cardId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["deck", deckId, cardId],
    queryFn: () => cardService.getCardById(deckId, cardId),
    enabled: !!deckId || !!cardId,
  });

  return { ...data, isLoading, isError, error };
}
