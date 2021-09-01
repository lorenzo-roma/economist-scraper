import express from "express";
import ServiceProvider from "../service/service-provider"

export default function AppendUser(req: express.Request, res: express.Response, next: express.NextFunction){
    const authHeader = req.headers['authorization'];
    if(authHeader){
        const token = authHeader.split(" ")[1];
        const service = ServiceProvider.getAuthService();
        const user = service.verifyToken(token);
        if(user) req["user"] = user;
    }
    next();
}