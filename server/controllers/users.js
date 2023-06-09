import User from "../models/User.js";

//display all active users
export const getAll = async (req, res) => {
  try {
    const users = await User.find({ role: "user", status: "active" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//display all active and inactive users
export const getAllFull = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//display all suspended users
export const getSuspendAll = async (req, res) => {
  try {
    const users = await User.find({ status: "suspend", role: "user" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//suspend a user
export const suspendUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findByIdAndUpdate(id, { status: "suspend" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//re-Active a user
export const reActiveUser = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findByIdAndUpdate(id, { status: "active" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//view user profile
export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTop10Users = async (req, res) => {
  try {
    const users = await User.find({ status: "active" })
      .sort({ points: -1 })
      .limit(10);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
