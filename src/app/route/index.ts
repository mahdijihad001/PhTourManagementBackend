import { Router } from "express";
import userRouter from "../modules/users/user.router";
import { authRouter } from "../modules/auth/authRouter";

export const route = Router();

const moduleRoutes = [
    {
        path : "/user",
        routes : userRouter
    },
    {
        path : "/auth",
        routes : authRouter
    }
];


moduleRoutes.forEach((rou) =>{
    route.use(rou.path , rou.routes);
})