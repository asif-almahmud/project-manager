import { store } from "../app/store";
import { IBoard } from "../types/types";

export function getBoard(boardId: string) {
  for (let board of store.getState().boards) {
    if (board.id === boardId) {
      return board;
    }
  }
}
