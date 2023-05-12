import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/UI/Spinner/Spinner';
import { apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { selectUser } from '../users/usersSlise';
import { selectCourses, selectFetchAllCoursesLoading } from './coursesSlice';
import { deleteCourse, fetchCourses } from './coursesThunks';

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
          // if ((!course.isPublished && user && user.role !== 'admin') || (!course.isPublished && !user)) {
          //   return;
          // }
          return (
            <div
              key={course._id}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative' }}
            >
              {/*<img src={apiUrl + '/' + course.image} style={{ marginRight: '10px', width: '200px' }} alt="image"></img>*/}
              <Link to={'/albums/' + course._id} style={{ marginRight: '10px' }}>
                {course.title}
              </Link>
              {/*{user && user.role === 'admin' && (*/}
              {/*  <Button onClick={() => removeCourse(course._id)} variant="contained" style={{ marginRight: '10px' }}>*/}
              {/*    Delete*/}
              {/*  </Button>*/}
              {/*)}*/}
              {/*{user && user.role === 'admin' && !course.isPublished && (*/}
              {/*  <>*/}
              {/*    <div*/}
              {/*      style={{*/}
              {/*        backgroundColor: 'white',*/}
              {/*        width: '185px',*/}
              {/*        height: '25px',*/}
              {/*        position: 'absolute',*/}
              {/*        top: '5%',*/}
              {/*        left: '1%',*/}
              {/*      }}*/}
              {/*    >*/}
              {/*      <p style={{ color: 'red' }}>Неопубликовано</p>*/}
              {/*    </div>*/}
              {/*    <Button onClick={() => publish(course._id)} variant="contained" color="success">*/}
              {/*      Опубликовать*/}
              {/*    </Button>*/}
              {/*  </>*/}
              {/*)}*/}
            </div>
          );
        })}
      </>
    );
  }

  return <div>{info}</div>;
};

export default Courses;
