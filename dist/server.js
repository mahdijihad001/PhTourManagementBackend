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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const user_services_1 = require("./app/modules/users/user.services");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVar.mongo_url);
        console.log("Connected to DB!!");
        server = app_1.default.listen(env_1.envVar.port, () => {
            console.log(`server is listening on port :${env_1.envVar.port}`);
            console.log(`http://localhost:${env_1.envVar.port}`);
        });
    }
    catch (error) {
        console.log("Mongoose Connection error :", error);
    }
});
startServer();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, user_services_1.seedSuperAdmin)();
}))();
//  Cloud Hister jodi server off kora tahola ai error asba
process.on("SIGTERM", () => {
    console.log("sigterm signal detected... Server surting down.");
    if (server) {
        server.close(() => {
            process.exit(0);
        });
    }
    ;
    process.exit(0);
});
// Project owner jodi server off kora tahola ai error asba
process.on("SIGINT", () => {
    console.log("Sigint signal detected... server shurting down");
    if (server) {
        server.close(() => {
            process.exit(0);
        });
    }
    ;
    process.exit(0);
});
// project a amon kono akta bug aca jaita amra solve korta pari ni user ai ta dorta parlai shata shata server off hoi jaba
process.on("unhandledRejection", (err) => {
    console.log("Unhandle Rejection detected... Server shurtting down.", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    ;
    process.exit(1);
});
// amathar project ar local login a amra amon kono akta logic try catch koira dori ai ai error gula o dorba
process.on("uncaughtException", (err) => {
    console.log("Un Caugth exception detected... server shurtting down.", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
