import Article from "../../src/model/article";
import ArticleDetail from "../../src/model/article-detail";
import Scraper from "../../src/scraper/scraper-interface";
import ArticleServiceScraper from "../../src/service/article-service-scraper/service";
import ScraperMock from "../mocks/scraper-mock";
import {articlesMock} from "../mocks/article-mock";
import {articleDetailMock} from "../mocks/article-detail-mock";

let serviceTested : ArticleServiceScraper;
let scraperMock: ScraperMock;

beforeEach(()=>{
    scraperMock = new ScraperMock();
    serviceTested = new ArticleServiceScraper(scraperMock);
});

describe("Retrieve article data tests", ()=>{

    test("Retrieve all artlcles", async () =>{
        const articlesToBeFound = articlesMock;
        scraperMock.setReturnedValue(articlesToBeFound);
        const result: Article[] = await serviceTested.getAll();
        expect(result).toStrictEqual(articlesToBeFound);
    })


    test("Retrieve article details", async () => {
        const articleToBeFound: ArticleDetail = articleDetailMock;
        scraperMock.setReturnedValue(articleToBeFound);
        const result: ArticleDetail = await serviceTested.getDetail("");
        expect(result).toStrictEqual(articleToBeFound);
    })

})