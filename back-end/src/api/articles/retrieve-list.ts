import express from 'express';
import { APIResponse, APIResponseStatus } from '../../model/api-response';
import Article from '../../model/article';
import ArticleService from '../../service/article-service-interface';
import ServiceProvider from '../../service/service-provider';

export default async function retrieveListHandler(req: express.Request) : Promise<APIResponse>{
    try{
        const service: ArticleService = await ServiceProvider.getArticleService();
        const articles = await service.getAll();
        return {status: APIResponseStatus.SUCCESS, data: articles}
    } catch (e){
        return {status: APIResponseStatus.ERROR, data: e.message}
    }

}
