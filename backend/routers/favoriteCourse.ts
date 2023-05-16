import express from "express";
import mongoose from "mongoose";
import { FavoriteCourseMutation } from "../types";
import auth, { RequestWithUser } from "../middleware/auth";
import FavoriteCourse from "../models/FavoriteCourse";

const favoriteCourseRouter = express.Router();

favoriteCourseRouter.get("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const favoriteCourse = await FavoriteCourse.find({
      user: user._id,
    }).populate({
      path: "course",
    });
    return res.send(favoriteCourse);
  } catch (e) {
    return next(e);
  }
});

favoriteCourseRouter.post("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const favoriteCourseData: FavoriteCourseMutation = {
    user: user._id,
    course: req.body.course,
  };

  const favoriteCourse = new FavoriteCourse(favoriteCourseData);

  try {
    await favoriteCourse.save();
    return res.send({
      username: user.username,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

favoriteCourseRouter.delete("/:id", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const favoriteCourse = await FavoriteCourse.findOneAndDelete({
      _id: req.params.id,
      user: user._id,
    });

    if (!favoriteCourse) {
      return res
        .status(404)
        .send(`Favorite Course with id ${req.params.id} not found`);
    }
    return res.send(`Favorite Course by ${req.params.id} deleted`);
  } catch (e) {
    return next(e);
  }
});

export default favoriteCourseRouter;
