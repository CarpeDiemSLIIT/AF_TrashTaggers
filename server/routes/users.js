import express from "express";
import { getAll } from "../controllers/users.js";
import { verifyTokenAdmin } from "../middleware/authAdminToken.js";
const router = express.Router();

router.use(verifyTokenAdmin).route("/all").get(getAll);

export default router;
