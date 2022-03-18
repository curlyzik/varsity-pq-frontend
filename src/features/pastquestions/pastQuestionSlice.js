import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  course_details: {
    course_code: null,
    course: null,
    year: null,
    level: null,
    semester: null,
    faculty: null,
    department: null,
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
