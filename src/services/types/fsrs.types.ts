import { Card, ReviewLog } from "ts-fsrs";

export type TUpdateFSRSParams = {
  deckId: string;
  cards: TCards[];
};

export type TCards = {
  card: TFSRSCard;
  log: ReviewLog;
};

type TFSRSCard = Card & {
  id: string;
};
