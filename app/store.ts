import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../features/cake/cakeSlice";
import icecreamReducer from "../features/icecream/icecreamSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
    // So the state supplied from the store will be like -
    // {
    //   cake: {
    //      numberOfCakes: 0
    //   },
    //   icecream: {
    //      numberOfIcecreams: 0
    //   },
    //   user: {
    //      entities: [],
    //      loading: false,
    //      error: ""
    //   }
    // }
  },
});

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostState, comments: CommentsState, user: userState}
export type AppDispatch = typeof store.dispatch;
