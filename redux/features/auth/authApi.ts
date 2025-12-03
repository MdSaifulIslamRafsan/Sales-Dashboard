import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    token: builder.mutation({
      query: (userInfo) => ({
        url: "/getAuthorize",
        method: "POST",
        body: userInfo,
      }),
    }),
    
  }),
});

export const { useTokenMutation } = authApi;
