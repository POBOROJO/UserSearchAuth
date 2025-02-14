import { z } from "zod";
import User from "../models/User";
import { Request, Response } from "express";

export const searchUser = async (req: Request, res: Response) => {
  try {
    const {search} = req.query;
    const user = await User.findOne({
      $or:[
        { username: search },
        { email: search }
      ]
    }).select('-password');
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
