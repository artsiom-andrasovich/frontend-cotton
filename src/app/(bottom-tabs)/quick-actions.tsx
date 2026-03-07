import { Button } from "@/components/ui";
import { AppPaths } from "@/constants";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <Link href={AppPaths.deck.DECK}>
          <Button className="w-full h-16 flex flex-col items-center justify-center space-y-1 bg-primary hover:bg-primary/90">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create Deck</span>
          </Button>
        </Link>

        <Link href={AppPaths.deck.DECKS}>
          <Button
            variant="outline"
            className="w-full h-16 flex flex-col items-center justify-center space-y-1"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">Study Now</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
