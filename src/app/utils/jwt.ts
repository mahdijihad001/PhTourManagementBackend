import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { envVar } from "../config/env";

export const generateJwtToken = (payload : JwtPayload) =>{
    const token = jwt.sign({payload} , envVar.ACCESS_SECRATE , {expiresIn : "7d"});
    return token
};


export let verifyToken = (token : string) =>{
    const verifyToken = jwt.verify(token , envVar.ACCESS_SECRATE);
    return verifyToken;
}