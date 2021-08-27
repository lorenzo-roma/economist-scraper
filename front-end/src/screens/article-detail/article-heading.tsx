import React, {ReactNode} from "react";
import ArticleDetail from "../../models/article-detail";

type ComponentProps = {detail: ArticleDetail}
export default class ArticleHeading extends React.Component<ComponentProps> {

    render(): ReactNode {
        return (
            <h1>{this.props.detail.title}</h1>
        );
    }

}