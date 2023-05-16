import mongoose, { Types } from "mongoose";
import User from "./User";
import Course from "./Course";
const Schema = mongoose.Schema;

const FavoriteCourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist",
    },
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Course.findById(value),
      message: "Course does not exist",
    },
  },
});

const FavoriteCourse = mongoose.model("FavoriteCourse", FavoriteCourseSchema);
export default FavoriteCourse;
