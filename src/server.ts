import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVar } from "./app/config/env";
import { seedSuperAdmin } from "./app/modules/users/user.services";

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(envVar.mongo_url);

        console.log("Connected to DB!!");

        server = app.listen(envVar.port, () => {
            console.log(`server is listening on port :${envVar.port}`);
            console.log(`http://localhost:${envVar.port}`);
        })

    } catch (error) {
        console.log("Mongoose Connection error :", error);
    }
};

startServer();
(async() =>{
    await startServer();
    await seedSuperAdmin();
})();

//  Cloud Hister jodi server off kora tahola ai error asba
process.on("SIGTERM", () => {
    console.log("sigterm signal detected... Server surting down.");

    if (server) {
        server.close(() => {
            process.exit(0)
        });
    };
    process.exit(0);
});

// Project owner jodi server off kora tahola ai error asba
process.on("SIGINT", () => {
    console.log("Sigint signal detected... server shurting down");

    if (server) {
        server.close(() => {
            process.exit(0)
        })
    };

    process.exit(0);

})

// project a amon kono akta bug aca jaita amra solve korta pari ni user ai ta dorta parlai shata shata server off hoi jaba
process.on("unhandledRejection", (err) => {
    console.log("Unhandle Rejection detected... Server shurtting down.", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    };
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

