import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Boards } from "../../types/types";
import {
  addNewBoard as addBoard,
  editBoard as updateBoard,
  deleteBoard as removeBoard,
} from "./actionCreators/board";
import {
  addNewColumn as addColumn,
  editColumn as updateColumn,
  deleteColumn as removeColumn,
} from "./actionCreators/column";
import {
  addNewCard as addCard,
  editCard as updateCard,
  deleteCard as removeCard,
} from "./actionCreators/card";

const initialState: Boards = [
  {
    id: "1",
    title: "Poject1",
    columns: [
      {
        id: "1",
        title: "Backlogs",
        cards: [
          {
            id: "1",
            title: "Initial Setup",
            details: "MERN Stack with TypeScript and Nextjs",
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
} = boardsSlice.actions;
export default boardsSlice.reducer;
