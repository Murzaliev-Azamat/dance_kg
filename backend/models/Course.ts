import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
    enum: ["Онлайн", "Оффлайн"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Новый", "Идет набор", "В процессе"],
  },
  image: String,
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
