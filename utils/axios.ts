import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import store from "../src/app/store";
import { setAuth, logout } from "../src/features/users/authSlice";

const axiosService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use(async (config) => {
  const { accessToken } = store.getState().persistedReducer.auth;

  if (accessToken !== null) {
    config.headers!.Authorization = `Bearer ${accessToken}`;

    console.debug(
      "[Request]",
      config.baseURL + config.url!,
      JSON.stringify(accessToken)
    );
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => {
    console.debug(
      "[Response]",
      res.config.baseURL + res.config.url!,
      res.status,
      res.data
    );
    return Promise.resolve(res);
  },
  (err) => {
    console.debug(
      "[Response]",
      err.config.baseURL + err.config.url,
      err.response.status,
      err.response.data
    );
    return Promise.reject(err);
  }
);


// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
  const { refreshToken, account } = store.getState().persistedReducer.auth;

  if (refreshToken != null) {
    return axios
      .post(
        "/dj-rest-auth/token/refresh/",
        { refresh: refreshToken },
        {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
        }
      )
      .then((resp) => {
        const { access } = resp.data;
        failedRequest.response.config.headers.Authorization =
          "Bearer " + access;
        store.dispatch(
          setAuth({
            access_token: access,
            refresh_token: refreshToken,
            account: account,
          })
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          store.dispatch(logout());
        }
      });
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export const fetcher = (url: string) => {
  return axiosService.get(url).then((res) => res.data);
};

export default axiosService;
