import { getBoard } from "./getBoard";

export function getColumns(boardId: string) {
  return getBoard(boardId)?.columns;
}
