import { Router, RequestHandler } from "express";
import { login, logout, register } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", register as RequestHandler);
authRouter.post("/login", login as RequestHandler);
authRouter.get("/logout", logout);

export default authRouter;
