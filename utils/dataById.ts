import { store } from "../app/store";
import { Cards, Columns, IBoard, IColumn, ICard } from "../types/types";

function getBoard(boardId: string) {
  for (let board of store.getState().boards) {
    if (board.id === boardId) {
      return board;
    }
  }
  return {} as IBoard;
}

function getColumns(boardId: string) {
  return getBoard(boardId).columns;
}

function getColumn(boardId: string, columnId: string) {
  for (let column of getColumns(boardId)) {
    if (column.id === columnId) {
      return column;
    }
  }

  return {} as IColumn;
}

function getCards(boardId: string, columnId: string) {
  return getColumn(boardId, columnId).cards;
}

function getCard(boardId: string, columnId: string, cardId: string) {
  for (let card of getCards(boardId, columnId)) {
    if (card.id === cardId) {
      return card;
    }
  }

  return {} as ICard;
}

export { getBoard, getColumns, getColumn, getCards, getCard };
