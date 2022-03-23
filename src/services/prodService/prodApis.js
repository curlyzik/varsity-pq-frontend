import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const prodApis = createApi({
  reducerPath: "prodApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  endpoints: (builder) => ({
    getProdUniversities: builder.query({
      query: () => "/universities/",
    }),
    getProdUniversity: builder.query({
      query: (id) => `/universities/${id}/`,
    }),
  }),
});

export const { useGetProdUniversitiesQuery, useGetProdUniversityQuery } =
  prodApis;
