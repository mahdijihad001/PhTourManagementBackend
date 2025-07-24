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
exports.userController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_services_1 = require("./user.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = __importDefault(require("../../errorHelpers/app.error"));
const jwt_1 = require("../../utils/jwt");
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.userServices.createuser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "User careated successfully!",
        data: user
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_services_1.userServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "All users retrieved successfully!",
        data: users.user,
        meta: {
            total: users.total
        }
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "User not valid");
    }
    ;
    const payload = req.body;
    const token = req.headers.authorization;
    const verifyUser = (0, jwt_1.verifyToken)(token);
    if (!verifyUser) {
        throw new app_error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "User not valid");
    }
    ;
    const user = yield user_services_1.userServices.updateUser(id, payload, verifyUser);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User updated Successfully",
        data: user,
        success: true
    });
}));
exports.userController = {
    createUser,
    getAllUser,
    updateUser
};
