import mongoose from "mongoose";

//TODO not finalized
const adminSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      default: "",
    },
    imageURL: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    badges: [
      {
        type: String,
      },
    ],

    friends: {
      type: Array,
      default: [],
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", adminSchema);
export default User;
