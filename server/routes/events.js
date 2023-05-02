import express from "express";
import { getAllEvents }  from "../controllers/events.js";


const event_router = express.Router();

event_router.route("/all").get(getAllEvents);

export default event_router;

