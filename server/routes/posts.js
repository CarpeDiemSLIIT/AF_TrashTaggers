import express from "express";
import { getAllPosts, approvePost } from "../controllers/posts.js";
const router = express.Router();

router.route("/all").get(getAllPosts);

export default router;
