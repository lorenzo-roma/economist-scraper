import express from "express";
import { APIResponseStatus } from "../model/api-response";
import ErrorType from "../model/error-type";
import UnauthorizedError from "../model/unauthorized-error";

export default function ErrorHandler(e: Error, req: express.Request, res: express.Response, next: express.NextFunction){
        const errorType = checkIsCustomError(e);
        if(errorType!=undefined){
            switch(errorType){
                case ErrorType.UNAUTHORIZED:
                    const response = {status: APIResponseStatus.UNAUTHORIZED};
                    res.statusCode = 403;
                    res.send(JSON.stringify(response));
                    return;
            }
        }
        const response = {status: APIResponseStatus.ERROR, data: e.message};
        res.statusCode = 500;
        res.send(JSON.stringify(response)); 
}

function checkIsCustomError(error: any): ErrorType | undefined {
    return error.errorType;
}