import express from "express";
import { getAllEvents ,addNewEvent , updateEvent , deleteEvent } from "../controllers/compevents.js";



const cmpevent_router = express.Router();




cmpevent_router.route("/all").get(getAllEvents);
cmpevent_router.route("/new").post(addNewEvent);
cmpevent_router.route("/:id").put(updateEvent);
cmpevent_router.route("/:id").delete(deleteEvent);

export default cmpevent_router;