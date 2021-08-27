import Article from "../models/article";
import ArticleDetail from "../models/article-detail";

export default interface ArticleService {
    getList(): Promise<Article[]>;
    getDetail(id: string) : Promise<ArticleDetail>
}