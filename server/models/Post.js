import mongoose from "mongoose";
//TODO not done
const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downVotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  netVotes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
