"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalerrorHandaler = void 0;
const env_1 = require("../config/env");
const app_error_1 = __importDefault(require("../errorHelpers/app.error"));
const globalerrorHandaler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    if (err instanceof app_error_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({ success: false, message, err, stack: env_1.envVar.node_env === "development" ? err === null || err === void 0 ? void 0 : err.stack : null });
};
exports.globalerrorHandaler = globalerrorHandaler;
