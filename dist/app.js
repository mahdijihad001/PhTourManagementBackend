"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./app/route");
const global_error_handalar_1 = require("./app/middleware/global.error.handalar");
const http_status_codes_1 = require("http-status-codes");
const notFound_1 = __importDefault(require("./app/errorHelpers/notFound"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1", route_1.route);
app.get("/", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send({ message: "Wellcome to ture management backend server!!" });
});
app.use(global_error_handalar_1.globalerrorHandaler);
app.use(notFound_1.default);
exports.default = app;
