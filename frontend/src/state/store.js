import { configureStore } from "@reduxjs/toolkit";
import storageReducer from "../features/users/storage-slice";
import userReducer from "../features/users/user-slice";

export const store = configureStore({
  reducer: {
    storage: storageReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});



export default store;

