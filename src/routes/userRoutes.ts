import { RequestHandler, Router } from "express";
import { searchUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.get("/search", authMiddleware as RequestHandler, searchUser as RequestHandler);

export default userRouter;