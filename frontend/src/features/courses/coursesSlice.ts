import { createSlice } from '@reduxjs/toolkit';
import { Course } from '../../../types';
import { RootState } from '../../app/store';
import { addCourse, fetchCourses } from './coursesThunks';

interface ArtistsState {
  courses: Course[] | [];
  fetchAllCoursesLoading: boolean;
  addCourseLoading: boolean;
}

const initialState: ArtistsState = {
  courses: [],
  fetchAllCoursesLoading: false,
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

export const selectFetchAllCoursesLoading = (state: RootState) => state.courses.fetchAllCoursesLoading;
export const selectAddCourseLoading = (state: RootState) => state.courses.addCourseLoading;
