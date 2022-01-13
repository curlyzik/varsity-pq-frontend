import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pastQuestionApi = createApi({
  reducerPath: "pastQuestionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/past_question/",
  }),
  endpoints: (builder) => ({
    getPastQuestionById: builder.query({
      query: (id) => `${id}/`,
    }),
  }),
});

export const { useGetPastQuestionByIdQuery } = pastQuestionApi;
