import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyTokenAdmin = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send({ message: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // eslint-disable-line no-undef

    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return res.status(403).send({ message: "Access Denied " });
    }
    // check if the user is an admin
    if (user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "Access Denied You are not an admin" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid Token" });
  }
};
