import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import Article from "../../models/article";

type ComponentProps = {article: Article}
export default class ArticleListItem extends React.Component<ComponentProps> {

    render(): ReactNode {
        const a = this.props.article;
        return (
            <Link to={{
                pathname:"/detail",
                search:"?url="+encodeURIComponent(a.url)
            }}>
                <li>{a.title}</li>
            </Link>
        );
    }

}