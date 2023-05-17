import cors from "cors";
import express from "express";
import expressWs from "express-ws";
import mongoose from "mongoose";
import usersRouter from "./routers/users";
import config from "./config";
import coursesRouter from "./routers/courses";
import favoriteCourseRouter from "./routers/favoriteCourse";
import crypto from "crypto";
import { ActiveConnections, IncomingMessage, IUser } from "./types";
import User from "./models/User";
import Message from "./models/Message";

const app = express();
const port = 8000;

app.use(cors());
expressWs(app);
app.use(express.static("public"));
app.use(express.json());
app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/favorite_courses", favoriteCourseRouter);

const router = express.Router();

app.use(router);

const activeConnections: ActiveConnections = {};

router.ws("/chat", async (ws, req) => {
  const id = crypto.randomUUID();
  console.log("client connected! id=", id);
  activeConnections[id] = ws;
  let user: IUser | null = null;

  ws.on("message", async (msg) => {
    const decodedMessage = JSON.parse(msg.toString()) as IncomingMessage;
    switch (decodedMessage.type) {
      case "LOGIN": {
        user = await User.findOne({ token: decodedMessage.payload });
        const onlineUsers = await User.find({ active: true });
        const messages = await Message.find()
          .limit(30)
          .populate("user", "displayName");
        activeConnections[id].send(
          JSON.stringify({
            type: "MESSAGES",
            payload: messages,
          })
        );
        activeConnections[id].send(
          JSON.stringify({
            type: "ONLINE_USERS",
            payload: onlineUsers,
          })
        );
        Object.keys(activeConnections).forEach((connId) => {
          const conn = activeConnections[connId];
          if (conn !== activeConnections[id]) {
            conn.send(
              JSON.stringify({
                type: "NEW_USER",
                payload: user,
              })
            );
          }
        });

        break;
      }
      case "SEND_MESSAGE": {
        if (user === null) break;
        const message = new Message({
          text: decodedMessage.payload,
          user: user._id,
        });
        await message.save();
        Object.keys(activeConnections).forEach((connId) => {
          const conn = activeConnections[connId];
          conn.send(
            JSON.stringify({
              type: "NEW_MESSAGE",
              payload: {
                _id: message._id,
                user: {
                  _id: user?._id,
                  displayName: user?.displayName,
                },
                text: decodedMessage.payload,
              },
            })
          );
        });
        break;
      }

      default:
        console.log("Unknown message type:", decodedMessage.type);
    }
  });

  ws.on("close", () => {
    console.log("client disconnected! id=" + id);
    Object.keys(activeConnections).forEach((connId) => {
      const conn = activeConnections[connId];
      conn.send(
        JSON.stringify({
          type: "LOGOUT",
          payload: user,
        })
      );
    });
    delete activeConnections[id];
  });
});

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
