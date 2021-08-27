import APIArticleService from "./api-article-service";
import ArticleService from "./article-service-interface";


export default class ServiceProvider {

    static articleService: ArticleService;

    static getArticleService():ArticleService {
        if(this.articleService==null){
            this.articleService = new APIArticleService();
        }
        return this.articleService;
    }

}