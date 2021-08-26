import Scraper from "../scraper-interface"
import Article from "../../model/article"
import puppeteer from "puppeteer"
import ArticleDetail from "../../model/article-detail"

export default class PuppeteersScraper implements Scraper {

    baseUrl: string
    articlesListPageUrl: string
    browser;

    constructor(baseUrl: string, articlesPageUrl: string){
        this.baseUrl = baseUrl;
        this.articlesListPageUrl = articlesPageUrl;
    }

    async init(): Promise<void> {
        this.browser = await puppeteer.launch({headless:true});
    }

    async getArticleDetail(url: string): Promise<ArticleDetail> {
        const page = await this.browser.newPage();
        console.log(`Loading page ${url}...`);
        await page.goto(url, {timeout: 0});
        console.log(`Page ${url} loaded!`);
        await page.waitForSelector("#_evidon-banner-acceptbutton");
        await page.click("#_evidon-banner-acceptbutton");
        await this.performLogin(page);
        console.log(`Retrieving article detail data!`);
        await page.waitForSelector('[data-analytics="sidebar:section"]');
        const section: string = await page.evaluate(()=>{
            return document.querySelector('[data-analytics="sidebar:section"]')?.textContent;
        });
        const subHeadling: string = await page.evaluate(()=>{
            return document.querySelector('[data-test-id="Article Subheadline"]')?.textContent;
        });
        const headline: string = await page.evaluate(()=>{
            return document.querySelector('[data-test-id="Article Headline"]')?.textContent;
        });
        const description: string = await page.evaluate(()=>{
            return document.querySelector('[data-test-id="Article Description"]')?.textContent;
        });
        const leadImageUrl: string = await page.evaluate(()=>{
            return document.querySelector('[data-test-id="Lead Image"]').getElementsByTagName('img')[0]?.src ?? "";
        });
        const dateTime: string = await page.evaluate(()=>{
            return document.querySelector('[data-test-id="Article Datetime"]')?.textContent;
        });
        const text: string = await page.evaluate(()=>{
            const paragraphs = Array.from(document.getElementsByClassName("article__body-text"));
            let completeText = "";
            for(let i = 0; i<paragraphs.length; i++) {
                completeText += paragraphs[i].textContent + '\n';
            }
            return completeText;
        });

        return {section, subHeadling, headline, description, leadImageUrl, dateTime, text};

    }

    async getArticlesList(): Promise<Article[]> {
        const page = await this.browser.newPage();
        console.log(`Loading page ${this.articlesListPageUrl}...`);
        await page.goto(this.articlesListPageUrl, {waitUntil: 'load', timeout: 0});
        console.log(`Page ${this.articlesListPageUrl} loaded!`)
        await page.waitForSelector('[data-analytics*="top_stories"]');
        console.log(`Selecting articles...`)
        const topStories = await page.evaluate((()=>{
            const elements = Array.from(document.querySelectorAll('[data-analytics*="top_stories"]'));
            return elements.map((el=>{
                const title = el.textContent;
                const url = el.getAttribute("href");
                const desc = el.parentElement.nextElementSibling.textContent;
                const category = el.parentElement.previousElementSibling.textContent
                const imgUrl = el.parentElement.parentElement.getElementsByTagName("img")[0]?.src ?? "";
                return {title: title, url: url, desc: desc, category: category, imgUrl: imgUrl};
            }));
        }));
        const topicalContent = await page.evaluate((()=>{
            const elements = Array.from(document.querySelectorAll('[data-analytics*="topical_content"]'));
            const category = elements[0].parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.textContent;
            return elements.map((el=>{
                const title = el.textContent;
                const url = el.getAttribute("href");
                const desc = el.parentElement.nextElementSibling.textContent;
                const imgUrl = el.parentElement.parentElement.getElementsByTagName("img")[0]?.src ?? "";
                return {title: title, url: url, desc: desc, imgUrl: imgUrl, category:category}; 
            }));
        }));
        const weeklyEdition = await page.evaluate((()=>{
            const elements = Array.from(document.querySelectorAll('[data-analytics*="weekly_edition:flash"]'));
            const category = "weekly-edition";
            return elements.map((el=>{
                const title = el.textContent;
                const url = el.getAttribute("href");
                const desc = el.nextElementSibling.textContent;
                return {title: title, url: url, desc: desc, category: category}; 
            }));
        }));
        const articles = [...topStories, ...topicalContent, ...weeklyEdition];
        articles.forEach(a=>a.url = this.formatUrl(a.url));
        return articles;
    }

    async performLogin(page: any): Promise<void>{
        console.log("Performing login");
        await page.waitForSelector('[data-analytics="masthead:login"]');
        await page.click('[data-analytics="masthead:login"]') 
        await page.waitForNavigation();
        console.log("Filling first email");
        await page.waitForSelector('#email');
        await page.type('#email', 'r.lorenzo1810@gmail.com')
        console.log("Filled");
        console.log("Clicking");
        await page.waitForSelector(".login-form__submit-btn");
        await page.click(".login-form__submit-btn");
        console.log("Clicked");
        console.log("Submitted first sign in form");
        await page.waitForNavigation();
        const passwordField = await page.waitForXPath('//*[@id="input-8"]');
        await passwordField.type('86HSaYL3U7azCtz');
        const loginButton = await page.waitForXPath('/html/body/div[3]/div[3]/div[1]/div/div/div/div[2]/div/div/c-lwc-login-form/lightning-card/article/div[2]/slot/div[1]/div[3]/div[2]/lightning-button/button');
        await loginButton.click();
        console.log("Submitted second sign in form");
        await page.waitForNavigation();
    }

    formatUrl(url: string) : string {
        if(url.charAt(0)=="/") return  this.baseUrl + url;
        return url;
    }
}