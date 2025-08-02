import AppError from "../../errorHelpers/app.error";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import { createUserTokens } from "../../utils/createUserToken";
import { createAccessTokenWithRefreshToken } from "../../utils/createSccessTokenWithRefreshToken";
import { JwtPayload } from "jsonwebtoken";

const logInUser = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const existUser = await User.findOne({ email });

    if (!existUser) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not exist")
    }

    const matchPassword = await bcrypt.compare(password as string, existUser.password as string);

    if (!matchPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect Password");
    };

    const { password: pass, ...rest } = existUser.toObject();
    const token = createUserTokens(existUser);
    return {
        accessToken : (await token).accessTok,
        refreshToken : (await token).refreshTok,
        user : rest
    }
};
const getNewAccessTokenUseRefreshToken = async (refreshToken : string) => {
   const accessToken = await createAccessTokenWithRefreshToken(refreshToken);
    return {
        accessToken
    }
};


const resetPassword = async(decodedToken :  JwtPayload , newPassword : string , oldPassword : string) =>{

    const findUser = await User.findById(decodedToken.userID);

    const checkOldPasswordMatch = await bcrypt.compare(oldPassword , findUser?.password as string);

    if(checkOldPasswordMatch){
        throw new AppError(StatusCodes.UNAUTHORIZED , "Old password dose not exist!");
    };
    
    findUser!.password = await bcrypt.hash(newPassword , 10);
    findUser!.save();
    return null;

}


export const authServices = {
    logInUser,
    getNewAccessTokenUseRefreshToken,
    resetPassword
}