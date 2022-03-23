import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createQuery = (url) => ({
  url,
  headers: {
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_UNIVERSITY_API_HOST,
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
  },
});

export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_UNIVERSITY_API_URL}`,
  }),
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: () => createQuery("/"),
    }),
    getUniversity: builder.query({
      query: (id) => createQuery(`/${id}/`),
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityQuery } = universityApi;
