import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/department/" }),
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: (faculty) => `?faculty__name=${faculty}`,
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;