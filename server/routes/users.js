import express from "express";

import {
  getAll,
  getSuspendAll,
  suspendUser,
  reActiveUser,
  getAllWithAdmin,
} from "../controllers/users.js";
import { verifyTokenAdmin } from "../middleware/authAdminToken.js";
const router = express.Router();

//Routes for users
router.use(verifyTokenAdmin).route("/all").get(getAll);
router.use(verifyTokenAdmin).route("/allWithAdmin").get(getAllWithAdmin);
router.use(verifyTokenAdmin).route("/allSuspend").get(getSuspendAll);
router.use(verifyTokenAdmin).route("/suspendUser/:id").patch(suspendUser);
router.use(verifyTokenAdmin).route("/reActiveUser/:id").patch(reActiveUser);

export default router;
