import { deckService } from "@/services/deck.service";
import { TCategory } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DeckFormData = {
  name: string;
  category: TCategory;
  description?: string;
};

type MutationInput = {
  data: DeckFormData;
  deckId?: string; // if present — update
};

export const useDeckMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user-decks"],
    mutationFn: async ({ data, deckId }: MutationInput): Promise<string> => {
      if (deckId) {
        const res = await deckService.updateDeck({ deckId, ...data });

        return res.data;
      } else {
        const res = await deckService.createDeck(data);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-decks"] });
    },
  });
};
