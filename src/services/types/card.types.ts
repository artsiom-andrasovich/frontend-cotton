import { Card } from "ts-fsrs";
import { z } from "zod";

export const createCardSchema = z.object({
  question: z
    .string()
    .min(1, "Question is required")
    .max(200, "Question must be less that 200 characters"),
  answer: z
    .string()
    .min(1, "Answer is required")
    .max(200, "Answer must be less that 200 characters"),
});

export type TUpdateCardDto = {
  deckId: string;
  cardId: string;
  answer: string;
  question: string;
};

export type TCreateCardDto = {
  answer: string;
  question: string;
  deckId: string;
  fsrsCard: Card;
};

export type TCardCursor = {
  fieldValue: string | number | Date;
  id: string;
};
export type TListCards = {
  items: TCard[];
  nextCursor: TCardCursor | null;
  hasNextPage: boolean;
};

export type TCard = {
  id: string;
  answer: string;
  question: string;
  deckId: string;
  fsrsCard: Card;
  last_review_display: string;
};
