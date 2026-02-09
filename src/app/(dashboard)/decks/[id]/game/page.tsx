"use client";

import { Navbar } from "@/components/shared";

import { useGetGameCards } from "@/hooks";
import { useFSRSParamsMutation } from "@/hooks/fsrs/use-update-fsrs-cards-params.hook";
import { FlashCardGame } from "@/logic/fsrs";
import { gameStorageService } from "@/services/game-storage.service";
import { use, useEffect, useState } from "react";
import { Rating } from "ts-fsrs";
import { Stats } from "./(stats)/stats";
import { FlashCardsSection } from "./flash-cards-section";
import { ReactButtons } from "./react-buttons";
export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: deckId } = use(params);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [game, setGame] = useState<Awaited<
    ReturnType<typeof FlashCardGame>
  > | null>(null);
  const { mutate } = useFSRSParamsMutation(deckId);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoadingSession(true);
        
        // Initialize FSRS game
        const fsrsGame = await FlashCardGame(deckId);
        setGame(fsrsGame as any);
        
        // Load session from IndexedDB
        const session = await gameStorageService.getSession(deckId);
        if (session && session.currentCardIndex !== undefined) {
          setCurrentCardIndex(session.currentCardIndex);
        }
      } catch (error) {
        console.error("Error of initialization FSRS:", error);
      } finally {
        setIsLoadingSession(false);
      }
    };
    init();
  }, [deckId]);
  const { data: cards, isLoading } = useGetGameCards(deckId);
  
  if (isLoading || isLoadingSession) return <div>loading</div>;
  if (!cards || cards.length === 0) return <div>No cards available in this deck</div>;
  if (!game) return <div>Error loading game</div>;
  
  // Check if session ended BEFORE bounds validation
  // (when last card is rated, index equals cards.length which is valid for end session)
  if (endSession) {
    const handleRateAgain = async () => {
      // Reset the session and start over
      await gameStorageService.deleteSession(deckId);
      setEndSession(false);
      setCurrentCardIndex(0);
      setShowAnswer(false);
    };

    return (
      <div className="h-dvh flex flex-col">
        <Stats deckId={deckId} onRateAgain={handleRateAgain} />
      </div>
    );
  }
  
  // Validate currentCardIndex bounds (only when NOT in end session)
  if (currentCardIndex >= cards.length) {
    console.error(`Invalid card index: ${currentCardIndex} >= ${cards.length}`);
    gameStorageService.deleteSession(deckId); // Clear corrupted session
    setCurrentCardIndex(0); // Reset to start
    return <div>Session error. Restarting...</div>;
  }
  
  const currentCard = cards[currentCardIndex];
  
  // Safety check for currentCard
  if (!currentCard) {
    console.error(`Card at index ${currentCardIndex} is undefined`);
    return <div>Error loading card</div>;
  }

  const handleRate = async (rating: Rating) => {
    // Double-check card exists before rating
    if (!currentCard || !currentCard.fsrsCard) {
      console.error("Cannot rate: currentCard or fsrsCard is undefined");
      return;
    }
    
    const newCardWithLog = game.rate(currentCard.fsrsCard, rating);

    // Get previous session data from IndexedDB
    const prevSession = await gameStorageService.getSession(deckId);

    // Build new card data
    const newCardData = {
      cardId: currentCard.id,
      card: newCardWithLog.card,
      log: newCardWithLog.log,
      rate: rating,
    };

    // Prepare updated cards array
    const updatedCards = prevSession?.cards
      ? [...prevSession.cards, newCardData]
      : [newCardData];

    const newCardIndex = currentCardIndex + 1;

    // Save to IndexedDB
    await gameStorageService.saveSession(deckId, newCardIndex, updatedCards);

    // Check if this is the last card
    if (currentCardIndex === cards.length - 1) {
      setEndSession(true);

      // Prepare DTO for server update
      const dto = updatedCards.map(({ cardId, card, log }) => ({
        cardId,
        card: {
          ...card,
          id: cardId,
        },
        log,
      }));
      
      mutate(dto);

      return;
    }
    
    setShowAnswer(false);
    setCurrentCardIndex(newCardIndex);
  };

  return (
    <div className="h-dvh flex flex-col">
      <Navbar title="Study Session"></Navbar>

      <FlashCardsSection card={currentCard} showAnswer={showAnswer} />

      {/* Fixed Bottom Buttons */}
      <ReactButtons
        handleRating={handleRate}
        setShowAnswer={setShowAnswer}
        showAnswer={showAnswer}
      />
    </div>
  );
}
