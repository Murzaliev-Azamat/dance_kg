export interface Message {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  text: string;
}

export interface IncomingMessage {
  type: string;
  payload: Message[] | Message | User[] | User;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  format: string;
  status: string;
  image: string;
}

export interface CourseApi {
  title: string;
  description: string;
  price: string;
  format: string;
  status: string;
  image: File | null;
}

export interface FavoriteCourse {
  _id: string;
  user: string;
  course: Course;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  image: File | null;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  image?: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
