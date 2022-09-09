import { getColumn } from "./getColumn";

export function getCards(boardId: string, columnId: string) {
  return getColumn(boardId, columnId)?.cards;
}
