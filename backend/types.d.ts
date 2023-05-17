import { WebSocket } from "ws";

export interface ActiveConnections {
  [id: string]: WebSocket;
}

export interface IncomingMessage {
  type: string;
  payload: string;
}

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image?: string;
  active: boolean;
}

export interface IMessage {
  user: ObjectId;
  text: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  format: string;
  status: string;
  image: string | null;
}

export type CourseWithoutId = Omit<Course, "id">;

export interface FavoriteCourseMutation {
  user: ObjectId;
  course: string;
}
