import { Router } from "express";
import { userController } from "./user.controller";
import { createZodSchema } from "./userValidation";
import { checkAuths } from "../../middleware/protectAdmin";
import { Role } from "./user.interface";
import { validateRequest } from "../../utils/requestValidation";

const userRouter = Router();



userRouter.post("/register", validateRequest(createZodSchema), userController.createUser);
userRouter.get("/user", checkAuths(Role.ADMIN , Role.SUPER_ADMIN) ,userController.getAllUser);
userRouter.patch("/:id" , checkAuths(...Object.values(Role)) , userController.updateUser)


export default userRouter