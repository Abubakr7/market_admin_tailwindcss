import { createApi } from "@reduxjs/toolkit/dist/query/react";
import api, { providesList } from "./api";

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: api,
  tagTypes: ["SubCategory"],
  endpoints: (build) => ({
    getSubCategories: build.query({
      query: (q) => `subcategories?q=${q}`,
      providesTags: (result) => providesList(result, "SubCategory"),
    }),
    addSubCategory: build.mutation({
      query: (body) => ({
        url: `subcategories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    putSubCategory: build.mutation({
      query: ({ id, ...body }) => ({
        url: `subcategories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useAddSubCategoryMutation,
  usePutSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
