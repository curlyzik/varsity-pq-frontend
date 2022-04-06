import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gitHubRepoApi = createApi({
  reducerPath: "gitHubRepoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/repos/curlyzik/varsity-pq-frontend",
  }),
  endpoints: (builder) => ({
    getGitHubRepo: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetGitHubRepoQuery } = gitHubRepoApi;
