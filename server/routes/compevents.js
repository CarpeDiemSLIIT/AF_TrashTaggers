import express from "express";
import { getAllEvents } from "../controllers/compevents.js";



const cmpevent_router = express.Router();




cmpevent_router.route("/all").get(getAllEvents);

export default cmpevent_router;