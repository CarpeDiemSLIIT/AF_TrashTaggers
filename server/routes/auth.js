import express from "express";
import {
  register,
  login,
  makeAdmin,
  getMe,
  updateUserData,
  changePassword,
} from "../controllers/auth.js";
import { verifyTokenUser } from "../middleware/authUserToken.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/makeMeAdmin").put(verifyTokenUser, makeAdmin);
router.route("/getMe").get(verifyTokenUser, getMe);
router.route("/updateMe").put(verifyTokenUser, updateUserData);
router.route("/changePassword").put(verifyTokenUser, changePassword);

export default router;
