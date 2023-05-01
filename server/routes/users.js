import express from "express";
import { getAll } from "../controllers/users.js";
const router = express.Router();

router.route("/all").get(getAll);

export default router;
