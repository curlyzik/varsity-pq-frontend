import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/department/`,
  }),
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "",
    }),
    getDepartmentsByFaculty: builder.query({
      query: (faculty) => `?faculty__name=${faculty}`,
    }),
  }),
});

export const { useGetDepartmentsByFacultyQuery, useGetDepartmentsQuery } =
  departmentApi;
