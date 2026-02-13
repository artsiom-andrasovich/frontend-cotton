import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { MenuItem } from "@/components/shared/menu-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppPaths } from "@/constants";
import { useDeleteDeckMutation } from "@/hooks/decks/use-delete-deck";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeckOptionsProps {
  deckId: string;
}

export function DeckOptions({ deckId }: DeckOptionsProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { deleteDeck, isPending } = useDeleteDeckMutation();
  const router = useRouter();

  const handleDeleteDeck = async () => {
    try {
      await deleteDeck(deckId);
      setIsAlertOpen(false);
      router.push(AppPaths.deck.DECKS);
    } catch (error) {
      // Error is handled in the hook via toast
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="
          w-auto min-w-[8rem] 
          bg-white dark:bg-gray-800 
          border-gray-200 dark:border-gray-700
          [&>*:not(:last-child)]:border-b 
          [&>*:not(:last-child)]:border-gray-100 
          dark:[&>*:not(:last-child)]:border-gray-700
        "
        >
          <MenuItem
            label="Edit"
            icon={Pencil}
            href={`${AppPaths.deck.DECK}?deckId=${deckId}`}
          />
          <MenuItem
            icon={Trash}
            label={"Delete"}
            variant="destructive"
            onClick={() => {
              // Using setTimeout to prevent focus trapping issues when opening a Dialog from a DropdownMenu
              setTimeout(() => setIsAlertOpen(true), 0);
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="Are you absolutely sure?"
        description="This will permanently remove this deck and its cards."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteDeck}
        isPending={isPending}
      />
    </>
  );
}
