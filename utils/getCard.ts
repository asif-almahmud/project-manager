import { Cards } from "../types/types";
import { getCards } from "./getCards";

export function getCard(boardId: string, columnId: string, cardId: string) {
  for (let card of getCards(boardId, columnId) as Cards) {
    if (card.id === cardId) {
      return card;
    }
  }
}
