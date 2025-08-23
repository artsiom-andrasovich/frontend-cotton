import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { DeckFormData } from "@/hooks/decks/use-update-deck.hook";
import { AxiosResponse } from "axios";
import { TDeck, TDeckCursor, TListDecks, TUpdateDeckDto } from "./types";

export const deckService = {
  async getDecks(
    limit: number,
    cursor?: TDeckCursor | null,
    filters?: string
  ): Promise<TListDecks> {
    const params: Record<string, any> = {
      limit,
    };

    if (cursor) {
      params.cursor = JSON.stringify(cursor);
    }
    const res = await axiosWithAuth.get(ApiPaths.deck.LIST_DECKS, {
      params,
      paramsSerializer: (params) => {
        const query = new URLSearchParams();

        for (const key in params) {
          if (params[key] !== undefined && params[key] !== null) {
            query.append(key, params[key]);
          }
        }
        if (filters) {
          // Parse the filters string and add each filter parameter
          const filterParams = new URLSearchParams(filters);
          for (const [key, value] of filterParams.entries()) {
            query.append(key, value);
          }
        }

        return query.toString();
      },
    });

    return res.data;
  },
  async getDeckById(deckId: string): Promise<AxiosResponse<TDeck>> {
    const res = await axiosWithAuth.get(
      ApiPaths.deck.GET_DECK_BY_ID + `/${deckId}`
    );
    return res;
  },
  async createDeck(data: DeckFormData): Promise<AxiosResponse<string>> {
    const res = await axiosWithAuth.post(ApiPaths.deck.CREATE_DECK, data);
    return res;
  },
  async updateDeck(dto: TUpdateDeckDto) {
    const res = await axiosWithAuth.patch(ApiPaths.deck.UPDATE_DECK, dto);
    return res;
  },
};
