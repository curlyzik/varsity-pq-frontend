import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createQuery = (url) => ({
  url,
  headers: {
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_PQ_API_HOST,
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
  },
});

export const pastQuestionApi = createApi({
  reducerPath: "pastQuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_PQ_API_URL}`,
  }),
  endpoints: (builder) => ({
    getPastQuestions: builder.query({
      query: () => createQuery("/"),
    }),
  }),
});

export const { useGetPastQuestionsQuery } = pastQuestionApi;
