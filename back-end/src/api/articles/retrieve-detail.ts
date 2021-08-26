import express from 'express';
import {APIResponse, APIResponseStatus} from '../../model/api-response';
import ArticleDetail from '../../model/article-detail';
import ServiceProvider from "../../service/service-provider";

export default async function retrieveDetailHanlder(req: express.Request): Promise<APIResponse> {
    try {
        const url = req.body.url;
        const service = await ServiceProvider.getArticleService();
        const articleDetail: ArticleDetail = await service.getDetail(url);
        return {status: APIResponseStatus.SUCCESS, data: articleDetail};
    } catch (e){
        return {status: APIResponseStatus.ERROR, data: e.message}
    }
}
