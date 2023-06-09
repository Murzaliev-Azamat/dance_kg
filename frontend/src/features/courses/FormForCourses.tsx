import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { CourseApi } from '../../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAddCourseLoading, selectCourse } from './coursesSlice';
import { addCourse, editCourse, fetchCourses, fetchOneCourse } from './coursesThunks';

const FormForCourses = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addCourseLoading = useAppSelector(selectAddCourseLoading);
  const course = useAppSelector(selectCourse);

  const [state, setState] = useState<CourseApi>({
    title: '',
    description: '',
    price: '',
    format: '',
    status: '',
    image: null,
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOneCourse(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (course && params.id) {
      setState({
        title: course.title,
        description: course.description,
        price: course.price.toString(),
        format: course.format,
        status: course.status,
        image: null,
      });
    } else {
      setState({
        title: '',
        description: '',
        price: '',
        format: '',
        status: '',
        image: null,
      });
    }
  }, [course, params.id]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id && course) {
      await dispatch(
        editCourse({
          id: params.id,
          course: {
            title: state.title,
            description: state.description,
            price: state.price,
            format: state.format,
            status: state.status,
            image: state.image,
          },
        }),
      );
    } else {
      await dispatch(
        addCourse({
          title: state.title,
          description: state.description,
          price: state.price,
          format: state.format,
          status: state.status,
          image: state.image,
        }),
      );
    }
    setState({ title: '', description: '', price: '', format: '', status: '', image: null });
    await dispatch(fetchCourses());
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  let disabled = false;

  if (addCourseLoading) {
    disabled = true;
  }

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
        <TextField
          sx={{ width: '100%' }}
          id="title"
          label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <TextField
            sx={{ width: 1 }}
            multiline
            rows={3}
            id="description"
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <TextField
            sx={{ width: 1 }}
            multiline
            rows={3}
            id="price"
            label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            select
            sx={{ width: 1 }}
            multiline
            rows={3}
            id="format"
            label="Format"
            value={state.format}
            onChange={inputChangeHandler}
            name="format"
            required
          >
            <MenuItem disabled value="">
              Выберите формат
            </MenuItem>
            <MenuItem value="Онлайн">Онлайн</MenuItem>
            <MenuItem value="Оффлайн">Оффлайн</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            select
            sx={{ width: 1 }}
            multiline
            rows={3}
            id="status"
            label="Status"
            value={state.status}
            onChange={inputChangeHandler}
            name="status"
            required
          >
            <MenuItem disabled value="">
              Выберите статус
            </MenuItem>
            <MenuItem value="Новый">Новый</MenuItem>
            <MenuItem value="Идет набор">Идет набор</MenuItem>
            <MenuItem value="В процессе">В процессе</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
      </Grid>

      {params.id ? (
        <Button disabled={disabled} type="submit" color="primary" variant="contained">
          Edit course
        </Button>
      ) : (
        <Button disabled={disabled} type="submit" color="primary" variant="contained">
          Add course
        </Button>
      )}
    </form>
  );
};

export default FormForCourses;
