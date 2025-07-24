"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVar = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
;
const loadEnvVariables = () => {
    const requiredEnvVariables = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT", "ACCESS_SECRATE", "SUPER_ADMIN_PASSWORD", "SUPER_ADMIN_EMAIL"];
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variabl ${key}`);
        }
    });
    return {
        port: process.env.PORT,
        mongo_url: process.env.MONGO_URI,
        node_env: process.env.NODE_ENVIRONMENT,
        ACCESS_SECRATE: process.env.ACCESS_SECRATE,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD
    };
};
exports.envVar = loadEnvVariables();
