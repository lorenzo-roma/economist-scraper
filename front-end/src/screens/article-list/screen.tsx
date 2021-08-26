import React, { ReactNode } from "react";
import {Link} from 'react-router-dom';
import ArticleListScreenState from "./states";
import LoadingSpinner from "../../components/loading-spinner";
import ArticlesList from "./list";
import ArticleListItem from "./list-item";

type ComponentProps = {};
type ComponentState = { current: ArticleListScreenState };
export default class ArticleListScreen extends React.Component<ComponentProps, ComponentState>{

    constructor(props: ComponentProps){
        super(props);
        this.state = {current: ArticleListScreenState.MOUNTING};
        this.fetchArticles();
    }

    fetchArticles():void{
        this.setState({current: ArticleListScreenState.LOADING_ARTICLES});
        setTimeout(() => this.setState({current: ArticleListScreenState.ARTICLES_FETCHED}), 3000)
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
                return (
                    <ArticlesList>
                        <ArticleListItem/>
                        <ArticleListItem/>
                        <ArticleListItem/>
                    </ArticlesList>
                );
        }
    }

}