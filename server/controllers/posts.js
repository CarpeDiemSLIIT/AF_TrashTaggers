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

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
