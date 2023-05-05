import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const newComment = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const user = req.user;
  if (!comment || !id)
    return res.status(400).json({ message: "Missing required fields" });
  try {
    const newComment = new Comment({ user: user._id, comment: comment });

    await newComment.save();

    await Post.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    const resComment = await Comment.findById(newComment._id).populate("user");
    res.status(201).json({ postId: id, comment: resComment });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
