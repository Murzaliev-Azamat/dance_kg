import Track from "./models/Track";

export interface Artist {
  id: string;
  name: string;
  image: string | null;
  info: string;
}

export type ArtistWithoutId = Omit<Artist, "id">;

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

export interface AlbumMutation {
  artist: string;
  name: string;
  image: string | null;
  year: number;
}

export interface TrackMutation {
  album: string;
  name: string;
  time: string;
  trackNumber: number;
  linkToYoutube?: string;
}

export interface TrackHistoryMutation {
  user: ObjectId;
  track: string;
  datetime: Date;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  image?: string;
}
