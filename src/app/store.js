import { configureStore } from "@reduxjs/toolkit";
import { departmentApi } from "../services/department";
import { facultyApi } from "../services/faculty";
import { universityApi } from "../services/university";
import { yearApi } from "../services/year";
import { levelApi } from "../services/level";
import { courseApi } from "../services/course";
import { semesterApi } from "../services/semester";
import { pastQuestionApi } from "../services/pastQuestion";

export const store = configureStore({
  reducer: {
    [universityApi.reducerPath]: universityApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [yearApi.reducerPath]: yearApi.reducer,
    [levelApi.reducerPath]: levelApi.reducer,
    [semesterApi.reducerPath]: semesterApi.reducer,
    [pastQuestionApi.reducerPath]: pastQuestionApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      universityApi.middleware,
      facultyApi.middleware,
      departmentApi.middleware,
      courseApi.middleware,
      yearApi.middleware,
      levelApi.middleware,
      semesterApi.middleware,
      pastQuestionApi.middleware,
    ),
});
