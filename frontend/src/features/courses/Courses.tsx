import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { selectUser } from '../users/usersSlise';
import { selectCourses, selectFetchAllCoursesLoading } from './coursesSlice';
import { deleteCourse, fetchCourses } from './coursesThunks';
import { selectFavoriteCourses } from '../favoriteCourses/favoriteCoursesSlice';
import {
  addFavoriteCourse,
  deleteFavoriteCourse,
  fetchFavoriteCourses,
} from '../favoriteCourses/favoriteCoursesThunks';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const favoriteCourses = useAppSelector(selectFavoriteCourses);
  const fetchAllCoursesLoading = useAppSelector(selectFetchAllCoursesLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchFavoriteCourses());
  }, [dispatch]);

  const removeCourse = async (id: string) => {
    await dispatch(deleteCourse(id));
    await dispatch(fetchCourses());
  };

  const addToFavorite = async (id: string) => {
    await dispatch(addFavoriteCourse(id));
    await dispatch(fetchFavoriteCourses());
  };

  const removeFromFavorite = async (id: string) => {
    await dispatch(deleteFavoriteCourse(id));
    await dispatch(fetchFavoriteCourses());
  };

  let info = null;

  if (fetchAllCoursesLoading) {
    info = <Spinner />;
  } else {
    info = (
      <>
        {courses.map((course) => {
          return (
            <div key={course._id} style={{ marginBottom: '30px' }}>
              <Card sx={{ width: 345 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia sx={{ height: 250 }} image={apiUrl + '/' + course.image} title="green iguana" />
                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={course.status} color="primary" />
                    {course.format === 'Онлайн' ? (
                      <Chip label={course.format} color="success" />
                    ) : (
                      <Chip label={course.format} color="warning" />
                    )}
                  </Stack>
                  <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions style={{ marginTop: 'auto' }}>
                  {user && user.role === 'admin' && (
                    <>
                      <Button component={NavLink} to={'/add-course'} size="small" variant="outlined" color="success">
                        Add
                      </Button>
                      <Button
                        component={NavLink}
                        to={'/edit-course/' + course._id}
                        sx={{ mr: 1 }}
                        size="small"
                        variant="outlined"
                        color="info"
                      >
                        Edit
                      </Button>
                      <Button onClick={() => removeCourse(course._id)} size="small" variant="outlined" color="error">
                        Delete
                      </Button>
                    </>
                  )}
                  {user && user.role === 'user' && (
                    <Button onClick={() => addToFavorite(course._id)} size="small" variant="outlined" color="success">
                      Add to favorites
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
          );
        })}
      </>
    );
  }

  let infoFavorite = null;

  if (fetchAllCoursesLoading) {
    infoFavorite = <Spinner />;
  } else {
    infoFavorite = (
      <>
        {favoriteCourses.map((favoriteCourse) => {
          return (
            <div key={favoriteCourse._id} style={{ marginBottom: '30px' }}>
              <Card sx={{ width: 345 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  sx={{ height: 250 }}
                  image={apiUrl + '/' + favoriteCourse.course.image}
                  title="green iguana"
                />
                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={favoriteCourse.course.status} color="primary" />
                    {favoriteCourse.course.format === 'Онлайн' ? (
                      <Chip label={favoriteCourse.course.format} color="success" />
                    ) : (
                      <Chip label={favoriteCourse.course.format} color="warning" />
                    )}
                  </Stack>
                  <Typography gutterBottom variant="h6" component="div">
                    {favoriteCourse.course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {favoriteCourse.course.description}
                  </Typography>
                </CardContent>
                <CardActions style={{ marginTop: 'auto' }}>
                  {user && user.role === 'admin' && (
                    <>
                      <Button component={NavLink} to={'/add-course'} size="small" variant="outlined" color="success">
                        Add
                      </Button>
                      <Button
                        component={NavLink}
                        to={'/edit-course/' + favoriteCourse._id}
                        sx={{ mr: 1 }}
                        size="small"
                        variant="outlined"
                        color="info"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => removeCourse(favoriteCourse._id)}
                        size="small"
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  {user && user.role === 'user' && (
                    <Button
                      onClick={() => removeFromFavorite(favoriteCourse._id)}
                      size="small"
                      variant="outlined"
                      color="success"
                    >
                      Remove from favorites
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {favoriteCourses.length !== 0 && <h2 style={{ marginLeft: '20px' }}>My favorite courses</h2>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>{infoFavorite}</div>
      <h2 style={{ marginLeft: '20px' }}>All courses</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>{info}</div>
    </>
  );
};

export default Courses;
