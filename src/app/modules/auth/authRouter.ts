import { Router } from "express";
import { authController } from "./authController";

export const authRouter = Router();

authRouter.post("/login" , authController.logInUser);

