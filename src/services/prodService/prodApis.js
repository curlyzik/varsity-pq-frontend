import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const prodApis = createApi({
  reducerPath: "prodApis",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    // prepareHeaders: (headers) => {
    //   headers.set(
    //     "Authorization",
    //     `Token ${process.env.NEXT_PUBLIC_PROD_TOKEN}`
    //   );
    // },
  }),
  endpoints: (builder) => ({
    getProdUniversities: builder.query({
      query: () => ({
        url: "/universities/",
        headers: {
          Authorization: `Token ${process.env.NEXT_PUBLIC_PROD_TOKEN}`,
        },
      }),
    }),
    getProdUniversity: builder.query({
      query: (id) => `/universities/${id}/`,
    }),
    getProdPastQuestions: builder.query({
      query: () => "/past_question/",
    }),
  }),
});

export const {
  useGetProdUniversitiesQuery,
  useGetProdUniversityQuery,
  useGetProdPastQuestionsQuery,
} = prodApis;
