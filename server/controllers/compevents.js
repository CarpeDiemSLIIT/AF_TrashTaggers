import CompEvent from "../models/CompEvent.js";

export const getAllEvents = async (req, res) => {
    try {
      const cmpevents = await CompEvent.find()/*.populate("user")*/;
      res.status(200).json(cmpevents);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  //todo : Add completed events