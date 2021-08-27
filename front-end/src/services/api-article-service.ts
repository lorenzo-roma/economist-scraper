import Article from "../models/article";
import ArticleService from "./article-service-interface";
import Config from "../config/config";
import articleDetail from "../models/article-detail";

export default class APIArticleService implements ArticleService {

    async getDetail(articleUrl: string): Promise<articleDetail> {
        const url = `${Config.apiBaseUrl}/articles/detail`;
        const response = await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({url:articleUrl})
        });
        const json = await response.json();
        return json.data;
    }

    async getList(): Promise<Article[]> {
            const url = `${Config.apiBaseUrl}/articles`;
            const response = await fetch(url);
            const json = await response.json();
            return json.data;
    }

}