import { cardService } from "@/services/card.service";
import { TCreateCardDto, TUpdateCardDto } from "@/services/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCardMutate = (deckId: string, cardId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, TCreateCardDto | TUpdateCardDto>({
    mutationKey: ["cards", deckId],
    mutationFn: async (dto: TCreateCardDto | TUpdateCardDto) => {
      if (cardId) {
        const res = await cardService.updateCard(dto as TUpdateCardDto);
        return res;
      } else {
        const res = await cardService.createCard(dto as TCreateCardDto);
        return res;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", deckId] });
    },
    onError: (error: Error) => {
      console.error("Error creating card:", error.message);
    },
  });
};
