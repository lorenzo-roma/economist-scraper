import React, { ReactNode } from "react";
import {Link} from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner";
import ArticleDetail from "../../models/article-detail";
import ArticleService from "../../services/article-service-interface";
import ServiceProvider from "../../services/service-provider";
import ArticleHeading from "./article-heading";
import ArticleDetailScreenState from "./states";

type ComponentProps = {}
type ComponentState = {current: ArticleDetailScreenState, detail?:ArticleDetail}
export default class ArticleDetailScreen extends React.Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps){
        super(props);
        this.state = {current:ArticleDetailScreenState.MOUNTING};
    }

    componentDidMount(): void {
        this.fetchDetail();
    }
    
    async fetchDetail(){
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const url = decodeURI(params.get('url')!);
        const service: ArticleService = ServiceProvider.getArticleService();
        this.setState({current: ArticleDetailScreenState.LOADING_DETAILS});
        const detail = await service.getDetail(url);
        this.setState({current: ArticleDetailScreenState.DETAILS_FETCHED, detail: detail});
    }

    render() : ReactNode {
        return (
            <div>
                {this.loadContent()}
            </div>
        );
    }

    loadContent(): ReactNode{
        switch(this.state.current){
            case ArticleDetailScreenState.MOUNTING:
                return <LoadingSpinner />
            case ArticleDetailScreenState.LOADING_DETAILS:
                return <LoadingSpinner />
            case ArticleDetailScreenState.DETAILS_FETCHED:
                return <ArticleHeading detail={this.state.detail!} />
        }
    }
}