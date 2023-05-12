import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FileInput from '../../components/UI/FileInput/FileInput';
import { CourseApi } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { selectAddCourseLoading } from './coursesSlice';
import { addCourse, fetchCourses } from './coursesThunks';

const FormForArtists = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addCourseLoading = useAppSelector(selectAddCourseLoading);

  const [state, setState] = useState<CourseApi>({
    title: '',
    description: '',
    price: '',
    format: '',
    status: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
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
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add course
      </Button>
    </form>
  );
};

export default FormForArtists;
