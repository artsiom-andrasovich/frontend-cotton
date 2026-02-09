import { fsrsService } from "@/services/fsrs.service";
import { TCards } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//TODO:

export const useFSRSParamsMutation = (deckId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["fsrs-cards", deckId],
    mutationFn: async (data: Omit<TCards[], "deckId">): Promise<string> => {
      const res = await fsrsService.updateFSRSCardsParams({
        deckId,
        cards: data,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fsrs-cards", deckId] });
    },
  });
};
