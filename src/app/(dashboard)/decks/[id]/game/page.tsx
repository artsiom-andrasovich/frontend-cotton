"use client";

import { Navbar } from "@/components/shared";
import { useGameSession } from "@/hooks/game/use-game-session.hook";
import { AlertCircle, Loader2, ServerCrash } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import toast from "react-hot-toast";
import { Stats } from "./(stats)/stats";
import { FlashCardsSection } from "./flash-cards-section";
import { ReactButtons } from "./react-buttons";

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: deckId } = use(params);
  const router = useRouter();
  const {
    currentCard,
    cards,
    showAnswer,
    setShowAnswer,
    endSession,
    isLoading,
    isInvalidIndex,
    game,
    handleRate,
    handleRateAgain,
  } = useGameSession(deckId);

  useEffect(() => {
    if (!isLoading && (!cards || cards.length === 0)) {
      toast.error("This deck has no cards to study");
      router.push(`/decks/${deckId}`);
    }
  }, [cards, deckId, isLoading, router]);

  if (isLoading) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading session...</p>
      </div>
    );
  }

  if (!cards || cards.length === 0) return null; // Prevent flash before redirect

  if (!game) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center p-4 text-center">
        <ServerCrash className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Failed to load game
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We couldn't initialize your study session. Please try again.
        </p>
      </div>
    );
  }

  // const {activeTimeMs, isRunning, start, pause, reset} = useStudyTimer()

  if (endSession) {
    return (
      <div className="h-dvh flex flex-col">
        <Stats deckId={deckId} onRateAgain={handleRateAgain} />
      </div>
    );
  }

  if (isInvalidIndex) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center p-4 text-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Syncing session data. Restarting...
        </p>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Card Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          There was an issue loading this flashcard.
        </p>
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col">
      <Navbar title="Study Session"></Navbar>

      <FlashCardsSection card={currentCard} showAnswer={showAnswer} />

      <ReactButtons
        handleRating={handleRate}
        setShowAnswer={setShowAnswer}
        showAnswer={showAnswer}
      />
    </div>
  );
}
