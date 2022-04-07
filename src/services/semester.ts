import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const semesterApi = createApi({
  reducerPath: "semesterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/semester/`,
  }),
  endpoints: (builder) => ({
    getSemester: builder.query<[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetSemesterQuery } = semesterApi;
