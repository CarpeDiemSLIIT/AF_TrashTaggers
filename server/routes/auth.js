import express from "express";
import { register, login, makeAdmin } from "../controllers/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/make-admin").put(makeAdmin);

export default router;
