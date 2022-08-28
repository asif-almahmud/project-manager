import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICakeState {
  numberOfCakes: number;
}

const initialState: ICakeState = { numberOfCakes: 10 };

export const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    // Here the key "ordered" will be handled by Redux Toolkit in such a way that we may use it as an action creator later. So for this action creator call, its value which is a reducer function will perform slice update. This is "slice update" because the state it takes as argument represents the current slice.
    order: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. But it doesn't actually mutate the state because it uses Immer Library under the hood. Immer detects changes to a "draft state" and produces a brand new immutable state based on those changes.
      state.numberOfCakes !== 0 && state.numberOfCakes--;
    },
    restock: (state) => {
      state.numberOfCakes++;
    },
    orderByAmount: (state, action: PayloadAction<number>) => {
      state.numberOfCakes -= action.payload;
    },
    restockByAmount: (state, action: PayloadAction<number>) => {
      state.numberOfCakes += action.payload;
    },
  },
});

// Action creators are generated for each reducer function
export const { order, restock, orderByAmount, restockByAmount } =
  cakeSlice.actions;
export default cakeSlice.reducer;
