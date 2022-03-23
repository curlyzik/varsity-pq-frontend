import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// set url configuration based on environment
const urlConfigEnviron = (urlBase) => {
  if (process.env.NODE_ENV === "development") {
    const createQuery = (url) => ({
      url,
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_UNIVERSITY_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      },
    });
    console.log("Dev mode");
    return createQuery(urlBase);
  }

  if (process.env.NODE_ENV === "production") {
    const createQuery = (url) => ({
      url,
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_PROD_TOKEN}`,
      },
    });
    console.log("Production mode");
    return createQuery(urlBase);
  }

  return urlBase;
};

// set base url configuration based on environment
const baseUrlConfig = () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_UNIVERSITY_API_URL;
  }

  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_URL;
  }
};

export const universityApi = createApi({
  reducerPath: "universityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrlConfig(),
  }),
  endpoints: (builder) => ({
    getUniversities: builder.query({
      query: () => urlConfigEnviron("/universities/"),
    }),
    getUniversity: builder.query({
      query: (id) => urlConfigEnviron(`/universities/${id}/`),
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityQuery } = universityApi;
