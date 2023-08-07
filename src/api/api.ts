import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { destroyToken } from "../utils/token";

const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  prepareHeaders: (headers) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const api = async (args: any, api: any, extraOptions: any) => {
  let result = await BaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // destroyToken();
  }
  return result;
};

export function providesList(resultsWithIds: any, tagType: string) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const singleFile = async function (formData) {
  const response = await fetch(`${import.meta.env.VITE_APP_FILES_URL}upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const multiFiles = async function (formData) {
  const response = await fetch(`${import.meta.env.VITE_APP_FILES_URL}uploads`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export default api;
