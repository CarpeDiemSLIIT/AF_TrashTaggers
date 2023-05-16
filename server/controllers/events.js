import Event from "../models/Event.js";


export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().populate("user");
      res.status(200).json(events);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const addNewEvent = async (req, res) => {
    const { description, Title , date } = req.body;
    const { _id } = req.user;
    if (!description || !Title || !date)
      return res.status(400).json({ message: "Missing required fields" });
  
    const newEvent = new Event({
      description,
      date,
      Title,
      user: _id,
    });
    try {
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  

  //TODO :  get events by id

  export const updateEvent = async (req, res) => {
    const eventData = req.body;
    const { id } = req.params;
    const event = await Event.findById(req.params.id);
  
    if (!event) return res.status(404).send(`No event with id: ${id}`);
  
    await Event.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    res.json({ message: "Updated successfully" });
  };



  //add participant 

  // export const Addparticipant= async (req, res) => {
  //   const { id } = req.params;
  //   const eventData = req.body;
  //   try {
  //     const event = await Event.findByIdAndUpdate(id, {$push: {Participant : eventData}});
  //     res.status(200).json("success");
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // };

  export const Addparticipant = async (req, res) => {
    const { id } = req.params;
    const { Participant } = req.body; // Assuming Participant is a single object
  
    try {
      const event = await Event.findByIdAndUpdate(id, {
        $push: { Participant: Participant },
      });
  
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  




  export const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    const event = await Event.findById(req.params.id);
  
    if (!event) return res.status(404).send(`No event with id: ${id}`);
  
    await Event.findByIdAndRemove(id);
    res.json({ message: "Deleted successfully" });
  
    res.json(Event);
  };
  

