import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/course/" }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetCoursesQuery } = courseApi;
