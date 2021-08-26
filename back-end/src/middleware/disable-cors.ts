import express from "express";
import ServiceProvider from "../service/service-provider"

export default function CheckAuth(req: express.Request, res: express.Response, next: express.NextFunction){
    res.set("Access-Control-Allow-Origin", "*");
    next();
}