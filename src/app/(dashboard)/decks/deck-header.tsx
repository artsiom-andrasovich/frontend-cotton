import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function DeckHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Decks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your flashcard collections
        </p>
      </div>
      <Button className="bg-primary hover:bg-primary/90">
        <Plus className="w-4 h-4 mr-2" />
        Create Deck
      </Button>
    </div>
  );
}
