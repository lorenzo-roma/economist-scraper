import express from "express";
import ServiceProvider from "../service/service-provider"
import UnauthorizedError from "../model/unauthorized-error";

export default function CheckAuth(req: express.Request, res: express.Response, next: express.NextFunction){
    const user = req["user"];
    if(!user) throw new UnauthorizedError();
    next();
}
