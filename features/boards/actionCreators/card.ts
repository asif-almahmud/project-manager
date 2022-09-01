import { Boards } from "../../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const addNewCard = (
  state: Boards,
  action: PayloadAction<{
    boardId: string;
    columnId: string;
    cardId: string;
    cardTitle: string;
    cardDetails?: string;
  }>
) => {
  let boardId = action.payload.boardId;
  let columnId = action.payload.columnId;
  let cardId = action.payload.cardId;
  let cardTitle = action.payload.cardTitle;
  let cardDetails = action.payload.cardDetails ?? "";
  let newCard = {
    id: cardId,
    title: cardTitle,
    details: cardDetails,
  };
  state.forEach((board) => {
    if (board.id === boardId) {
      board.columns.forEach((column) => {
        if (column.id === columnId) {
          column.cards.push(newCard);
        }
      });
    }
  });
};

const deleteCard = (
  state: Boards,
  action: PayloadAction<{ boardId: string; columnId: string; cardId: string }>
) => {
  let boardId = action.payload.boardId;
  let columnId = action.payload.columnId;
  let cardId = action.payload.cardId;
  return state.map((board) => {
    if (board.id === boardId) {
      return {
        ...board,
        columns: board.columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            };
          } else {
            return column;
          }
        }),
      };
    } else {
      return board;
    }
  });
};

const editCard = (
  state: Boards,
  action: PayloadAction<{
    boardId: string;
    columnId: string;
    cardId: string;
    cardTitle: string;
    cardDetails?: string;
  }>
) => {
  let boardId = action.payload.boardId;
  let columnId = action.payload.columnId;
  let cardId = action.payload.cardId;
  let cardTitle = action.payload.cardTitle;
  let cardDetails = action.payload.cardDetails;
  return state.map((board) => {
    if (board.id === boardId) {
      return {
        ...board,
        columns: board.columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              cards: column.cards.map((card) => {
                if (card.id === cardId) {
                  return { ...card, title: cardTitle, details: cardDetails };
                } else {
                  return card;
                }
              }),
            };
          } else {
            return column;
          }
        }),
      };
    } else {
      return board;
    }
  });
};

export { addNewCard, deleteCard, editCard };
