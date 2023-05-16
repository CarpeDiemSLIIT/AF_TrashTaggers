import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true,
      },


  description: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Participant: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   default: [],
  // }],

  Participant: [{
    name: String, // Example participant field
    // Other participant fields
  }],

  
});

const Event = mongoose.model("Event", EventSchema);

export default Event;