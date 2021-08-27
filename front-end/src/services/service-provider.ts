import ArticleService from "./article-service/article-service-interface";
import APIService from "./api-service/api-service-inteface";
import AuthService from "./auth-service/auth-service-interface";
import APIArticleService from "./article-service/api-article-service";
import FetchAPIService from "./api-service/fetch-api-service";
import APIAuthService from "./auth-service/api-auth-service";

export default class ServiceProvider {

    static articleService: ArticleService;
    static apiService: APIService;
    static authService: AuthService;

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

    static getAuthService(): AuthService {
        if(this.authService==null){
            this.authService = new APIAuthService();
        }
        return this.authService;  
    }

}