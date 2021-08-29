import express from 'express';
import {APIResponse} from "../model/api-response"


export default function JsonResponse(handler: (req: express.Request) => Promise<APIResponse>){
    return async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        try{
            const result : APIResponse =  await handler(req);
            res.json(result);
        } catch (err){
            next(err);
        }

    }
}