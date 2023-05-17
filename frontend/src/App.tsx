import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlise';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Courses from './features/courses/Courses';
import FormForCourses from './features/courses/FormForCourses';
import Chat from './features/chat/Chat';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      <AppToolBar />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route
            path="/add-course"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <FormForCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-course/:id"
            element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <FormForCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute isAllowed={user !== null}>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<span>Такой страницы не существует</span>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
