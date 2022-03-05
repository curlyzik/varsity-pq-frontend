import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course_id: null,
  course_name: null,
  course_code: null,
  course_university: null,
  course_department: null,
  course_faculty: null,
  course_year: null,
  course_level: null,
  course_semester: null,
  author_name: null,
};

export const courseDetailSlice = createSlice({
  name: "courseDetailSlice",
  initialState,
  reducers: {
    setCourseDetails: (state, action) => {
      state.course_id = action.payload.course_id;
      state.course_name = action.payload.course_name;
      state.course_code = action.payload.course_code;
      state.course_university = action.payload.course_university;
      state.course_department = action.payload.course_department;
      state.course_faculty = action.payload.course_faculty;
      state.course_year = action.payload.course_year;
      state.course_level = action.payload.course_level;
      state.course_semester = action.payload.course_semester;
      state.author_name = action.payload.author_name;
    },

    removeCourseDetails: (state) => {
      state.course_id = null;
      state.course_name = null;
      state.course_code = null;
      state.course_university = null;
      state.course_department = null;
      state.course_faculty = null;
      state.course_year = null;
      state.course_level = null;
      state.course_semester = null;
      state.author_name = null;
    },
  },
});

export const { setCourseDetails, removeCourseDetails } =
  courseDetailSlice.actions;

export default courseDetailSlice.reducer;
