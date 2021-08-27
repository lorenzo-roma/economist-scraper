import Article from "../../models/article";
import ArticleService from "../article-service/article-service-interface";
import Config from "../../config/config";
import ArticleDetail from "../../models/article-detail";
import ServiceProvider from "../service-provider";
import APIResponse from "../../models/api-response";
import ServiceResponse from "../../models/service-response";
import ServiceResponseStatus from "../../models/service-response-status";

export default class APIArticleService implements ArticleService {

    async getDetail(articleUrl: string): Promise<ServiceResponse<ArticleDetail>> {
        const url = `${Config.apiBaseUrl}/articles/detail`;
        try{
            const service = ServiceProvider.getAPIService();
            const response: APIResponse = await service.makeRequest(url, "POST", {url: articleUrl});
            return this.handleAPIServiceResponse(response);
        } catch (e){
                return {status: ServiceResponseStatus.ERROR}
        }

    }

    async getList(): Promise<ServiceResponse<Article[]>> {
        try{
            const url = `${Config.apiBaseUrl}/articles`;
            const service = ServiceProvider.getAPIService();
            const response: APIResponse = await service.makeRequest(url);
            console.log(response);
            return this.handleAPIServiceResponse(response);
        } catch (e){
            return {status: ServiceResponseStatus.ERROR}
        }
    }

    handleAPIServiceResponse(response: APIResponse){
        switch(response.code){
            case 403: return {status: ServiceResponseStatus.UNAUTHORIZED};
            case 500: return {status: ServiceResponseStatus.ERROR}
            case 200: return {status: ServiceResponseStatus.SUCCESS, data: response.data};
        }
        return {status: ServiceResponseStatus.ERROR}
    }
}