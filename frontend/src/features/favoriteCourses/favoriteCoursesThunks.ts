import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { FavoriteCourse } from '../../../types';

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
  await axiosApi.post('/favorite_courses', { course: id });
});

export const deleteFavoriteCourse = createAsyncThunk<void, string>(
  'favoriteCourses/deleteFavoriteCourse',
  async (id) => {
    await axiosApi.delete('/favorite_courses/' + id);
  },
);
