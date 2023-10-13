import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const register = async (req, res) => {
  console.log(req);
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picture,
      friends,
      location,
      ocupation,
      viewdProfile,
      impressions,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picture: req.file.originalname,
      friends,
      location,
      ocupation,
      viewdProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
