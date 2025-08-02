import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    GUIDE = "GUIDE"
}

export interface IAuthprovider {
    provider : "Google" | "Credentials", // google | credential,
    prividerId : string 
};

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser{
    _id ?: Types.ObjectId,
    name : string,
    email : string,
    password ?: string,
    phone ?: string,
    picture ?: string,
    address ?: string,
    isDeleted ?: string,
    isActive ?: IsActive,
    isVerifid ?: boolean,
    role : Role,
    auths : IAuthprovider[],
    booking ?: Types.ObjectId[],
    guide ?: Types.ObjectId[],
};

