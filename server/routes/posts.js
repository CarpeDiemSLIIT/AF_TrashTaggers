import express from "express";
import { getAllPosts } from "../controllers/posts.js";
import { upVotePost, downVotePost } from "../controllers/postVote.js";
import { verifyTokenUser } from "../middleware/authUserToken.js";
const router = express.Router();

router.route("/all").get(getAllPosts);
router.route("/:id/upvote").patch(verifyTokenUser, upVotePost);
router.route("/:id/downvote").patch(verifyTokenUser, downVotePost);

export default router;
