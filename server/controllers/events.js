import Event from "../models/Event.js";


export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find()/*.populate("user")*/;
      res.status(200).json(events);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const addNewEvent = async (req, res) => {
    const { description, title } = req.body;
    const { _id } = req.user;
    if (!description || !title)
      return res.status(400).json({ message: "Missing required fields" });
  
    const newEvent = new Event({
      description,
      title,
      user: _id,
    });
    try {
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  