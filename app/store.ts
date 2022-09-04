import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../features/cake/cakeSlice";
import icecreamReducer from "../features/icecream/icecreamSlice";
import userReducer from "../features/user/userSlice";
import boardsReducer from "../features/boards/boardsSlice";
import menuReducer from "../features/menu/menuSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    menu: menuReducer,
    // So the state supplied from the store will be like -
    // {
    //   boards: {
    //      ...
    //   },
    //   menu: {
    //      ...
    //   },
    // }
  },
});

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostState, comments: CommentsState, user: userState}
export type AppDispatch = typeof store.dispatch;
