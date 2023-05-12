import express from "express";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import { CourseWithoutId } from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Course from "../models/Course";

const coursesRouter = express.Router();

coursesRouter.get("/", async (req, res, next) => {
  try {
    const courses = await Course.find();
    return res.send(courses);
  } catch (e) {
    return next(e);
  }
});

coursesRouter.post(
  "/",
  auth,
  permit("admin"),
  imagesUpload.single("image"),
  async (req, res, next) => {
    const courseData: CourseWithoutId = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      format: req.body.format,
      status: req.body.status,
      image: req.file ? req.file.filename : null,
    };

    const course = new Course(courseData);

    try {
      await course.save();
      return res.send(course);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

coursesRouter.patch("/:id", auth, permit("admin"), async (req, res, next) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (course) {
      await Course.updateOne(
        { _id: course._id },
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          format: req.body.format,
          status: req.body.status,
          image: req.body.image,
        }
      );
      const updatedCourse = await Course.findOne({ _id: course._id });
      return res.send(updatedCourse);
    }
  } catch (e) {
    return next(e);
  }
});

coursesRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    if (course) {
      await Course.deleteOne({ _id: course._id });
      return res.send("Course deleted");
    }
  } catch (e) {
    return next(e);
  }
});

export default coursesRouter;
