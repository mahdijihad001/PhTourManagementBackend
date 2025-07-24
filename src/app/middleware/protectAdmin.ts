import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/app.error";
import { verifyToken } from "../utils/jwt";

export const checkAuths = (...auths: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        throw new AppError(400, "User not authorized!");
    }

    const validationUser = verifyToken(token) as JwtPayload;
    
    if (!validationUser) {
        throw new AppError(401, "User not valid");
    };

    if (!auths.includes(validationUser.payload.role)) {
        throw new AppError(401, "You are not permited access this route!");
    }
    next();

}