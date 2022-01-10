import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/course/" }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      // Setting default values to avoid undefined error
      query: (university, faculty="", department='', level='', year='', semester='') =>
        `?university__name=${university}&faculty__name=${faculty}&department__name=${department}&level__level=${level}&year__year=${year}&semester__semester=${semester}`,
    }),
  }),
});

export const { useGetCoursesQuery } = courseApi;
