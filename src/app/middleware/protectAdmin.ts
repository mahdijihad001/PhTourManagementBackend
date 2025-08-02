import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/app.error";
import { verifyToken } from "../utils/jwt";
import { User } from "../modules/users/user.model";
import { StatusCodes } from "http-status-codes";
import { Role } from "../modules/users/user.interface";

export const checkAuths = (...auths: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        throw new AppError(400, "User not authorized!");
    };

    const validationUser = verifyToken(token) as JwtPayload;

    if (!validationUser) {
        throw new AppError(401, "User not valid");
    };

    const existUser = await User.findById(validationUser.payload.userId);

    if (!existUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
    }

    if (existUser.isActive || existUser.isDeleted || existUser.isVerifid) {
        if (validationUser.payload.role === Role.USER || validationUser.payload.role === Role.GUIDE) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized!")
        }
    }

    if (!auths.includes(validationUser.payload.role)) {
        throw new AppError(401, "You are not permited access this route!");
    }
    req.user = validationUser.payload;
    next();
}