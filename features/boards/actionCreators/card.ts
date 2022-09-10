import { Boards, Cards, Columns } from "../../../types/types";
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

const onCardDragAndDropInSameColumn = (
  state: Boards,
  action: PayloadAction<{
    boardId: string;
    columnId: string;
    cards: Cards;
  }>
) => {
  const boardId = action.payload.boardId;
  const columnId = action.payload.columnId;
  const cards = action.payload.cards;

  for (let board of state) {
    if (board.id === boardId) {
      for (let column of board.columns) {
        if (column.id === columnId) {
          for (let card of cards) {
            column.cards.shift();
            column.cards.push(card);
          }
        }
      }
    }
  }
};

const onCardDragAndDropIntoDifferentColumns = (
  state: Boards,
  action: PayloadAction<{
    boardId: string;
    sColumnId: string;
    dColumnId: string;
    sCards: Cards;
    dCards: Cards;
  }>
) => {
  const boardId = action.payload.boardId;
  const sColumnId = action.payload.sColumnId;
  const dColumnId = action.payload.dColumnId;
  const sCards = action.payload.sCards;
  const dCards = action.payload.dCards;

  for (let board of state) {
    if (board.id === boardId) {
      for (let column of board.columns) {
        if (column.id === sColumnId) {
          let length = column.cards.length;
          for (let i = 0; i < length; i++) {
            column.cards.shift();
          }

          for (let card of sCards) {
            column.cards.push(card);
          }
        }

        if (column.id === dColumnId) {
          let length = column.cards.length;
          for (let i = 0; i < length; i++) {
            column.cards.shift();
          }
          for (let card of dCards) {
            column.cards.push(card);
          }
        }
      }
    }
  }
};

export {
  addNewCard,
  deleteCard,
  editCard,
  onCardDragAndDropInSameColumn,
  onCardDragAndDropIntoDifferentColumns,
};
