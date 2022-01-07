import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const semesterApi = createApi({
  reducerPath: "semesterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/semester/" }),
  endpoints: (builder) => ({
    getSemester: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetSemesterQuery } = semesterApi;
