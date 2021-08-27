import ArticleServiceScraper from "./article-service-scraper/service";
import PuppeteerScraper from "../scraper/puppeteer-scraper/scraper";
import Config from "../config/config";
import ArticleService from "./article-service-interface";
import AuthService from "./auth-service-interface";
import AuthServiceCached from "./auth-service-cached.ts/service";

export default class ServiceProvider {

    static articleService: ArticleService; 
    static authService: AuthService;

    static async getArticleService(){
        if(this.articleService==null){
            const scraper = new PuppeteerScraper(Config.baseUrl, Config.articlesListPageUrl)
            this.articleService =  new ArticleServiceScraper(scraper);
        }
        return this.articleService;
    }

    static getAuthService(){
        if(this.authService==null){
            this.authService = new AuthServiceCached();
        }
        return this.authService;
    }

}