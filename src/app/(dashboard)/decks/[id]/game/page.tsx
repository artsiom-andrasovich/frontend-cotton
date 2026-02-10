"use client";

import { Navbar } from "@/components/shared";
import { useGameSession } from "@/hooks/game/use-game-session.hook";
import { use } from "react";
import { Stats } from "./(stats)/stats";
import { FlashCardsSection } from "./flash-cards-section";
import { ReactButtons } from "./react-buttons";

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: deckId } = use(params);
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

  if (isLoading) return <div>loading</div>;
  if (!cards || cards.length === 0)
    return <div>No cards available in this deck</div>;
  if (!game) return <div>Error loading game</div>;

  if (endSession) {
    return (
      <div className="h-dvh flex flex-col">
        <Stats deckId={deckId} onRateAgain={handleRateAgain} />
      </div>
    );
  }

  if (isInvalidIndex) return <div>Session error. Restarting...</div>;
  if (!currentCard) return <div>Error loading card</div>;

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
