import { Card, ReviewLog } from "ts-fsrs";

export type TUpdateFSRSParams = {
  deckId: string;
  cards: TCards[];
  sessionTimeMs: number;
};

export type TCards = {
  card: TFSRSCard;
  log: ReviewLog;
};

type TFSRSCard = Card & {
  id: string;
};
