import { cardService } from "@/services/card.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCardsMutation = (deckId: string) => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (deleteCardsId: string[]) =>
      cardService.deleteCards({ deckId, deleteCardsId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", deckId] });
      toast.success("Cards deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete cards");
    },
  });

  return { isPending, deleteCards: mutateAsync };
};
