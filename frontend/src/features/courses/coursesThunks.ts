import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Course, CourseApi } from '../../../types';

export const fetchCourses = createAsyncThunk<Course[]>('courses/fetchAll', async () => {
  const coursesResponse = await axiosApi.get<Course[]>('/courses');
  return coursesResponse.data;
});

export const fetchOneCourse = createAsyncThunk<Course, string>('courses/fetchOne', async (id) => {
  const courseResponse = await axiosApi.get<Course>('/courses/' + id);
  return courseResponse.data;
});

export const addCourse = createAsyncThunk<void, CourseApi>('courses/addCourse', async (course) => {
  const formData = new FormData();

  const keys = Object.keys(course) as (keyof CourseApi)[];
  keys.forEach((key) => {
    const value = course[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post<CourseApi>('/courses', formData);
});

export interface CourseMutation {
  id: string;
  course: CourseApi;
}

export const editCourse = createAsyncThunk<void, CourseMutation>('courses/editCourse', async (params) => {
  const formData = new FormData();

  const keys = Object.keys(params.course) as (keyof CourseApi)[];
  keys.forEach((key) => {
    const value = params.course[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.patch('/courses/' + params.id, formData);
});

export const deleteCourse = createAsyncThunk<void, string>('courses/deleteCourse', async (id) => {
  await axiosApi.delete('/courses/' + id);
});
