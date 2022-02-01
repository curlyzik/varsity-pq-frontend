import { configureStore } from "@reduxjs/toolkit";
import { departmentApi } from "../services/department";
import { facultyApi } from "../services/faculty";
import { universityApi } from "../services/university";
import { yearApi } from "../services/year";
import { levelApi } from "../services/level";
import { semesterApi } from "../services/semester";
import { uniSearchApi } from "../services/searchServices/uniSearchApi";

export const store = configureStore({
  reducer: {
    [universityApi.reducerPath]: universityApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [yearApi.reducerPath]: yearApi.reducer,
    [levelApi.reducerPath]: levelApi.reducer,
    [semesterApi.reducerPath]: semesterApi.reducer,
    [uniSearchApi.reducerPath]: uniSearchApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      universityApi.middleware,
      facultyApi.middleware,
      departmentApi.middleware,
      yearApi.middleware,
      levelApi.middleware,
      semesterApi.middleware,
      uniSearchApi.middleware,
    ),
});
