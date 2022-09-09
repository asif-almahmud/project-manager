import { store } from "../app/store";
import { Cards, Columns, IBoard, IColumn, ICard } from "../types/types";

export const getDataById = (
  boardId: string,
  columnId?: string,
  cardId?: string
) => {
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

  function getColumn(boardId: string, columnId?: string) {
    if (columnId) {
      for (let column of getColumns(boardId)) {
        if (column.id === columnId) {
          return column;
        }
      }
    }

    return {} as IColumn;
  }

  function getCards(boardId: string, columnId?: string) {
    if (columnId) {
      return getColumn(boardId, columnId)?.cards;
    }
    return [] as Cards;
  }

  function getCard(boardId: string, columnId?: string, cardId?: string) {
    if (boardId && columnId) {
      for (let card of getCards(boardId, columnId)) {
        if (card.id === cardId) {
          return card;
        }
      }
    }

    return {} as ICard;
  }

  return {
    board: getBoard(boardId),
    columns: getColumns(boardId),
    column: getColumn(boardId, columnId),
    cards: getCards(boardId, columnId),
    card: getCard(boardId, columnId, cardId),
  };
};
