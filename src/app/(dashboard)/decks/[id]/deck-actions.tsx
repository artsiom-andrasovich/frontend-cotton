import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { gameStorageService } from "@/services/game-storage.service";
import { Play, Plus } from "lucide-react";
import Link from "next/link";

interface DeckActionsProps {
  deckId: string;
  cardCount: number;
}

export const DeckActions = ({ deckId, cardCount }: DeckActionsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        asChild
        variant="outline"
        className={
          cardCount > 0
            ? "h-16 flex flex-col items-center justify-center space-y-1"
            : "col-span-2 h-16 flex flex-col items-center justify-center space-y-1"
        }
      >
        <Link href={AppPaths.card.CARD(deckId)}>
          <Plus className="w-5 h-5" />
          <span className="text-sm">Add Cards</span>
        </Link>
      </Button>
      {cardCount > 0 && (
        <Button
          asChild
          className="h-16 flex flex-col items-center justify-center space-y-1 bg-primary hover:bg-primary/90"
          onClick={async () => await gameStorageService.deleteSession(deckId)}
        >
          <Link href={AppPaths.game.GAME(deckId)}>
            <Play className="w-5 h-5" />
            <span className="text-sm">Study Now</span>
          </Link>
        </Button>
      )}
    </div>
  );
};
