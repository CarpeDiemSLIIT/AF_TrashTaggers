import express from "express";
import { getAllPosts, deletePost, updatePost } from "../controllers/posts.js";
import { upVotePost, downVotePost } from "../controllers/postVote.js";
import { verifyTokenUser } from "../middleware/authUserToken.js";
import { newComment } from "../controllers/comment.js";

const router = express.Router();
//for both
router.route("/all").get(getAllPosts);

//for user
router.route("/update/:id").put(verifyTokenUser, updatePost);
router.route("/:id/newComment").post(verifyTokenUser, newComment);

//for admin
router.route("/:id/delete").delete(verifyTokenUser, deletePost);
router.route("/:id/upvote").patch(verifyTokenUser, upVotePost);
router.route("/:id/downvote").patch(verifyTokenUser, downVotePost);

export default router;
