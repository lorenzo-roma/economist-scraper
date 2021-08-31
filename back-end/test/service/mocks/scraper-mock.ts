import article from "../../../src/model/article";
import articleDetail from "../../../src/model/article-detail";
import Scraper from "../../../src/scraper/scraper-interface";


export default class ScraperMock implements Scraper{

    result: any;

    getArticlesList(): Promise<article[]> {
        return this.result;
    }
    getArticleDetail(url: string): Promise<articleDetail> {
        return this.result;
    }

    setReturnedValue(toReturn: any){
        this.result = toReturn;
    }

}