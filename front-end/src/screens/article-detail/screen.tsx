import React, { ReactNode } from "react";
import {Link, Redirect} from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner";
import ArticleDetail from "../../models/article-detail";
import ArticleService from "../../services/article-service/article-service-interface";
import ServiceProvider from "../../services/service-provider";
import ArticleHeading from "./article-heading";
import ArticleBody from "./article-body";
import ArticleDetailScreenState from "./states";
import ServiceResponse from "../../models/service-response";
import ServiceResponseStatus from "../../models/service-response-status";
import LogoutButton from "./logout/logout-button";

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
        const url = decodeURIComponent(params.get('url')!);
        const service: ArticleService = ServiceProvider.getArticleService();
        this.setState({current: ArticleDetailScreenState.LOADING_DETAILS});
        const response : ServiceResponse<ArticleDetail>= await service.getDetail(url);
        this.handleServiceResponse(response);
    }

    handleServiceResponse(response: ServiceResponse<ArticleDetail>){
        switch(response.status){
            case ServiceResponseStatus.SUCCESS:{
                this.setState({current: ArticleDetailScreenState.DETAILS_FETCHED, detail: response.data});
                return;
            }
            case ServiceResponseStatus.UNAUTHORIZED:{
                this.setState({current: ArticleDetailScreenState.NEEDS_AUTH});
                return;
            }
            case ServiceResponseStatus.ERROR:{
                console.log("error")
            }
        }
    }

    render() : ReactNode {
        return (
            <div>
                <Link to="/">to list</Link>
                <LogoutButton />
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
            case ArticleDetailScreenState.NEEDS_AUTH:
                return <Redirect to="/login" />
            case ArticleDetailScreenState.DETAILS_FETCHED:
                return (
                    <div>
                    <ArticleHeading detail={this.state.detail!} />
                    <ArticleBody text={this.state.detail!.text} />
                    </div>
                );

        }
    }
}