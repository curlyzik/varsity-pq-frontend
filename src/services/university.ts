import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UniversityDetails } from "../../types";

// set url configuration based on environment
const urlConfigEnviron = (urlBase: string) => {
  if (process.env.NODE_ENV === "development") {
    const createQuery = (url: string) => ({
      url,
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_UNIVERSITY_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      },
    });
    console.log("development mode");
    return createQuery(urlBase);
  }

  if (process.env.NODE_ENV === "production") {
    const createQuery = (url: string) => ({
      url,
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_PROD_TOKEN}`,
      },
    });
    console.log("production mode");
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
    getUniversities: builder.query<UniversityDetails[], void>({
      query: () => urlConfigEnviron("/universities/"),
    }),
    getUniversity: builder.query({
      query: (id) => urlConfigEnviron(`/universities/${id}/`),
    }),
  }),
});

export const { useGetUniversitiesQuery, useGetUniversityQuery } = universityApi;
