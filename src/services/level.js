import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const levelApi = createApi({
  reducerPath: "levelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/level/`,
  }),
  endpoints: (builder) => ({
    getLevels: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetLevelsQuery } = levelApi;
