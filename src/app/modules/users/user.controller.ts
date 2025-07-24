import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import mongoose from "mongoose";
import AppError from "../../errorHelpers/app.error";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createuser(req.body);
    sendResponse(res , {
        statusCode : StatusCodes.CREATED,
        success : true,
        message : "User careated successfully!",
        data : user
    })
});

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.getAllUsers();

    sendResponse(res , {
        success : true,
        statusCode : StatusCodes.OK,
        message : "All users retrieved successfully!",
        data : users.user,
        meta : {
            total : users.total
        }
    })
});

const updateUser = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new AppError(StatusCodes.FORBIDDEN , "User not valid");
    };

    const payload = req.body;
    const token = req.headers.authorization;
    const verifyUser= verifyToken(token as string) as JwtPayload;
    if(!verifyUser){
        throw new AppError(StatusCodes.FORBIDDEN , "User not valid");
    };

    const user = await userServices.updateUser(id , payload , verifyUser);

    sendResponse(res , {
        statusCode : StatusCodes.OK,
        message : "User updated Successfully",
        data : user,
        success : true
    })

});

export const userController = {
    createUser,
    getAllUser,
    updateUser
}