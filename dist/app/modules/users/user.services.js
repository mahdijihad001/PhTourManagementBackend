"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = exports.seedSuperAdmin = void 0;
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../../config/env");
const createuser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const exixtUser = yield user_model_1.User.findOne({ email });
    if (exixtUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "email already exist");
    }
    ;
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    const authProvider = { provider: "Credentials", prividerId: email };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashPassword, auths: [authProvider] }, rest));
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({});
    const total = yield user_model_1.User.countDocuments();
    return {
        user,
        total
    };
});
const updateUser = (userId, payload, decodecToken) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.User.findById(userId);
    if (!existUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found!");
    }
    if (payload.role) {
        if (decodecToken.payload.role === user_interface_1.Role.USER || decodecToken.payload.role === user_interface_1.Role.GUIDE) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized");
        }
        if (payload.role === user_interface_1.Role.SUPER_ADMIN && decodecToken.payload.role === user_interface_1.Role.ADMIN) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized");
        }
    }
    if (payload.isActive || payload.isDeleted || payload.isVerifid) {
        if (decodecToken.payload.role === user_interface_1.Role.USER || decodecToken.payload.role === user_interface_1.Role.GUIDE) {
            throw new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You cannot update account status!");
        }
    }
    if (payload.password) {
        payload.password = yield bcrypt_1.default.hash(payload.password, 10);
    }
    const updateUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return updateUser;
});
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const existSuperAdmin = yield user_model_1.User.findOne({ email: env_1.envVar.SUPER_ADMIN_EMAIL });
    if (existSuperAdmin) {
        console.log("Super admin already exist!");
        return;
    }
    const hastPassword = yield bcrypt_1.default.hash(env_1.envVar.SUPER_ADMIN_PASSWORD, 10);
    const authProvider = {
        prividerId: env_1.envVar.SUPER_ADMIN_EMAIL,
        provider: "Credentials"
    };
    const payload = {
        name: "Super Admin",
        email: env_1.envVar.SUPER_ADMIN_EMAIL,
        password: hastPassword,
        role: user_interface_1.Role.SUPER_ADMIN,
        isVerifid: true,
        auths: [authProvider]
    };
    yield user_model_1.User.create(payload);
    console.log("Super admin created successfully");
});
exports.seedSuperAdmin = seedSuperAdmin;
exports.userServices = {
    createuser,
    getAllUsers,
    updateUser
};
