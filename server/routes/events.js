import express from "express";
import { getAllEvents , addNewEvent ,updateEvent ,deleteEvent , Addparticipant}  from "../controllers/events.js";


const event_router = express.Router();

event_router.route("/all").get(getAllEvents);
event_router.route("/new").post(addNewEvent);
event_router.route("/:id").put(updateEvent);
event_router.route("/participant/:id").put(Addparticipant);
event_router.route("/:id").delete(deleteEvent);

export default event_router;

