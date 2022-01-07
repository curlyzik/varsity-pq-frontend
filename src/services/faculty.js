import {} from "@reduxjs/toolkit/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facultyApi = createApi({
  reducerPath: "facultyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/faculty/" }),
  endpoints: (builder) => ({
    getFaculties: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetFacultiesQuery } = facultyApi;
