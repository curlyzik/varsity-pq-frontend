import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uniSearchApiHeaders = {
  "x-rapidapi-host": process.env.NEXT_PUBLIC_NEWS_API_HOST,
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
};

const baseUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;

const createRequest = (url) => ({ url, headers: uniSearchApiHeaders });

export const uniDetailApi = createApi({
  reducerPath: "uniDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUniSearch: builder.query({
      query: (query) => createRequest(`/search/q=${query}`),
    }),
    getUniNews: builder.query({
      query: (query) => createRequest(`/news/q=${query}`),
    }),
  }),
});

export const { useGetUniSearchQuery, useGetUniNewsQuery } = uniDetailApi;
