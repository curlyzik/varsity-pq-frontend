import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { departmentApi } from "../services/department";
import { facultyApi } from "../services/faculty";
import { universityApi } from "../services/university";
import { yearApi } from "../services/year";
import { levelApi } from "../services/level";
import { semesterApi } from "../services/semester";
import { pastQuestionApi } from "../services/pastquestion";
import { uniDetailApi } from "../services/searchServices/uniDetailApi";
import { gitHubRepoApi } from "../services/gitHubRepoApi";

import authSliceReducer from "../features/users/authSlice";
import courseDetailSlice from "../features/courses/courseDetailSlice";
import pastQuestionSlice from "../features/pastquestions/pastQuestionSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authSliceReducer,
  courseDetail: courseDetailSlice,
  pastQuestion: pastQuestionSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: storage,
  },
  rootReducer
);

const store = configureStore({
  reducer: {
    [universityApi.reducerPath]: universityApi.reducer,
    [facultyApi.reducerPath]: facultyApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [yearApi.reducerPath]: yearApi.reducer,
    [levelApi.reducerPath]: levelApi.reducer,
    [semesterApi.reducerPath]: semesterApi.reducer,
    [uniDetailApi.reducerPath]: uniDetailApi.reducer,
    [gitHubRepoApi.reducerPath]: gitHubRepoApi.reducer,
    [pastQuestionApi.reducerPath]: pastQuestionApi.reducer,
    persistedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      universityApi.middleware,
      facultyApi.middleware,
      departmentApi.middleware,
      yearApi.middleware,
      levelApi.middleware,
      semesterApi.middleware,
      uniDetailApi.middleware,
      gitHubRepoApi.middleware,
      pastQuestionApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
