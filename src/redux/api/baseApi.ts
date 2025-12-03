import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://autobizz-425913.uc.r.appspot.com",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("X-AUTOBIZZ-TOKEN", token);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
