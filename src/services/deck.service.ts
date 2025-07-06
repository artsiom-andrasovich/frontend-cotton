import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths, DEFAULT_DECK_PAGE_LIMIT } from "@/constants";
import { DeckFormData } from "@/hooks/use-update-deck.hook";
import { AxiosResponse } from "axios";
import { TListDecks } from "./types";

export const deskService = {
  async getDecks(
    page: number,
    limit: number = DEFAULT_DECK_PAGE_LIMIT,
    filters: string
  ): Promise<AxiosResponse<TListDecks>> {
    const res = await axiosWithAuth.get(
      ApiPaths.deck.LIST_DECKS + `?${filters}`,
      {
        params: {
          page,
          limit,
        },
      }
    );
    return res;
  },
  async createDeck(data: DeckFormData): Promise<AxiosResponse<string>> {
    console.log(data);

    const res = await axiosWithAuth.post(ApiPaths.deck.CREATE_DECK, data);
    return res;
  },
};
