import { Router } from "express";
import { authController } from "./authController";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "../users/user.interface";

export const authRouter = Router();

authRouter.post("/login" , authController.logInUser);
authRouter.post("/refresh-token" , authController.getNewAccessToken);
authRouter.post("/logout" , authController.logOut);
authRouter.post("/resetPassword" , checkAuths(...Object.values(Role)) ,authController.resetPassword);

