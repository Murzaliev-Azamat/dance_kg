import { createSlice } from '@reduxjs/toolkit';
import { Course } from '../../../types';
import { RootState } from '../../app/store';
import { addCourse, fetchCourses, fetchOneCourse } from './coursesThunks';

interface ArtistsState {
  courses: Course[] | [];
  course: Course | null;
  fetchAllCoursesLoading: boolean;
  fetchOneCourseLoading: boolean;
  addCourseLoading: boolean;
}

const initialState: ArtistsState = {
  courses: [],
  course: null,
  fetchAllCoursesLoading: false,
  fetchOneCourseLoading: false,
  addCourseLoading: false,
};

export const CoursesSlice = createSlice({
  name: 'courses',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.fetchAllCoursesLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.fetchAllCoursesLoading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.fetchAllCoursesLoading = false;
    });
    builder.addCase(fetchOneCourse.pending, (state) => {
      state.fetchOneCourseLoading = true;
    });
    builder.addCase(fetchOneCourse.fulfilled, (state, action) => {
      state.fetchOneCourseLoading = false;
      state.course = action.payload;
    });
    builder.addCase(fetchOneCourse.rejected, (state) => {
      state.fetchOneCourseLoading = false;
    });
    builder.addCase(addCourse.pending, (state) => {
      state.addCourseLoading = true;
    });
    builder.addCase(addCourse.fulfilled, (state) => {
      state.addCourseLoading = false;
    });
    builder.addCase(addCourse.rejected, (state) => {
      state.addCourseLoading = false;
    });
  },
});

export const coursesReducer = CoursesSlice.reducer;
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCourse = (state: RootState) => state.courses.course;

export const selectFetchAllCoursesLoading = (state: RootState) => state.courses.fetchAllCoursesLoading;
export const selectFetchOneCourseLoading = (state: RootState) => state.courses.fetchOneCourseLoading;
export const selectAddCourseLoading = (state: RootState) => state.courses.addCourseLoading;
