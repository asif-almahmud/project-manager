import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    // So the state supplied from the store will be like -
    // {
    //   boards: {
    //      ...
    //   },
    // }
  },
});

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostState, comments: CommentsState, user: userState}
export type AppDispatch = typeof store.dispatch;
