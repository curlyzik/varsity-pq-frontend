import { configureStore } from "@reduxjs/toolkit";
import { universityApi } from "../services/university";

export const store = configureStore({
  reducer: {
    [universityApi.reducerPath]: universityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(universityApi.middleware),
});
