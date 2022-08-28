import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IUsersState<T> {
  entities: T[];
  loading: boolean;
  error: string;
}

const initialState: IUsersState<{}> = {
  entities: [],
  loading: false,
  error: "",
};

// createAsyncThunk generates "pending", "fulfilled" and "rejected" action types for us
const fetchUserById = createAsyncThunk(
  "users/fetchById",
  // if you type your function argument here
  async (userId: number) => {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return await response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.entities.push(action.payload);
      state.loading = false;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default usersSlice.reducer;
