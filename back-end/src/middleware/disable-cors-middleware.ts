import express from "express";
import ServiceProvider from "../service/service-provider"

export default function CheckAuth(req: express.Request, res: express.Response, next: express.NextFunction){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
}