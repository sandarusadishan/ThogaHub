import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const setupRouter = express.Router();

// @route   POST /api/setup/admin
// @desc    Create the first admin user
setupRouter.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if an admin already exists to prevent multiple admins
    let adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(400).json({ msg: "Admin account already exists" });
    }

    let user = new User({ email, password, role: "admin" });
    await user.save();

    res.status(201).json({ msg: "Admin account created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default setupRouter;

//admin@example.com
//admin123
