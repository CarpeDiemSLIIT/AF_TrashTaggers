import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

const pointsCalculator = (upVotes, downVotes) => {
  const points = upVotes - downVotes;
  // if (points <= 0) {
  // return 0; // stop the the negative effect for user
  // } else {
  return points;
  // }
};

const upVotePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = req.user;

  if (!post) {
    return res.status(400).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res
      .status(403)
      .send({ message: "User does not exist in database." });
  }

  const author = await User.findById(post.author);

  if (!author) {
    return res
      .status(403)
      .send({ message: "Author user does not exist in database." });
  }

  if (post.upVotes.includes(user._id.toString())) {
    post.upVotes = post.upVotes.filter((u) => {
      u.toString() !== user._id.toString();
    });
    author.points -= 5;
  } else {
    post.upVotes = post.upVotes.concat(user._id);
    if (post.downVotes.includes(user._id.toString())) {
      post.downVotes = post.downVotes.filter(
        (d) => d.toString() !== user._id.toString()
      );
      author.points += 5;
    }
    author.points += 5;
  }

  const calculatedData = pointsCalculator(
    post.upVotes.length,
    post.downVotes.length
  );

  post.netVotes = calculatedData;

  await post.save();
  await author.save();
  const newPostWithPopulate = await Post.findById(post._id)
    .populate("author")
    .populate({ path: "comments", populate: { path: "user" } });
  res.status(200).json(newPostWithPopulate).end();
};
const downVotePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = req.user;

  if (!post) {
    return res.status(403).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res
      .status(403)
      .send({ message: "User does not exist in database." });
  }

  const author = await User.findById(post.author);

  if (!author) {
    return res
      .status(403)
      .send({ message: "Author user does not exist in database." });
  }

  if (post.downVotes.includes(user._id.toString())) {
    post.downVotes = post.downVotes.filter(
      (u) => u.toString() !== user._id.toString()
    );

    author.points += 5;
  } else {
    post.downVotes = post.downVotes.concat(user._id);
    if (post.upVotes.includes(user._id.toString())) {
      post.upVotes = post.upVotes.filter(
        (d) => d.toString() !== user._id.toString()
      );
      author.points -= 5;
    }
    author.points -= 5;
  }

  const calculatedData = pointsCalculator(
    post.upVotes.length,
    post.downVotes.length
  );

  post.netVotes = calculatedData;

  await post.save();
  await author.save();

  const newPostWithPopulate = await Post.findById(post._id)
    .populate("author")
    .populate({ path: "comments", populate: { path: "user" } });
  res.status(200).json(newPostWithPopulate).end();
};

export { upVotePost, downVotePost };
