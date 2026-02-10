import { useGetGameCards } from "@/hooks";
import { useFSRSParamsMutation } from "@/hooks/fsrs/use-update-fsrs-cards-params.hook";
import { FlashCardGame } from "@/logic/fsrs";
import { gameStorageService } from "@/services/game-storage.service";
import { useEffect, useState } from "react";
import { Rating } from "ts-fsrs";
import { useStudyTimer } from "./use-study-timer.hook";

export function useGameSession(deckId: string) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [game, setGame] = useState<Awaited<
    ReturnType<typeof FlashCardGame>
  > | null>(null);
  const timer = useStudyTimer();
  const { mutate } = useFSRSParamsMutation(deckId);
  const { data: cards, isLoading: isLoadingCards } = useGetGameCards(deckId);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoadingSession(true);

        const fsrsGame = await FlashCardGame(deckId);
        setGame(fsrsGame as any);

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

  const isLoading = isLoadingCards || isLoadingSession;

  useEffect(() => {
    if (!isLoading) return;
    timer.start();
    return () => {
      timer.pause();
    };
  }, [isLoading]);

  // Validate currentCardIndex bounds (only when NOT in end session)
  const isInvalidIndex =
    !isLoading && cards && !endSession && currentCardIndex >= cards.length;

  if (isInvalidIndex) {
    gameStorageService.deleteSession(deckId);
    setCurrentCardIndex(0);
  }

  const currentCard =
    cards && currentCardIndex < cards.length
      ? cards[currentCardIndex]
      : undefined;

  const handleRate = async (rating: Rating) => {
    if (!currentCard || !currentCard.fsrsCard || !game || !cards) return;

    const newCardWithLog = game.rate(currentCard.fsrsCard, rating);

    const prevSession = await gameStorageService.getSession(deckId);

    const newCardData = {
      cardId: currentCard.id,
      card: newCardWithLog.card,
      log: newCardWithLog.log,
      rate: rating,
    };

    const updatedCards = prevSession?.cards
      ? [...prevSession.cards, newCardData]
      : [newCardData];

    const newCardIndex = currentCardIndex + 1;

    await gameStorageService.saveSession(deckId, newCardIndex, updatedCards, timer.activeTimeMs);

    if (currentCardIndex === cards.length - 1) {
      timer.pause();
      setEndSession(true);

      const dto = updatedCards.map(({ cardId, card, log}) => ({
        cardId,
        card: { ...card, id: cardId },
        log,
      }));

      mutate({cards: dto, sessionTimeMs: timer.activeTimeMs});
      timer.reset();
      return;
    }

    setShowAnswer(false);
    setCurrentCardIndex(newCardIndex);
  };

  const handleRateAgain = async () => {
    await gameStorageService.deleteSession(deckId);
    timer.reset();
    timer.start();
    setEndSession(false);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  return {
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
  };
}
