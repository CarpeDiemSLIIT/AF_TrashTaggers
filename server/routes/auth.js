import express from "express";
import { register, login, makeAdmin, getMe } from "../controllers/auth.js";
import { verifyTokenUser } from "../middleware/authUserToken.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/make-admin").put(makeAdmin);
router.route("/getMe").get(verifyTokenUser, getMe);

export default router;
