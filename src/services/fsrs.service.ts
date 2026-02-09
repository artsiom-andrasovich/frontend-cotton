import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";
import { AxiosResponse } from "axios";
import { Card } from "ts-fsrs";
import { TUpdateFSRSParams } from "./types";

type TParams = {
  w: number[];
  cardsPerSession: number;
  isShortTerm: boolean;
};

type TCard = {
  id: string;
  answer: string;
  question: string;
  deckId: string;
  fsrsCard: Card & { id: string };
  last_review_display: string;
};

export const fsrsService = {
  async getGameParams(deckId: string) {
    const res = await axiosWithAuth.get<TParams>(
      ApiPaths.fsrs.GAME_PARAMS(deckId)
    );
    return res;
  },

  async getGameCards(
    deckId: string
  ): Promise<AxiosResponse<Omit<TCard, "last_review_display">[]>> {
    const res = await axiosWithAuth.get(ApiPaths.fsrs.GAME_CARDS(deckId));

    return res;
  },

  async updateFSRSCardsParams(dto: TUpdateFSRSParams) {
    const res = await axiosWithAuth.patch(
      ApiPaths.fsrs.UPDATE_FSRS_CARDS_PARAMS,
      dto
    );
    return res;
  },
};
