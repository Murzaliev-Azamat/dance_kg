import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Course, CourseApi, FavoriteCourse } from '../../../types';
import { selectFetchAllFavoriteCoursesLoading } from './favoriteCoursesSlice';

export const fetchFavoriteCourses = createAsyncThunk<FavoriteCourse[]>('favoriteCourses/fetchAll', async () => {
  const favoriteCoursesResponse = await axiosApi.get<FavoriteCourse[]>('/favorite_courses');
  return favoriteCoursesResponse.data;
});

export const fetchOneFavoriteCourse = createAsyncThunk<FavoriteCourse, string>(
  'favoriteCourses/fetchOne',
  async (id) => {
    const favoriteCourseResponse = await axiosApi.get<FavoriteCourse>('/favorite_courses/' + id);
    return favoriteCourseResponse.data;
  },
);

export const addFavoriteCourse = createAsyncThunk<void, string>('favoriteCourses/addFavoriteCourse', async (id) => {
  // const formData = new FormData();
  //
  // const keys = Object.keys(favoriteCourse) as (keyof CourseApi)[];
  // keys.forEach((key) => {
  //   const value = favoriteCourse[key];
  //
  //   if (value !== null) {
  //     formData.append(key, value);
  //   }
  // });

  await axiosApi.post('/favorite_courses', { course: id });
});

export const deleteFavoriteCourse = createAsyncThunk<void, string>(
  'favoriteCourses/deleteFavoriteCourse',
  async (id) => {
    await axiosApi.delete('/favorite_courses/' + id);
  },
);
