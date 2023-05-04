import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").populate("comments");
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
    author: _id,
  });
  try {
    await newPost.save();
    const newPostWithPopulate = await Post.findById(newPost._id)
      .populate("author")
      .populate("comments");
    res.status(201).json(newPostWithPopulate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { _id } = req.user;
  if (!description)
    return res.status(400).json({ message: "Missing required fields" });

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post does not exist" });
  if (post.author.toString() !== _id.toString())
    return res
      .status(403)
      .json({ message: "You are not the author of this post" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    )
      .populate("author")
      .populate("comments");
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePostImage = async (req, res) => {
  const { id } = req.params;
  const { imageURL } = req.body;
  const { _id } = req.user;
  if (!imageURL)
    return res.status(400).json({ message: "Missing required fields" });

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post does not exist" });
  if (post.author.toString() !== _id.toString())
    return res
      .status(403)
      .json({ message: "You are not the author of this post" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { imageURL },
      { new: true }
    )
      .populate("author")
      .populate("comments");
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    //verify if post exists
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post does not exist" });
    //verify if user is the author of the post
    if (post.author.toString() !== _id.toString())
      return res
        .status(403)
        .json({ message: "You are not the author of this post" });

    //deduct points from author
    const author = await User.findById(post.author);
    author.points -= post.netVotes * 5;
    await author.save();
    //delete post
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllMyPosts = async (req, res) => {
  const { _id } = req.user;
  try {
    const posts = await Post.find({ author: _id })
      .populate("author")
      .populate("comments");
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
