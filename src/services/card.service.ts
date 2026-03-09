import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { TCard, TCardCursor, TCreateCardDto, TUpdateCardDto } from "./types";

export const cardService = {
  async createCard(dto: TCreateCardDto) {
    const res = await axiosWithAuth.post(ApiPaths.cards.CREATE_CARD, dto);
    return res;
  },

  async updateCard(dto: TUpdateCardDto) {
    const res = await axiosWithAuth.patch(ApiPaths.cards.UPDATE_CARD, dto);
    return res;
  },

  async getCardById(
    deckId: string,
    cardId: string,
  ): Promise<AxiosResponse<Partial<TCard>>> {
    const res = await axiosWithAuth.get(ApiPaths.cards.GET_CARD_BY_ID, {
      params: {
        deckId,
        cardId,
      },
    });
    return res;
  },

  async listCards(
    deckId: string,
    limit: number,
    cursor?: TCardCursor | null,
    filters?: string,
  ) {
    const params: Record<string, any> = { limit };
    if (cursor) {
      params.cursor = JSON.stringify(cursor);
    }

    const res = await axiosWithAuth.get(
      `${ApiPaths.cards.LIST_CARDS}/${deckId}`,
      {
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
      },
    );

    return res.data;
  },

  async deleteCards(dto: { deckId: string; deleteCardsId: string[] }) {
    const res = await axiosWithAuth.delete(ApiPaths.cards.DELETE_CARDS, {
      data: dto,
    });
    return res;
  },
};
