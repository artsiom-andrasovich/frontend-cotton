"use client";

import { Button } from "@/components/ui/button";
import { AppPaths } from "@/constants";
import { gameStorageService } from "@/services/game-storage.service";
import { ClipboardList, RotateCcw } from "lucide-react";
import Link from "next/link";

type StatsActionsProps = {
  deckId: string;
  onRateAgain?: () => void;
};

export function StatsActions({ deckId, onRateAgain }: StatsActionsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 pb-6 rounded-t-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
        What would you like to do next?
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/**TODO it normaly */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => onRateAgain && onRateAgain()}
          className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 h-16 text-lg font-semibold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Study Again
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-16 text-lg font-semibold"
          onClick={async () => await gameStorageService.deleteSession(deckId)}
        >
          <Link href={AppPaths.deck.DECKS + `/${deckId}`}>
            <ClipboardList className="w-5 h-5 mr-2" />
            Go to deck
          </Link>
        </Button>
      </div>
    </div>
  );
}
