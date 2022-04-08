import { createSlice } from "@reduxjs/toolkit";

interface PQInitialState {
  file: string | null;
  course_details: {
    course_code: string;
    course: string;
    year: string;
    level: string;
    semester: string;
    faculty: string;
    department: string;
  } | null;

  pqId: string | number | null;
}

const initialState: PQInitialState = {
  file: null,
  course_details: {
    course_code: "",
    course: "",
    year: "",
    level: "",
    semester: "",
    faculty: "",
    department: "",
  },

  pqId: null,
};

export const pastQuestionSlice = createSlice({
  name: "pastQuestionSlice",
  initialState,
  reducers: {
    setPastQuestion: (state, action) => {
      state.file = action.payload.file;
      state.course_details = action.payload.course_details;
    },

    removePastQuestion: (state) => {
      state.file = null;
      state.course_details = null;
    },

    setPqId: (state, action) => {
      state.pqId = action.payload;
    },

    removePqId: (state) => {
      state.pqId = null;
    },
  },
});

export const { setPastQuestion, removePastQuestion, setPqId, removePqId } =
  pastQuestionSlice.actions;

export default pastQuestionSlice.reducer;
