import {} from "@reduxjs/toolkit/query/react";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facultyApi = createApi({
  reducerPath: "facultyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/faculty/`,
  }),
  endpoints: (builder) => ({
    getFaculties: builder.query<[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetFacultiesQuery } = facultyApi;
