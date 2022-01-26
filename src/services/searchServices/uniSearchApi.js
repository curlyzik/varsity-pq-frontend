import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const uniSearchApiHeaders = {
  "x-rapidapi-host": process.env.NEXT_PUBLIC_HOST,
  "x-rapidapi-key": process.env.NEXT_PUBLIC_KEY,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const createRequest = (url) => ({ url, headers: uniSearchApiHeaders });

export const uniSearchApi = createApi({
  reducerPath: "uniSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUniSearch: builder.query({
      query: (query) => createRequest(`/search/q=${query}`),
    }),
  }),
});

export const { useGetUniSearchQuery } = uniSearchApi;
