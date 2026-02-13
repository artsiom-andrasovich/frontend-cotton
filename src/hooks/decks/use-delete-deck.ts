import { AppPaths } from "@/constants";
import { deckService } from "@/services/deck.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteDeckMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: deckService.deleteDeck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AppPaths.deck.DECKS] });
      toast.success("Deck deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete deck");
    },
  });

  return { isPending, deleteDeck: mutateAsync };
};
