import mongoose from "mongoose";
import Message from "./message.model.js";
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        defualt: [],
      },
    ],
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
