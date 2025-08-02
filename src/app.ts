import express, { Request, Response } from "express"
import cors from "cors"
import { route } from "./app/route";
import { globalerrorHandaler } from "./app/middleware/global.error.handalar";
import { StatusCodes } from "http-status-codes";
import cookiePerser from "cookie-parser";
import notFound from "./app/errorHelpers/notFound";


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookiePerser());
app.use(cors());


// Routes

app.use("/api/v1" , route);



app.get("/", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send({ message: "Wellcome to ture management backend server!!" });
});


app.use(globalerrorHandaler);

app.use(notFound);


export default app