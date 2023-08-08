import { createApi } from "@reduxjs/toolkit/dist/query/react";
import api, { providesList } from "./api";
import { setOptions } from "../reducers/subcategory";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: api,
  tagTypes: ["Brand"],
  endpoints: (build) => ({
    getBrands: build.query({
      query: (q) => `brands?q=${q}`,
      providesTags: (result) => providesList(result, "Brand"),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const repsonse = await queryFulfilled;
        dispatch(setOptions(repsonse.data));
      },
    }),
    addBrand: build.mutation({
      query: (body) => ({
        url: `brands`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
    putBrand: build.mutation({
      query: ({ id, ...body }) => ({
        url: `brands/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: build.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  usePutBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
