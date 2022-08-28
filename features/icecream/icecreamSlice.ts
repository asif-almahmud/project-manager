import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { order as orderCake } from "../cake/cakeSlice";

export interface IIcecreamState {
  numberOfIcecreams: number;
}

const initialState: IIcecreamState = { numberOfIcecreams: 10 };

export const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    // Here the key "ordered" will be handled by Redux Toolkit in such a way that we may use it as an action creator later. So for this action creator call, its value which is a reducer function will perform slice update. This is "slice update" because the state it takes as argument represents the current slice.
    order: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. But it doesn't actually mutate the state because it uses Immer Library under the hood. Immer detects changes to a "draft state" and produces a brand new immutable state based on those changes.
      state.numberOfIcecreams !== 0 && state.numberOfIcecreams--;
    },
    restock: (state) => {
      state.numberOfIcecreams++;
    },
    orderByAmount: (state, action: PayloadAction<number>) => {
      state.numberOfIcecreams -= action.payload;
    },
    restockByAmount: (state, action: PayloadAction<number>) => {
      state.numberOfIcecreams += action.payload;
    },
  },
});

// Action creators are generated for each reducer function
export const { order, restock, orderByAmount, restockByAmount } =
  icecreamSlice.actions;
export default icecreamSlice.reducer;
