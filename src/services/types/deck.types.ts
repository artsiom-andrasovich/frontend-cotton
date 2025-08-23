import { ALLOWED_COLORS, ALLOWED_ICONS } from "@/constants";
import { z } from "zod";
import { type TCategory } from ".";

export type TDeck = {
  id: string;
  name: string;
  description: string | null;
  category: TCategory;
  mastery: number;
  cardCount: number;
  lastStudied: string;
  totalTime: string;
  createdAt: string;
};

export type TDeckCursor = {
  fieldValue: string | number;
  id: string;
};

export type TListDecks = {
  items: TDeck[];
  nextCursor: TDeckCursor | null;
  hasNextPage: boolean;
};

export const UpdateDeckSchema = z.object({
  name: z.string().min(1, "Name is required").max(20),
  description: z.string().max(150).optional(),
  category: z.string().min(1, "Category is required").max(20),
  color: z.enum(ALLOWED_COLORS),
  icon: z.enum(ALLOWED_ICONS),
});

export type TUpdateDeck = z.infer<typeof UpdateDeckSchema>;

export type TUpdateDeckDto = {
  deckId: string;
  description?: string;
  category: TCategory;
};
