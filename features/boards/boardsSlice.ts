import { createSlice } from "@reduxjs/toolkit";
import { Boards } from "../../types/types";
import { updateBoards as updateBoardsFromLocalStorage } from "./actionCreators/localState";
import {
  addNewBoard as addBoard,
  editBoard as updateBoard,
  deleteBoard as removeBoard,
  onBoardDragAndDrop as handleBoardDragAndDrop,
} from "./actionCreators/board";
import {
  addNewColumn as addColumn,
  editColumn as updateColumn,
  deleteColumn as removeColumn,
  onColumnDragAndDrop as handleColumnDragAndDrop,
} from "./actionCreators/column";
import {
  addNewCard as addCard,
  editCard as updateCard,
  deleteCard as removeCard,
  onCardDragAndDropInSameColumn as handleCardDragAndDropInSameColumn,
  onCardDragAndDropIntoDifferentColumns as handleCardDragAndDropIntoDifferentColumns,
} from "./actionCreators/card";

const initialState: Boards = [
  {
    id: "1",
    title: "Poject1",
    columns: [
      {
        id: "1",
        title: "Backlog",
        cards: [
          {
            id: "1",
            title: "Initial Setup",
            details: "Setup a Nextjs app with TypeScript and Redux Toolkit",
          },
        ],
      },
    ],
  },
];

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    updateBoards: updateBoardsFromLocalStorage,
    addNewBoard: addBoard,
    deleteBoard: removeBoard,
    editBoard: updateBoard,
    addNewColumn: addColumn,
    deleteColumn: removeColumn,
    editColumn: updateColumn,
    addNewCard: addCard,
    deleteCard: removeCard,
    editCard: updateCard,
    onBoardDragAndDrop: handleBoardDragAndDrop,
    onColumnDragAndDrop: handleColumnDragAndDrop,
    onCardDragAndDropInSameColumn: handleCardDragAndDropInSameColumn,
    onCardDragAndDropIntoDifferentColumns:
      handleCardDragAndDropIntoDifferentColumns,
  },
});

export const {
  updateBoards,
  addNewBoard,
  editBoard,
  deleteBoard,
  addNewColumn,
  editColumn,
  deleteColumn,
  addNewCard,
  editCard,
  deleteCard,
  onBoardDragAndDrop,
  onColumnDragAndDrop,
  onCardDragAndDropInSameColumn,
  onCardDragAndDropIntoDifferentColumns,
} = boardsSlice.actions;
export default boardsSlice.reducer;
