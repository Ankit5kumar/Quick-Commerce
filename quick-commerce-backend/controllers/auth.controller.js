import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({ token, user: { id: user._id, name: user.name, email } });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};
