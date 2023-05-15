import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link, NavLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { selectUser } from '../users/usersSlise';
import { selectCourses, selectFetchAllCoursesLoading } from './coursesSlice';
import { deleteCourse, fetchCourses } from './coursesThunks';
import { wrap } from 'framer-motion';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const fetchAllCoursesLoading = useAppSelector(selectFetchAllCoursesLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const removeCourse = async (id: string) => {
    await dispatch(deleteCourse(id));
    await dispatch(fetchCourses());
  };

  // const publish = async (id: string) => {
  //   await dispatch(publishArtist(id));
  //   await dispatch(fetchArtists());
  // };

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
                    <Button size="small" variant="outlined" color="success">
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '30px' }}>{info}</div>
  );
};

export default Courses;
