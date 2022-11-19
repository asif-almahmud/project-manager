import { Boards } from "../../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const addNewBoard = (
  state: Boards,
  action: PayloadAction<{ boardId: string; boardTitle: string }>
) => {
  let newBoard = {
    id: action.payload.boardId,
    title: action.payload.boardTitle,
    columns: [],
  };
  state.push(newBoard);
};

const deleteBoard = (
  state: Boards,
  action: PayloadAction<{ boardId: string }>
) => {
  let id = action.payload.boardId;
  return state.filter((item) => item.id !== id);
};

const editBoard = (
  state: Boards,
  action: PayloadAction<{ boardId: string; boardTitle: string }>
) => {
  let id = action.payload.boardId;
  let title = action.payload.boardTitle;
  return state.map((item) => {
    if (item.id === id) {
      return { ...item, title };
    } else {
      return item;
    }
  });
};

const onBoardDragAndDrop = (state: Boards, action: PayloadAction<Boards>) => {
  for (let board of action.payload) {
    state.shift();
    state.push(board);
  }
};

export { addNewBoard, deleteBoard, editBoard, onBoardDragAndDrop };
