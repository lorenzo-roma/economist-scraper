import React, { ReactNode } from "react";
import {Link} from 'react-router-dom';
import ArticleListScreenState from "./states";
import LoadingSpinner from "../../components/loading-spinner";
import ArticlesList from "./list";
import ArticleListItem from "./list-item";
import ServiceProvider from "../../services/service-provider";
import ArticleService from "../../services/article-service-interface";
import Article from "../../models/article";


type ComponentProps = {};
type ComponentState = { current: ArticleListScreenState, articles?: Article[] };
export default class ArticleListScreen extends React.Component<ComponentProps, ComponentState>{

    constructor(props: ComponentProps){
        super(props);
        this.state = {current: ArticleListScreenState.MOUNTING};
    }

    async fetchArticles():Promise<void>{
        const service: ArticleService = ServiceProvider.getArticleService();
        this.setState({current: ArticleListScreenState.LOADING_ARTICLES});
        const articles = await service.getList();
        this.setState({current: ArticleListScreenState.ARTICLES_FETCHED, articles: articles});
    }

    componentDidMount(): void {
        this.fetchArticles();
    }

    render() : ReactNode {
        return  (
            <div>
                <h1>LIST</h1>
                <Link to="/detail">To detail</Link>
                <Link to="/login">To login</Link>
                {this.loadContent()}
            </div>
        );
    }

    loadContent(): ReactNode {
        switch(this.state.current){
            case ArticleListScreenState.MOUNTING:
                return <LoadingSpinner />;
            case ArticleListScreenState.LOADING_ARTICLES:
                return <LoadingSpinner />
            case ArticleListScreenState.ARTICLES_FETCHED:
                return <ArticlesList items={this.state.articles!} />;
        }
    }

}