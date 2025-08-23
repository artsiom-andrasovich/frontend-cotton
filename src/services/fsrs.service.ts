import { axiosWithAuth } from "@/api/interceptors";
import { ApiPaths } from "@/constants";

type TParams = {
  w: number[];
  cardsPerSession: number;
  isShortTerm: boolean;
};

export const fsrsService = {
  async getGameParams(deckId: string) {
    const res = await axiosWithAuth.get<TParams>(
      ApiPaths.fsrs.GAME_PARAMS(deckId)
    );
    return res;
  },
};
