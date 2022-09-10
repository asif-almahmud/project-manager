import { createSlice } from "@reduxjs/toolkit";
import { Boards } from "../../types/types";
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
            details: "MERN Stack with TypeScript, Nextjs and Redux Toolkit",
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
    // onCardDragAndDrop:handleCardDragAndDrop,
  },
});

// Action creators are generated for each reducer function
export const {
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
} = boardsSlice.actions;
export default boardsSlice.reducer;
