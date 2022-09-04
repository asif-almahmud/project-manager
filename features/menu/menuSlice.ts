import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IMenu {
  open: boolean;
}

const initialState: IMenu = { open: false };

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.open = true;
    },
    closeMenu: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each reducer function
export const { openMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
