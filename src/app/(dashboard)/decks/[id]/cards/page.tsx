"use client";

import { Navbar } from "@/components/shared";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui";
import { AppPaths } from "@/constants";
import { useDeleteCardsMutation } from "@/hooks/cards/use-delete-cards.hook";
import { Trash, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CardsFilter } from "./cards-filter";
import { CardsList } from "./cards-list";
import { useSelectCards } from "./use-select-cards.hook";

export default function DeckCardsPage() {
  const params = useParams();
  const deckId = params.id as string;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const {
    selectedIds,
    isSelecting,
    enterSelectionMode,
    toggleSelect,
    clearSelection,
  } = useSelectCards();

  const { deleteCards, isPending: isDeleting } = useDeleteCardsMutation(deckId);

  const handleSearchFocusChange = (isFocused: boolean) => {
    if (isFocused) {
      setIsSearchFocused(true);
    } else {
      setTimeout(() => {
        setIsSearchFocused(false);
      }, 300);
    }
  };

  const handleDeleteSingle = (cardId: string) => {
    setPendingDeleteId(cardId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = pendingDeleteId
        ? [pendingDeleteId]
        : Array.from(selectedIds);
      await deleteCards(idsToDelete);
      clearSelection();
      setPendingDeleteId(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  const deleteCount = pendingDeleteId ? 1 : selectedIds.size;

  return (
    <>
      <Navbar
        path={isSelecting ? undefined : `${AppPaths.deck.DECKS}/${deckId}`}
        title={
          isSelecting ? (
            <span className="text-primary">{selectedIds.size} selected</span>
          ) : isSearchFocused ? (
            <span className="hidden sm:inline">All cards</span>
          ) : (
            "All cards"
          )
        }
      >
        {isSelecting ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setPendingDeleteId(null);
                setIsDeleteDialogOpen(true);
              }}
              disabled={selectedIds.size === 0}
              className="flex items-center gap-1.5"
            >
              <Trash className="w-4 h-4" />
              Delete ({selectedIds.size})
            </Button>
          </div>
        ) : (
          <CardsFilter onSearchFocusChange={handleSearchFocusChange} />
        )}
      </Navbar>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <CardsList
          deckId={deckId}
          isSelecting={isSelecting}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onLongPress={enterSelectionMode}
          onDelete={handleDeleteSingle}
        />
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open);
          if (!open) setPendingDeleteId(null);
        }}
        title="Delete card?"
        description={`This will permanently delete ${deleteCount} card${deleteCount !== 1 ? "s" : ""}. This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isPending={isDeleting}
      />
    </>
  );
}
