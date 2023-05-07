import express from "express";
import {
  addNewReport,
  getAllReports,
  resolveReport,
  resolveReportBanCreator,
  resolveReportRemovePost,
} from "../controllers/reports.js";
import { verifyTokenUser } from "../middleware/authUserToken.js";
import { verifyTokenAdmin } from "../middleware/authAdminToken.js";

const router = express.Router();

router.route("/add/:pid").post(verifyTokenUser, addNewReport);
router.route("/all").get(verifyTokenAdmin, getAllReports);
router.route("/resolve/:pid").patch(verifyTokenAdmin, resolveReport);
router

  .route("/resolve/banCreator/:id")
  .patch(verifyTokenAdmin, resolveReportBanCreator);
router

  .route("/resolve/removePost/:pid")
  .patch(verifyTokenAdmin, resolveReportRemovePost);

export default router;
