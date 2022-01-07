import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const yearApi = createApi({
  reducerPath: "yearApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/year/" }),
  endpoints: (builder) => ({
    getYears: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetYearsQuery } = yearApi;