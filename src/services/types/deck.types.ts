export type TDeck = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  mastery: number;
  cardCount: number;
  lastStudied: string;
  totalTime: string;
  createdAt: Date;
};

export type TListDecks = {
  items: TDeck[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
};
