import { Boards } from "../../../types/types";
import { current } from "@reduxjs/toolkit";
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
  console.log({ newCard });
  console.log({ state: current(state) });
  state.forEach((board) => {
    console.log({ board: current(board) });
    if (board.id === boardId) {
      console.log({ board: current(board) });
      board.columns.forEach((column) => {
        console.log({ column });
        if (column.id === columnId) {
          console.log({ newCard });
          column.cards.push(newCard);
        }
        console.log({ column });
      });
    }
  });
  // for(let board of state){
  //   console.log({ board: current(board) });
  //   if(board.id)
  // }
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
