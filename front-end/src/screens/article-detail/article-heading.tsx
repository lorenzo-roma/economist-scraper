import React, {ReactNode} from "react";
import ArticleDetail from "../../models/article-detail";

type ComponentProps = {detail: ArticleDetail}
export default class ArticleHeading extends React.Component<ComponentProps> {

    render(): ReactNode {
        return (
            <div>
                <h1>{this.props.detail.headline}</h1>
                <h2>{this.props.detail.subHeading}</h2>
                <img alt="article" src={this.props.detail.leadImageUrl}></img>
                <h3>{this.props.detail.section}</h3>
                <h4>{this.props.detail.description}</h4>
x            </div>
        );
    }

}