import AppError from "../../errorHelpers/app.error";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { StatusCodes } from "http-status-codes";
import  bcrypt  from 'bcrypt';
import { generateJwtToken } from "../../utils/jwt";
const logInUser = async(payload : Partial<IUser>) =>{
    const {email , password} = payload;

    const existUser = await User.findOne({email});

    if(!existUser){
        throw new AppError(StatusCodes.NOT_FOUND , "User not exist")
    }
    
    const matchPassword = await bcrypt.compare(password as string , existUser.password as string);

    if(!matchPassword){
        throw new AppError(StatusCodes.BAD_REQUEST , "Incorrect Password");
    };

    const jwtPayload = {userID : existUser._id , email : existUser.email , role : existUser.role}

    const token = generateJwtToken(jwtPayload)

    return {
        email : existUser.email,
        token : token
    }
};


export const authServices  = {
    logInUser
}