import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../api/category";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(categoryApi.middleware);
  },
});
