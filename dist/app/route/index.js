"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const user_router_1 = __importDefault(require("../modules/users/user.router"));
const authRouter_1 = require("../modules/auth/authRouter");
exports.route = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        routes: user_router_1.default
    },
    {
        path: "/auth",
        routes: authRouter_1.authRouter
    }
];
moduleRoutes.forEach((rou) => {
    exports.route.use(rou.path, rou.routes);
});
