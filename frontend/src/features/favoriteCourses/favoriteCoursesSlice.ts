import { createSlice } from '@reduxjs/toolkit';
import { FavoriteCourse } from '../../../types';
import { RootState } from '../../app/store';
import { addFavoriteCourse, fetchFavoriteCourses, fetchOneFavoriteCourse } from './favoriteCoursesThunks';

interface FavoriteCoursesState {
  favoriteCourses: FavoriteCourse[] | [];
  favoriteCourse: FavoriteCourse | null;
  fetchAllFavoriteCoursesLoading: boolean;
  fetchOneFavoriteCourseLoading: boolean;
  addFavoriteCourseLoading: boolean;
}

const initialState: FavoriteCoursesState = {
  favoriteCourses: [],
  favoriteCourse: null,
  fetchAllFavoriteCoursesLoading: false,
  fetchOneFavoriteCourseLoading: false,
  addFavoriteCourseLoading: false,
};

export const FavoriteCoursesSlice = createSlice({
  name: 'favoriteCourses',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteCourses.pending, (state) => {
      state.fetchAllFavoriteCoursesLoading = true;
    });
    builder.addCase(fetchFavoriteCourses.fulfilled, (state, action) => {
      state.fetchAllFavoriteCoursesLoading = false;
      state.favoriteCourses = action.payload;
    });
    builder.addCase(fetchFavoriteCourses.rejected, (state) => {
      state.fetchAllFavoriteCoursesLoading = false;
    });
    builder.addCase(fetchOneFavoriteCourse.pending, (state) => {
      state.fetchOneFavoriteCourseLoading = true;
    });
    builder.addCase(fetchOneFavoriteCourse.fulfilled, (state, action) => {
      state.fetchOneFavoriteCourseLoading = false;
      state.favoriteCourse = action.payload;
    });
    builder.addCase(fetchOneFavoriteCourse.rejected, (state) => {
      state.fetchOneFavoriteCourseLoading = false;
    });
    builder.addCase(addFavoriteCourse.pending, (state) => {
      state.addFavoriteCourseLoading = true;
    });
    builder.addCase(addFavoriteCourse.fulfilled, (state) => {
      state.addFavoriteCourseLoading = false;
    });
    builder.addCase(addFavoriteCourse.rejected, (state) => {
      state.addFavoriteCourseLoading = false;
    });
  },
});

export const favoriteCoursesReducer = FavoriteCoursesSlice.reducer;
export const selectFavoriteCourses = (state: RootState) => state.favoriteCourses.favoriteCourses;
export const selectFavoriteCourse = (state: RootState) => state.favoriteCourses.favoriteCourse;

export const selectFetchAllFavoriteCoursesLoading = (state: RootState) =>
  state.favoriteCourses.fetchAllFavoriteCoursesLoading;
export const selectFetchOneFavoriteCourseLoading = (state: RootState) =>
  state.favoriteCourses.fetchOneFavoriteCourseLoading;
export const selectAddFavoriteCourseLoading = (state: RootState) => state.favoriteCourses.addFavoriteCourseLoading;
