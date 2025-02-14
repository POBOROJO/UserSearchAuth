import { Request, Response } from "express";
import { registerSchema } from "../schemas/registerSchema";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { z } from "zod";
import { loginSchema } from "../schemas/loginSchema";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const validatedData = await registerSchema.safeParseAsync(req.body);
  if (!validatedData.success) {
    return res.status(400).json(validatedData.error.errors);
  }
  const { username, email, password, fullName, gender, dateOfBirth, country } =
    validatedData.data;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
      fullName,
      gender,
      dateOfBirth,
      country,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const validatedData = await loginSchema.safeParseAsync(req.body);
  if (!validatedData.success) {
    return res.status(400).json(validatedData.error.errors);
  }
  const { email, password } = validatedData.data;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
        message:
          "User not registered. Please register before attempting to login.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

//Logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out successfully" });
};