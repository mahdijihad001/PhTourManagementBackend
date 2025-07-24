import { NextFunction, Request, Response } from "express"
import { envVar } from "../config/env"
import AppError from "../errorHelpers/app.error";

export const globalerrorHandaler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = "Something went wrong!";

    if(err instanceof AppError){
        statusCode = err.statusCode;
        message = err.message;
    }else if(err instanceof Error){
        statusCode = 500;
        message = err.message;
    }

    res.status(statusCode).json({ success: false, message, err, stack: envVar.node_env === "development" ? err?.stack : null })
}