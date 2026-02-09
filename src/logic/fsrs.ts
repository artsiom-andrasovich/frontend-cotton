import { errorCatch } from "@/api/error";
import { fsrsService } from "@/services/fsrs.service";
import { Card, FSRS, Grade, Rating } from "ts-fsrs";

type FSRSParams = ConstructorParameters<typeof FSRS>[0];

export async function FlashCardGame(deckId: string) {
  try {
    const { data } = await fsrsService.getGameParams(deckId);

    const game = new FSRSCardGame(
      { w: data.w, enable_short_term: data.isShortTerm },
      data.cardsPerSession
    );
    return game;
  } catch (error) {
    console.error(errorCatch(error));
    return null;
  }
}

export class FSRSCardGame {
  private fsrs: FSRS;
  public cardsPerSession: number;

  constructor(params: Partial<FSRSParams>, cardsPerSession: number) {
    this.cardsPerSession = cardsPerSession;
    this.fsrs = new FSRS({ ...params, enable_fuzz: true });
  }

  rate(card: Card, rating: Rating) {
    const newCardWithLog = this.fsrs.next(
      card,
      new Date(),
      rating as unknown as Grade
    );
    //request to set new data
    return newCardWithLog;
  }

  //TODO:
  // toggleShortTerm(enabled: boolean) {
  //   //post request to change it on the server
  //   this.FSRSParams.enable_short_term = enabled;
  //   this.fsrs = new FSRS({ ...this.FSRSParams, enable_fuzz: true });
  // }
}
