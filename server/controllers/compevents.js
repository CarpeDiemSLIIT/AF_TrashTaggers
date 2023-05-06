import CompEvent from "../models/CompEvent.js";

export const getAllEvents = async (req, res) => {
    try {
      const cmpevents = await CompEvent.find()/*.populate("user")*/;
      res.status(200).json(cmpevents);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };



  export const addNewEvent = async (req, res) => {
    const { Title , description, imageURL } = req.body;
    const { _id } = req.user;
    if (!description || !imageURL || !Title)
      return res.status(400).json({ message: "Missing required fields" });
  
    const newCompEvent = new CompEvent({
      description,
      Title,
      imageURL,
      user: _id,
    });
    try {
      await newCompEvent.save();
      res.status(201).json(newCompEvent);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  export const updateEvent = async (req, res) => {
    const eventData = req.body;
    const { id } = req.params;
    const event = await CompEvent.findById(req.params.id);
  
    if (!event) return res.status(404).send(`No event with id: ${id}`);
  
    await CompEvent.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    res.json({ message: "Updated successfully" });
  };


  export const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    const event = await CompEvent.findById(req.params.id);
  
    if (!event) return res.status(404).send(`No event with id: ${id}`);
  
    await CompEvent.findByIdAndRemove(id);
    res.json({ message: "Deleted successfully" });
  
    res.json(CompEvent);
  };
  