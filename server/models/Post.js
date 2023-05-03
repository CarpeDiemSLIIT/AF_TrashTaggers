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
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upVotes: {
    type: Map,
    of: Boolean,
  },
  downVotes: {
    type: Map,
    of: Boolean,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
