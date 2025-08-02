import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./authServices";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/app.error";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setAuthCookie";

const logInUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.logInUser(req.body);

    // res.cookie("refreshToken", result.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    // });

    // res.cookie("accessToken", result.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, result);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User successfully login",
        data: result
    })

});


const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No refresh token recived form cookies!");
    }

    const tokenInfo = await authServices.getNewAccessTokenUseRefreshToken(token as string);


    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Refreshed Successfully!",
        data: tokenInfo
    });
});


const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken" , {httpOnly : true , secure : false , sameSite : "lax"});
    res.clearCookie("accessToken" , {httpOnly : true , secure : false , sameSite : "lax"});

    sendResponse(res, {
        message: "Logout Successfully!",
        success: true,
        data: null,
        statusCode: 200
    })

});


const resetPassword = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{

    const decodedToken = req.user;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const updatedNewPassword = authServices.resetPassword(decodedToken , newPassword , oldPassword);

})

export const authController = {
    logInUser,
    getNewAccessToken,
    logOut,
    resetPassword
}