import { useGetGameCards } from "@/hooks";
import {
	GameSessionCard,
	gameStorageService,
} from "@/services/game-storage.service";
import { useEffect, useMemo, useState } from "react";
import { Card as FsrsCard, Rating } from "ts-fsrs";

export type TStatsData = {
  totalCards: number;
  ratingDistribution: {
    again: number;
    hard: number;
    good: number;
    easy: number;
  };
  learningProgress: number;
};

export type GroupedByRating = {
  again: (FsrsCard & { cardId: string })[];
  hard: (FsrsCard & { cardId: string })[];
  good: (FsrsCard & { cardId: string })[];
  easy: (FsrsCard & { cardId: string })[];
};

export function useSessionStats(deckId: string) {
  const [sessionCards, setSessionCards] = useState<GameSessionCard[] | null>(
    null
  );
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const { data: cards, isLoading: isLoadingCards } = useGetGameCards(deckId);

  const cardsById = useMemo(() => {
    if (!cards) return {} as Record<string, any>;
    return Object.fromEntries(cards.map((card) => [card.id, card])) as Record<
      string,
      any
    >;
  }, [cards]);

  useEffect(() => {
    const loadSession = async () => {
      try {
        setIsLoadingSession(true);
        const session = await gameStorageService.getSession(deckId);
        if (session) {
          setSessionCards(session.cards);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      } finally {
        setIsLoadingSession(false);
      }
    };
    loadSession();
  }, [deckId]);

  const groupedByRating = useMemo<GroupedByRating>(() => {
    if (!sessionCards || sessionCards.length === 0) {
      return { again: [], hard: [], good: [], easy: [] };
    }

    return sessionCards.reduce<GroupedByRating>(
      (acc, item) => {
        const cardWithId = { ...item.card, cardId: item.cardId } as FsrsCard & {
          cardId: string;
        };
        switch (item.rate as Rating) {
          case Rating.Again:
            acc.again.push(cardWithId);
            break;
          case Rating.Hard:
            acc.hard.push(cardWithId);
            break;
          case Rating.Good:
            acc.good.push(cardWithId);
            break;
          case Rating.Easy:
            acc.easy.push(cardWithId);
            break;
        }
        return acc;
      },
      { again: [], hard: [], good: [], easy: [] }
    );
  }, [sessionCards]);

  const stats = useMemo<TStatsData>(() => {
    if (!sessionCards || sessionCards.length === 0) {
      return {
        totalCards: 0,
        ratingDistribution: { again: 0, hard: 0, good: 0, easy: 0 },
        learningProgress: 0,
      };
    }

    const ratingCounts = sessionCards.reduce(
      (acc, item) => {
        switch (item.rate as Rating) {
          case Rating.Again:
            acc.again++;
            break;
          case Rating.Hard:
            acc.hard++;
            break;
          case Rating.Good:
            acc.good++;
            break;
          case Rating.Easy:
            acc.easy++;
            break;
        }
        return acc;
      },
      { again: 0, hard: 0, good: 0, easy: 0 }
    );

    const progressScore = sessionCards.reduce((score, item) => {
      switch (item.rate as Rating) {
        case Rating.Again:
          return score + 0;
        case Rating.Hard:
          return score + 0.3;
        case Rating.Good:
          return score + 0.7;
        case Rating.Easy:
          return score + 1;
        default:
          return score;
      }
    }, 0);

    return {
      totalCards: sessionCards.length,
      ratingDistribution: ratingCounts,
      learningProgress: (progressScore / sessionCards.length) * 100,
    };
  }, [sessionCards]);

  return {
    stats,
    groupedByRating,
    cardsById,
    sessionCards,
    isLoading: isLoadingCards || isLoadingSession,
  };
}
