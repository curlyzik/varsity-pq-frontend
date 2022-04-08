import { createSlice } from "@reduxjs/toolkit";

interface CourseDetailState {
  course_id: string | null;
  course_name: string | null;
  course_code: string | null;
  course_university: string | null;
  course_department: string | null;
  course_faculty: string | null;
  course_year: string | null;
  course_level: string | null;
  course_semester: string | null;
  author_name: string | null;

  courseId: string | null;
}

const initialState: CourseDetailState = {
  course_id: "",
  course_name: "",
  course_code: "",
  course_university: "",
  course_department: "",
  course_faculty: "",
  course_year: "",
  course_level: "",
  course_semester: "",
  author_name: "",

  courseId: "",
};

export const courseDetailSlice = createSlice({
  name: "courseDetailSlice",
  initialState,
  reducers: {
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },

    removeCourseId: (state) => {
      state.courseId = null;
    },

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

export const {
  setCourseDetails,
  removeCourseDetails,
  setCourseId,
  removeCourseId,
} = courseDetailSlice.actions;

export default courseDetailSlice.reducer;
