import Article from "../../models/article";
import ArticleDetail from "../../models/article-detail";
import ServiceResponse from "../../models/service-response";

export default interface ArticleService {
    getList(): Promise<ServiceResponse<Article[]>>;
    getDetail(id: string) : Promise<ServiceResponse<ArticleDetail>>
}