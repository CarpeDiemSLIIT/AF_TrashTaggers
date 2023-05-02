import mongoose from "mongoose";

const CompEventSchema = new mongoose.Schema({

    Title: {
        type: String,
        required: true,
      },


  description: {
    type: String,
    required: true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Participant: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [],
  }],

  imageURL: {
    type: String,
    required: true,
  },

});

const CompEvent = mongoose.model("Completed_Events", CompEventSchema);

export default CompEvent;