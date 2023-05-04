import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").populate("comments");
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewPost = async (req, res) => {
  const { description, imageURL } = req.body;
  const { _id } = req.user;
  if (!description || !imageURL)
    return res.status(400).json({ message: "Missing required fields" });

  const newPost = new Post({
    description,
    imageURL,
    user: _id,
  });
  try {
    await newPost.save();
    const newPostWithPopulate = await Post.findById(newPost._id)
      .populate("user")
      .populate("comments");
    res.status(201).json(newPostWithPopulate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//approve a post
export const approvePost = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findByIdAndUpdate(id, { status: "approved" });
    const newPosts = await Post.find().populate("user").populate("comments");
    res.status(200).json(newPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//reject a post
export const rejectPost = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.findByIdAndDelete(id);
    const newPosts = await Post.find().populate("user").populate("comments");
    res.status(200).json(newPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//approve a post
export const addNewComment = async (req, res) => {
  const { _id } = req.user;
  const { pid } = req.params;
  const { comment } = req.body;

  const newComment = new Comment({
    user: _id,
    comment: comment,
  });
  try {
    const newComments = await newComment.save();
    const currentPost = await Post.findByIdAndUpdate(pid, {
      $push: { comments: newComments._id },
    });

    const allMyComment = await Post.find().populate("comments");

    res.status(200).json(allMyComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
