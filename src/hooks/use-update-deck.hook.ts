import { deskService } from "@/services/deck.service";
import { TCategory } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type DeckFormData = {
  name: string;
  category: TCategory;
  description?: string;
};

type Deck = DeckFormData & { id: string };

type MutationInput = {
  data: DeckFormData;
  deckId?: string; // if present — update
};

export const useDeckMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, deckId }: MutationInput): Promise<string> => {
      if (deckId) {
        const res = await axios.post("/api/decks", data);

        return res.data;
      } else {
        const res = await deskService.createDeck(data);
        console.log(res);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-decks"] });
    },
  });
};
