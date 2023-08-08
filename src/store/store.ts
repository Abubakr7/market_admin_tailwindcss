import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../api/category";
import { productsApi } from "../api/product";
import { brandsApi } from "../api/brands";
import { subCategoryApi } from "../api/subcategory";
import subcategory from "../reducers/subcategory";

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    subcategory: subcategory,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      categoryApi.middleware,
      productsApi.middleware,
      brandsApi.middleware,
      subCategoryApi.middleware
    );
  },
});
