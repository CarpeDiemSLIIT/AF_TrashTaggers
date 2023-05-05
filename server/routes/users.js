import express from "express";

import {
  getAll,
  getSuspendAll,
  suspendUser,
  reActiveUser,
  getProfile,
  getTop10Users,
} from "../controllers/users.js";
import { verifyTokenAdmin } from "../middleware/authAdminToken.js";
const router = express.Router();

//@route /api/users
//view user profile
router.route("/profile/:id").get(getProfile);
router.route("/top-ten-users").get(getTop10Users);

//for admin things
router.use(verifyTokenAdmin).route("/all").get(getAll);
router.use(verifyTokenAdmin).route("/allSuspend").get(getSuspendAll);
router.use(verifyTokenAdmin).route("/suspendUser/:id").patch(suspendUser);
router.use(verifyTokenAdmin).route("/reActiveUser/:id").patch(reActiveUser);

export default router;
