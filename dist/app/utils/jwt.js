"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateJwtToken = (payload) => {
    const token = jsonwebtoken_1.default.sign({ payload }, env_1.envVar.ACCESS_SECRATE, { expiresIn: "7d" });
    return token;
};
exports.generateJwtToken = generateJwtToken;
const verifyToken = (token) => {
    const verifyToken = jsonwebtoken_1.default.verify(token, env_1.envVar.ACCESS_SECRATE);
    return verifyToken;
};
exports.verifyToken = verifyToken;
