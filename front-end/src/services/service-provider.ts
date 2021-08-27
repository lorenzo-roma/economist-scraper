import ArticleService from "./article-service-interface";
import APIService from "./api-service-inteface";
import APIArticleService from "./api-article-service";
import FetchAPIService from "./fetch-api-service";

export default class ServiceProvider {

    static articleService: ArticleService;
    static apiService: APIService;

    static getArticleService():ArticleService {
        if(this.articleService==null){
            this.articleService = new APIArticleService();
        }
        return this.articleService;
    }

    static getAPIService(): APIService {
        if(this.apiService==null){
            this.apiService = new FetchAPIService();
        }
        return this.apiService;
    }

}