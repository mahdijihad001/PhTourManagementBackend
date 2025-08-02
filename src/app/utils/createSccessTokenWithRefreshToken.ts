import { JwtPayload } from "jsonwebtoken";
import { envVar } from "../config/env";
import { User } from "../modules/users/user.model";
import { generateJwtToken, verifyTokenSecrate } from "./jwt";
import AppError from "../errorHelpers/app.error";
import { StatusCodes } from "http-status-codes";
import { IsActive } from "../modules/users/user.interface";

export const createAccessTokenWithRefreshToken = async(refreshToken: string) => {
    const verify = verifyTokenSecrate(refreshToken, envVar.REFRESH_SECRATE) as JwtPayload;

    const existUser = await User.findOne({ email: verify.payload.email });

    if (!existUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User dost not exist.")
    }
    if (existUser.isActive === IsActive.BLOCKED) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is blocked.")
    }
    if (existUser.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is deleted")
    }

    const jwtPayload = { userID: existUser._id, email: existUser.email, role: existUser.role };

    const accrssToken = generateJwtToken(jwtPayload);

    return accrssToken

}