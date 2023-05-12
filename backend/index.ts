import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import tracksHistoryRouter from "./routers/tracksHistory";
import config from "./config";
import coursesRouter from "./routers/courses";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/artists", artistsRouter);
app.use("/courses", coursesRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/users", usersRouter);
app.use("/track_history", tracksHistoryRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log("We are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
