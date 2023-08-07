import { createApi } from "@reduxjs/toolkit/dist/query/react";
import api, { providesList } from "./api";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: api,
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategory: build.query({
      query: (q) => `categories?q=${q}`,
      providesTags: (result) => providesList(result, "Category"),
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: `categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    putCategory: build.mutation({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  usePutCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
