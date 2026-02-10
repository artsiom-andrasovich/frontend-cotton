import { fsrsService } from "@/services/fsrs.service";
import { TCards } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//TODO:
type FSRSMutationPayload = {
  cards: Omit<TCards, "deckId">[];
  sessionTimeMs: number;
};

export const useFSRSParamsMutation = (deckId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["fsrs-cards", deckId],
    mutationFn: async ({cards, sessionTimeMs}:FSRSMutationPayload): Promise<string> => {
      const res = await fsrsService.updateFSRSCardsParams({
        deckId,
        cards,
        sessionTimeMs,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fsrs-cards", deckId] });
    },
  });
};
