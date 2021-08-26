import Article from "../model/article"
import ArticleDetail from "../model/article-detail";

export default interface ArticleService {
    getAll(): Promise<Article[]>;
    getDetail(articleUrl: string): Promise<ArticleDetail>;
}