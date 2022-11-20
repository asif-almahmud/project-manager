import { Boards } from "../../../types/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const updateBoards = (
  state: Boards,
  action: PayloadAction<{ boards: Boards }>
) => {
  state = [...action.payload.boards];
  return state;
};

export { updateBoards };
