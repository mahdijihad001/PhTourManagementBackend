import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { envVar } from "../config/env";

export const generateJwtToken = (payload : JwtPayload) =>{
    const token = jwt.sign({payload} , envVar.ACCESS_SECRATE , {expiresIn : "7d"});
    return token
};

export const refreshToken = (payload : JwtPayload) =>{
    const token = jwt.sign({payload} , envVar.REFRESH_SECRATE , {expiresIn : "30d"});
    return token
}

export const verifyToken = (token : string) =>{
    const verifyToken = jwt.verify(token , envVar.ACCESS_SECRATE);
    return verifyToken;
};
export const verifyTokenSecrate = (token : string , matchToken : string) =>{
    const verifyToken = jwt.verify(token , matchToken);
    return verifyToken;
};

