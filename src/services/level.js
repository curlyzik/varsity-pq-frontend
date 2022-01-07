import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const levelApi = createApi({
  reducerPath: "levelApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/level/" }),
  endpoints: (builder) => ({
    getLevels: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetLevelsQuery } = levelApi;
