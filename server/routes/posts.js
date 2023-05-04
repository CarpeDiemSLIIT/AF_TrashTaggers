import express from "express";
import {
  getAllPosts,
  deletePost,
  getAllMyPosts,
  updatePost,
} from "../controllers/posts.js";
import { upVotePost, downVotePost } from "../controllers/postVote.js";
import { verifyTokenUser } from "../middleware/authUserToken.js";
const router = express.Router();

router.route("/all").get(getAllPosts);
router.route("/:id/delete").delete(verifyTokenUser, deletePost);
router.route("/:id/upvote").patch(verifyTokenUser, upVotePost);
router.route("/:id/downvote").patch(verifyTokenUser, downVotePost);

//for user profile
router.route("/allMyPosts").get(verifyTokenUser, getAllMyPosts);
router.route("/update/:id").put(verifyTokenUser, updatePost);
// router.route("/updateImage/:id").put(verifyTokenUser, updatePostImage);

export default router;
