import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: (params) => ({
        url: "/sales",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetSalesQuery } = salesApi;
