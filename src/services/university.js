import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/universities/" }),
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetUniversitiesQuery } = universityApi;