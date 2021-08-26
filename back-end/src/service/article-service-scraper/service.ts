import Scraper from "../../scraper/scraper-interface"
import ArticleService from "../article-service-interface"
import Article from "../../model/article"
import ArticleDetail from "../../model/article-detail";

export default class ArticleServiceScraper implements ArticleService{

    scraper: Scraper;

    constructor(scraper: Scraper) {this.scraper = scraper; }

    async getAll(): Promise<Article[]> {
        const articles: Article[] = await this.scraper.getArticlesList();
        return articles;
    }

    async getDetail(url: string): Promise<ArticleDetail>{
        const detail: ArticleDetail = await this.scraper.getArticleDetail(url);
        return detail;
    }

}