import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    userId?: string; // Add the userId property
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  const token = req.cookies.token;
  if (!token) {
   return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.userId = (decoded as any).userId;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
