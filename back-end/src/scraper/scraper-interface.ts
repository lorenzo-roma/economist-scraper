import Article from "../model/article"
import ArticleDetail from "../model/article-detail";
export default interface Scraper {
    getArticlesList(): Promise<Article[]>,
    getArticleDetail(url:string): Promise<ArticleDetail>
}