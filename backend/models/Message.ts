import mongoose, { Types } from "mongoose";
import User from "./User";
import { IMessage } from "../types";
const Schema = mongoose.Schema;

const MessageSchema = new Schema<IMessage>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist",
    },
  },
  text: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
