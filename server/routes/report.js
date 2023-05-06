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

router.use(verifyTokenAdmin).route("/all").get(getAllReports);
router.use(verifyTokenUser).route("/add/:pid").post(addNewReport);
router.use(verifyTokenAdmin).route("/resolve/:pid").patch(resolveReport);
router
  .use(verifyTokenAdmin)
  .route("/resolve/banCreator/:id")
  .patch(resolveReportBanCreator);
router
  .use(verifyTokenAdmin)
  .route("/resolve/removePost/:pid")
  .patch(resolveReportRemovePost);

export default router;
