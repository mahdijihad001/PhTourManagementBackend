import mongoose, { model } from "mongoose";
import { IAuthprovider, IsActive, IUser, Role } from "./user.interface";

const authProviderSchema = new mongoose.Schema<IAuthprovider>({
    provider : {
        type : String,
        required : true
    },
    prividerId : {
        type : String,
        required : true
    }
} , {
    versionKey : false,
    _id : false
})

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    },
    phone: {
        type: String
    },
    picture: {
        type: String
    },
    address: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isVerifid : {
        type : Boolean,
        default : false
    },
    auths : [authProviderSchema]
}, {
    timestamps: true,
    versionKey: false
});

export const User = model<IUser>("user" , userSchema);