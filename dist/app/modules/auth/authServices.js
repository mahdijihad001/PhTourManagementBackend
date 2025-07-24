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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const user_model_1 = require("../users/user.model");
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utils/jwt");
const logInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const existUser = yield user_model_1.User.findOne({ email });
    if (!existUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not exist");
    }
    const matchPassword = yield bcrypt_1.default.compare(password, existUser.password);
    if (!matchPassword) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Incorrect Password");
    }
    ;
    const jwtPayload = { userID: existUser._id, email: existUser.email, role: existUser.role };
    const token = (0, jwt_1.generateJwtToken)(jwtPayload);
    return {
        email: existUser.email,
        token: token
    };
});
exports.authServices = {
    logInUser
};
