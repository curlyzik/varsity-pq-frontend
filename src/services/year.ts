import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const yearApi = createApi({
  reducerPath: "yearApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/year/`,
  }),
  endpoints: (builder) => ({
    getYears: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetYearsQuery } = yearApi;
