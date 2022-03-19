import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pastQuestionApi = createApi({
  reducerPath: "pastQuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/past_question/`,
  }),
  endpoints: (builder) => ({
    getPastQuestions: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetPastQuestionsQuery } = pastQuestionApi;
