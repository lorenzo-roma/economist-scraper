import React, { ReactNode } from "react";
import {Link} from 'react-router-dom';
import ArticleListScreenState from "./states";
import LoadingSpinner from "../../components/loading-spinner";
import ArticlesList from "./list";
import ServiceProvider from "../../services/service-provider";
import ArticleService from "../../services/article-service/article-service-interface";
import Article from "../../models/article";
import ServiceResponseStatus from "../../models/service-response-status";
import ServiceResponse from "../../models/service-response";


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
        const response = await service.getList();
        this.handleServiceResponse(response);
    }

    handleServiceResponse(response: ServiceResponse<Article[]>){
        switch(response.status){
            case ServiceResponseStatus.SUCCESS:{
                this.setState({current: ArticleListScreenState.ARTICLES_FETCHED, articles: response.data});
                return;
            }
            case ServiceResponseStatus.UNAUTHORIZED:{
                this.setState({current: ArticleListScreenState.NEEDS_AUTH});
                return;
            }
            case ServiceResponseStatus.ERROR:{
                //TODO: manage error
            }
        }
    }

    componentDidMount(): void {
        this.fetchArticles();
    }

    render() : ReactNode {
        return  (
            <div>
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