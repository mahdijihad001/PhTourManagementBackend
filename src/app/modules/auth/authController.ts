import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./authServices";
import { sendResponse } from "../../utils/sendResponse";

const logInUser = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const result = await authServices.logInUser(req.body);

    sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "User successfully login",
        data : result
    })

});

export const authController = {
    logInUser
}