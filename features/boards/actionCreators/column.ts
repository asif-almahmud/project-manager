import { Boards } from "../../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const addNewColumn = (
  state: Boards,
  action: PayloadAction<{
    boardId: string;
    columnId: string;
    columnTitle: string;
  }>
) => {
  let boardId = action.payload.boardId;
  let newColumn = {
    id: action.payload.columnId,
    title: action.payload.columnTitle,
    cards: [
      {
        id: "",
        title: "",
        details: "",
      },
    ],
  };
  state.forEach((item) => {
    if (item.id === boardId) {
      item.columns.push(newColumn);
    }
  });
};

const deleteColumn = (
  state: Boards,
  action: PayloadAction<{ boardId: string; columnId: string }>
) => {
  let boardId = action.payload.boardId;
  let columnId = action.payload.columnId;
  return state.map((board) => {
    if (board.id === boardId) {
      return {
        ...board,
        columns: board.columns.filter((column) => column.id !== columnId),
      };
    } else {
      return board;
    }
  });
};

const editColumn = (
  state: Boards,
  action: PayloadAction<{
    boardId: string;
    columnId: string;
    columnTitle: string;
  }>
) => {
  let boardId = action.payload.boardId;
  let columnId = action.payload.columnId;
  let columnTitle = action.payload.columnTitle;
  return state.map((board) => {
    if (board.id === boardId) {
      return {
        ...board,
        columns: board.columns.map((column) => {
          if (column.id === columnId) {
            return { ...column, title: columnTitle };
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

export { addNewColumn, deleteColumn, editColumn };
